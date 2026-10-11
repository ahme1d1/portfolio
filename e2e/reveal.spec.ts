import { expect, test, type Page } from "@playwright/test";

const PAGES = ["/en/", "/en/work/", "/en/work/fantasy-eg/", "/ar/work/cultural-bridge/", "/en/experience/", "/en/services/", "/en/about/"];
const BLOCKS = ".reveal-children > :not(ul, ol), .reveal-children > :is(ul, ol) > li";
/** A block's entrance (500ms plus a cascade step or two), with room to spare. */
const SETTLED_MS = 1300;

const nextFrames = (page: Page) =>
  page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

/** Names of the CSS animations running on the visible elements that match `selector`. */
const animationsOn = (page: Page, selector: string) =>
  page.evaluate(
    (sel) =>
      [...document.querySelectorAll(sel)]
        .filter((element) => element.checkVisibility())
        .flatMap((element) => element.getAnimations())
        .map((animation) => (animation as CSSAnimation).animationName),
    selector,
  );

/** Visible blocks whose top is above `line` (a share of the screen) and that are still held back. */
const waitingAbove = (page: Page, line: number) =>
  page.evaluate(
    ([sel, at]) =>
      [...document.querySelectorAll<HTMLElement>(sel)]
        .filter((block) => block.checkVisibility() && block.dataset.reveal === "pending")
        .filter((block) => block.getBoundingClientRect().top < innerHeight * Number(at))
        .map((block) => block.outerHTML.slice(0, 80)),
    [BLOCKS, String(line)] as const,
  );

test.describe("blocks play in", () => {
  test("the first screen plays in on load, the hero first", async ({ page }) => {
    await page.goto("/en/");
    expect(await animationsOn(page, ".intro-children > *")).toContain("reveal-up");
    expect(await animationsOn(page, ".intro-scale")).toContain("reveal-scale");
  });

  for (const url of PAGES) {
    test(`blocks on ${url} wait below the screen, play once in view, and none stays hidden`, async ({ page }) => {
      await page.goto(url, { waitUntil: "networkidle" });
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = await page.evaluate(() => Math.round(innerHeight / 2));
      expect(await page.locator('[data-reveal="pending"]').count()).toBeGreaterThan(0);

      for (let y = 0; y < height; y += step) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await expect.poll(() => waitingAbove(page, 0.85), { message: `at ${y}px` }).toEqual([]);
      }

      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await expect.poll(() => waitingAbove(page, 0.85)).toEqual([]);
      await page.waitForTimeout(SETTLED_MS);
      const hidden = await page.evaluate(
        (sel) =>
          [...document.querySelectorAll<HTMLElement>(sel)]
            .filter((block) => block.checkVisibility() && block.dataset.reveal !== "pending")
            .filter((block) => Number(getComputedStyle(block).opacity) < 1).length,
        BLOCKS,
      );
      expect(hidden).toBe(0);
    });
  }

  test("a link plays the new page in", async ({ page }) => {
    await page.goto("/en/", { waitUntil: "networkidle" });
    // Work's first section sits right under its short title, so it plays in on arrival.
    await page.getByRole("link", { name: "All work" }).locator("visible=true").first().click();
    await expect(page).toHaveURL(/\/en\/work\/$/);
    await expect(page.locator('[data-reveal="play"]').first()).toBeAttached();
    await expect(page.locator('[data-reveal="play"]')).toHaveCount(0, { timeout: 3000 });
  });

  test("the language switch keeps what is on screen and does not replay the hero", async ({ page }) => {
    await page.goto("/en/", { waitUntil: "networkidle" });
    await page.waitForTimeout(SETTLED_MS);
    await page.locator("header").getByRole("link", { name: "العربية" }).click();
    await expect(page).toHaveURL(/\/ar\/$/);
    await nextFrames(page);
    // React clears <html>'s attributes on the new root layout; the marker must be back.
    await expect(page.locator("html")).toHaveAttribute("data-locale-switch", "");
    expect(await animationsOn(page, ".intro-children > *, .intro-scale")).toEqual([]);
    const onScreenWaiting = await page.evaluate(
      (sel) =>
        [...document.querySelectorAll<HTMLElement>(sel)].filter(
          (block) =>
            block.checkVisibility() && block.getBoundingClientRect().top < innerHeight && block.dataset.reveal === "pending",
        ).length,
      BLOCKS,
    );
    expect(onScreenWaiting).toBe(0);
  });

  test("reading text on case studies and Experience just shows; the timeline line still draws", async ({ page }) => {
    await page.goto("/en/work/fantasy-eg/", { waitUntil: "networkidle" });
    const stillHidden = () =>
      page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('[data-reveal-style="still"]')].filter(
          (block) => block.getClientRects().length > 0 && Number(getComputedStyle(block).opacity) < 1,
        ).length,
      );
    expect(await page.locator('[data-reveal-style="still"][data-reveal="pending"]').count()).toBeGreaterThan(0);
    expect(await stillHidden()).toBe(0);

    await page.goto("/en/experience/", { waitUntil: "networkidle" });
    expect(await stillHidden()).toBe(0);
    const waitingLine = page.locator('[data-reveal="pending"] [data-line]').first();
    await expect(waitingLine).not.toHaveCSS("clip-path", "none");
  });

  test("after the first page, blocks play in quicker", async ({ page }) => {
    await page.goto("/en/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).not.toHaveAttribute("data-browsing");
    await page.getByRole("link", { name: "All work" }).locator("visible=true").first().click();
    await expect(page).toHaveURL(/\/en\/work\/$/);
    await expect(page.locator("html")).toHaveAttribute("data-browsing", "");
    await expect(page.locator('[data-reveal="play"]').first()).toHaveCSS("transition-duration", /0\.35s/);
  });

  test("a diagram draws its lines when its figure plays in", async ({ page }) => {
    await page.goto("/en/work/fantasy-eg/", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const line = [...document.querySelectorAll("[data-line]")].find(
        (element) => element.checkVisibility() && element.closest('[data-reveal="pending"]'),
      );
      line?.closest("figure")?.scrollIntoView({ block: "center" });
    });
    await expect(page.locator('[data-reveal="play"] [data-line]').first()).toBeAttached();
    expect(await animationsOn(page, '[data-reveal="play"] [data-line]')).toContain("line-draw");
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every block is shown once the load animation ends", async ({ page }) => {
    await page.goto("/en/work/fantasy-eg/");
    await page.waitForTimeout(SETTLED_MS + 600);
    const state = await page.evaluate(
      (sel) => ({
        held: document.querySelectorAll("[data-reveal]").length,
        faded: [...document.querySelectorAll<HTMLElement>(sel)].filter(
          (block) => block.checkVisibility() && Number(getComputedStyle(block).opacity) < 1,
        ).length,
      }),
      BLOCKS,
    );
    expect(state).toEqual({ held: 0, faded: 0 });
  });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("nothing is held back and nothing moves", async ({ page }) => {
    for (const url of ["/en/", "/en/experience/", "/en/work/fantasy-eg/"]) {
      await page.goto(url, { waitUntil: "networkidle" });
      const state = await page.evaluate(() => ({
        held: document.querySelectorAll("[data-reveal]").length,
        animations: document.getAnimations().map((animation) => (animation as CSSAnimation).animationName),
      }));
      expect(state, url).toEqual({ held: 0, animations: [] });
    }
  });
});
