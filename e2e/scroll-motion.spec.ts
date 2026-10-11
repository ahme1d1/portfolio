import { expect, test, type Page } from "@playwright/test";

const PAGES = ["/en/", "/en/work/", "/en/work/fantasy-eg/", "/ar/work/cultural-bridge/", "/en/experience/", "/en/services/", "/en/about/"];

/** Puts an element's top at `fraction` of the screen height (0 = top edge). */
async function placeTop(page: Page, selector: string, fraction: number) {
  for (let pass = 0; pass < 3; pass++) {
    await page.evaluate(
      ([sel, at]) => {
        const element = [...document.querySelectorAll(sel)].find((candidate) => candidate.checkVisibility());
        if (!element) throw new Error(`no visible ${sel}`);
        window.scrollBy(0, element.getBoundingClientRect().top - innerHeight * Number(at));
      },
      [selector, String(fraction)] as const,
    );
  }
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

/** Blocks that are well inside the screen but not fully shown: a reveal that got stuck. */
const faded = (page: Page) =>
  page.evaluate(() =>
    document
      .getAnimations()
      .filter((animation) => (animation as CSSAnimation).animationName === "settle-in")
      .map((animation) => (animation.effect as KeyframeEffect).target as Element)
      .filter((element) => element.checkVisibility())
      .filter((element) => {
        const box = element.getBoundingClientRect();
        return box.top < innerHeight * 0.7 && box.bottom > 0 && Number(getComputedStyle(element).opacity) < 0.99;
      })
      .map((element) => element.outerHTML.slice(0, 80)),
  );

test.describe("scroll motion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/");
    const isSupported = await page.evaluate(() => CSS.supports("animation-timeline: view()"));
    test.skip(!isSupported, "This browser has no scroll timelines; it shows every block in place.");
  });

  for (const url of PAGES) {
    test(`blocks on ${url} settle in as they come up, and none stays faded`, async ({ page }) => {
      await page.goto(url, { waitUntil: "networkidle" });
      const settling = await page.evaluate(
        () => document.getAnimations().filter((animation) => (animation as CSSAnimation).animationName === "settle-in").length,
      );
      expect(settling).toBeGreaterThan(0);

      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = await page.evaluate(() => Math.round(innerHeight / 2));
      for (let y = 0; y < height; y += step) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        expect(await faded(page), `at ${y}px`).toEqual([]);
      }

      // At the very bottom, the last blocks above the footer have finished too.
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const unfinished = await page.evaluate(() =>
        document
          .getAnimations()
          .filter((animation) => (animation as CSSAnimation).animationName === "settle-in")
          .map((animation) => (animation.effect as KeyframeEffect).target as Element)
          .filter((element) => element.checkVisibility() && Number(getComputedStyle(element).opacity) < 0.99).length,
      );
      expect(unfinished).toBe(0);
    });
  }

  test("the top of a page stays still", async ({ page }) => {
    // The hero blocks: the first section, and on a case study the hero image under it too.
    const TOPS = [
      { url: "/en/", blocks: 1 },
      { url: "/en/work/", blocks: 1 },
      { url: "/en/work/fantasy-eg/", blocks: 2 },
      { url: "/en/experience/", blocks: 1 },
      { url: "/en/services/", blocks: 1 },
      { url: "/en/about/", blocks: 1 },
      { url: "/en/contact/", blocks: 1 },
    ];
    for (const { url, blocks } of TOPS) {
      await page.goto(url, { waitUntil: "networkidle" });
      const moving = await page.evaluate(
        (count) =>
          [...document.querySelectorAll(`main > :nth-child(-n + ${count})`)]
            .filter((element) => element.checkVisibility())
            .flatMap((element) => element.getAnimations({ subtree: true }))
            .map((animation) => (animation as CSSAnimation).animationName),
        blocks,
      );
      expect(moving, url).toEqual([]);
    }
  });

  test("the timeline fills behind the reading line and lights each past role's dot", async ({ page }) => {
    await page.goto("/en/experience/", { waitUntil: "networkidle" });
    const dot = 'ol > li:nth-child(2) [data-dot="past"]';
    const borderOf = () => page.evaluate((sel) => getComputedStyle(document.querySelector(sel) as Element).borderTopColor, dot);

    await placeTop(page, dot, 0.8);
    expect(await borderOf()).not.toBe("rgb(31, 61, 255)");
    await placeTop(page, dot, 0.4);
    expect(await borderOf()).toBe("rgb(31, 61, 255)");

    const firstLine = await page.evaluate(() => {
      const line = document.querySelector("ol > li:first-child .timeline-progress") as Element;
      return { visibility: getComputedStyle(line).visibility, scale: getComputedStyle(line).scale };
    });
    expect(firstLine).toEqual({ visibility: "visible", scale: "1" });
  });

  test("a diagram draws its lines as it comes up, and the hero drawing stays still", async ({ page }) => {
    await page.goto("/en/work/fantasy-eg/", { waitUntil: "networkidle" });
    // How far the first visible line has drawn: 0 hidden, 1 drawn.
    const drawn = () =>
      page.evaluate(() => {
        const line = [...document.querySelectorAll(".figure-draw [data-line='']")].find((candidate) => candidate.checkVisibility());
        return Number(line?.getAnimations()[0]?.effect?.getComputedTiming().progress ?? -1);
      });

    await placeTop(page, ".figure-draw", 0.75);
    expect(await drawn()).toBeGreaterThan(0);
    expect(await drawn()).toBeLessThan(1);
    await placeTop(page, ".figure-draw", 0.2);
    expect(await drawn()).toBe(1);

    await page.goto("/en/work/vodafone-modernization/", { waitUntil: "networkidle" });
    const heroLines = await page.evaluate(() =>
      [...document.querySelectorAll("main > :nth-child(2) [data-line]")].flatMap((element) => element.getAnimations()).length,
    );
    expect(heroLines).toBe(0);
  });
});

test.describe("scroll motion with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("nothing moves on scroll and every block is shown", async ({ page }) => {
    for (const url of ["/en/", "/en/experience/", "/en/work/fantasy-eg/"]) {
      await page.goto(url, { waitUntil: "networkidle" });
      const state = await page.evaluate(() => ({
        animations: document.getAnimations().map((animation) => (animation as CSSAnimation).animationName),
        progressShown: [...document.querySelectorAll(".timeline-progress")].some(
          (element) => getComputedStyle(element).visibility === "visible",
        ),
      }));
      expect(state, url).toEqual({ animations: [], progressShown: false });
    }
  });
});
