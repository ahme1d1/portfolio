import { expect, test, type Page } from "./fixtures";

/** A view transition the page started, and the pseudo-elements it animated once it was ready. */
type Recorded = { types: string[]; animated: string[]; isSettled: boolean };

declare global {
  interface Window {
    __transitions?: Recorded[];
  }
}

/** Runs before the page's own scripts: wraps startViewTransition so each transition is recorded. */
function recordTransitions() {
  const log: Recorded[] = [];
  window.__transitions = log;
  if (!document.startViewTransition) return;
  const start = document.startViewTransition.bind(document);
  document.startViewTransition = ((arg?: Parameters<typeof start>[0]) => {
    const transition = start(arg);
    const types = typeof arg === "object" && arg?.types ? [...arg.types] : [];
    const entry: Recorded = { types, animated: [], isSettled: false };
    log.push(entry);
    transition.ready.then(
      () => {
        entry.animated = document
          .getAnimations()
          .map((animation) => animation.effect)
          .filter((effect): effect is KeyframeEffect => effect instanceof KeyframeEffect)
          .filter((effect) => effect.pseudoElement?.startsWith("::view-transition") && Number(effect.getTiming().duration) > 0)
          .map((effect) => effect.pseudoElement ?? "");
        entry.isSettled = true;
      },
      () => {
        entry.isSettled = true;
      },
    );
    return transition;
  }) as typeof document.startViewTransition;
}

const recorded = (page: Page) => page.evaluate(() => window.__transitions ?? []);

/** Every transition the page started, once each one is ready (or was skipped). */
async function settled(page: Page): Promise<Recorded[]> {
  await expect.poll(async () => (await recorded(page)).every((transition) => transition.isSettled)).toBe(true);
  return recorded(page);
}

/** What the language switch animated: waits until the transition is ready and lists its pseudo-elements. */
async function switchAnimates(page: Page): Promise<string[]> {
  await expect.poll(async () => (await recorded(page)).length).toBeGreaterThan(0);
  const [transition] = await settled(page);
  expect(transition?.types).toEqual(["locale-switch"]);
  return transition?.animated ?? [];
}

const group = (name: string) => `::view-transition-group(${name})`;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(recordTransitions);
});

test.describe("the language mirror", () => {
  test.beforeEach(async ({}, { project }) => {
    test.skip(project.name === "mobile", "Which blocks are on screen depends on the width; the phone case is below.");
  });

  const PAGES = [
    { from: "/en/", to: /\/ar\/$/, moves: ["mirror-portrait"] },
    { from: "/ar/", to: /\/en\/$/, moves: ["mirror-portrait"] },
    { from: "/en/about/", to: /\/ar\/about\/$/, moves: ["mirror-about-portrait"] },
    { from: "/en/work/", to: /\/ar\/work\/$/, moves: ["mirror-project-fantasy-eg", "mirror-project-educoursez"] },
    {
      from: "/en/work/fantasy-eg/",
      to: /\/ar\/work\/fantasy-eg\/$/,
      moves: ["mirror-case-fantasy-eg-desktop", "mirror-case-fantasy-eg-phone"],
    },
    { from: "/ar/work/educoursez/", to: /\/en\/work\/educoursez\/$/, moves: ["mirror-case-educoursez-screen-0"] },
    {
      from: "/en/work/vodafone-modernization/",
      to: /\/ar\/work\/vodafone-modernization\/$/,
      moves: ["mirror-case-vodafone-modernization-drawing"],
    },
  ];

  for (const { from, to, moves } of PAGES) {
    test(`moves the shared blocks on ${from}, fades the text and keeps the header still`, async ({ page }) => {
      await page.goto(from, { waitUntil: "networkidle" });
      await page.locator("header").getByRole("link", { name: from.startsWith("/en/") ? "العربية" : "English" }).click();
      await expect(page).toHaveURL(to);

      const animated = await switchAnimates(page);
      for (const name of moves) expect(animated).toContain(group(name));
      expect(animated).toContain("::view-transition-new(fade-main)");
      expect(animated.filter((pseudo) => pseudo.includes("site-header"))).toEqual([]);
    });
  }

  for (const from of ["/en/experience/", "/en/services/", "/en/contact/"]) {
    test(`only cross-fades the text on ${from}, which has no images`, async ({ page }) => {
      await page.goto(from, { waitUntil: "networkidle" });
      await page.locator("header").getByRole("link", { name: "العربية" }).click();
      await expect(page).toHaveURL(new RegExp(`${from.replace("/en/", "/ar/")}$`));

      const animated = await switchAnimates(page);
      expect(animated).toContain("::view-transition-new(fade-main)");
      expect(animated.filter((pseudo) => pseudo.includes("mirror-"))).toEqual([]);
    });
  }

  test("cross-fades the 404 into the other language's home page", async ({ page }) => {
    await page.goto("/en/no-such-page/", { waitUntil: "networkidle" });
    await page.getByRole("main").getByRole("link", { name: "العربية" }).click();
    await expect(page).toHaveURL(/\/ar\/$/);
    expect(await switchAnimates(page)).toContain("::view-transition-new(fade-main)");
  });

  test("opens the new page at the top when the switch is pressed further down", async ({ page }) => {
    await page.goto("/en/work/fantasy-eg/", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 1800));
    await page.locator("header").getByRole("link", { name: "العربية" }).click();
    await expect(page).toHaveURL(/\/ar\/work\/fantasy-eg\/$/);
    expect(await switchAnimates(page)).toContain("::view-transition-new(fade-main)");
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("animates nothing on an ordinary navigation", async ({ page }) => {
    await page.goto("/en/", { waitUntil: "networkidle" });
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Work" }).click();
    await expect(page).toHaveURL(/\/en\/work\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "Work" })).toBeVisible();
    // One more frame, so a transition started by this navigation would have been recorded.
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect((await settled(page)).flatMap((transition) => transition.animated)).toEqual([]);
  });
});

test("moves the portrait on a phone too", async ({ page }, { project }) => {
  test.skip(project.name !== "mobile", "The desktop layouts are covered above.");
  await page.goto("/en/", { waitUntil: "networkidle" });
  await page.locator("header").getByRole("link", { name: "العربية" }).click();
  await expect(page).toHaveURL(/\/ar\/$/);
  expect(await switchAnimates(page)).toContain(group("mirror-portrait"));
});

test.describe("hover and press", () => {
  test("a held button, pill or tile eases its press scale", async ({ page }, { project }) => {
    test.skip(project.name === "mobile", "Uses a mouse.");
    await page.goto("/en/contact/", { waitUntil: "networkidle" });
    // The pills are links: a press must not become a navigation.
    await page.evaluate(() =>
      document.addEventListener("click", (event) => event.preventDefault(), { capture: true }),
    );
    const targets = [
      page.locator("header").getByRole("link", { name: /CV/ }),
      page.locator("header").getByRole("link", { name: "العربية" }),
      page.locator("label").filter({ hasText: "A project" }).first(),
    ];
    for (const target of targets) {
      const box = await target.boundingBox();
      if (!box) throw new Error("target not visible");
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      const eased = await target.evaluate((element) =>
        element.getAnimations().map((animation) => (animation as CSSTransition).transitionProperty),
      );
      await page.mouse.up();
      expect(eased).toContain("scale");
    }
  });

  test("the menu slides and fades in, and its button presses", async ({ page }, { project }) => {
    test.skip(project.name !== "mobile", "The menu exists below 1024px.");
    await page.goto("/en/", { waitUntil: "networkidle" });
    const button = page.getByRole("button", { name: "Menu" });
    const panel = page.locator(`[id="${await button.getAttribute("aria-controls")}"]`);

    const box = await button.boundingBox();
    if (!box) throw new Error("menu button not visible");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    const pressed = await button.evaluate((element) =>
      element.getAnimations().map((animation) => (animation as CSSTransition).transitionProperty),
    );
    await page.mouse.up();
    expect(pressed).toContain("scale");

    const opening = await panel.evaluate((element) =>
      element.getAnimations().map((animation) => (animation as CSSTransition).transitionProperty),
    );
    expect(opening).toEqual(expect.arrayContaining(["opacity", "translate"]));
  });

  test("a theme change swaps the page colours at once; only the icons turn", async ({ page }, { project }) => {
    test.skip(project.name === "mobile", "The header button is desktop only.");
    await page.goto("/en/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Switch to dark theme" }).focus();
    await page.keyboard.press("Enter");
    const running = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((animation) => animation instanceof CSSTransition)
        .map((animation) => ({
          property: (animation as CSSTransition).transitionProperty,
          isIcon: ((animation.effect as KeyframeEffect).target as Element).classList.contains("theme-icon"),
        })),
    );
    expect(running.length).toBeGreaterThan(0);
    expect(running.filter((transition) => !transition.isIcon)).toEqual([]);
  });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the language switch is instant and keeps focus on the switch", async ({ page }) => {
    await page.goto("/en/", { waitUntil: "networkidle" });
    await page.locator("header").getByRole("link", { name: "العربية" }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/ar\/$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("header").getByRole("link", { name: "English" })).toBeFocused();
    expect((await settled(page)).flatMap((transition) => transition.animated)).toEqual([]);
  });

  test("the menu opens at once", async ({ page }, { project }) => {
    test.skip(project.name !== "mobile", "The menu exists below 1024px.");
    await page.goto("/en/", { waitUntil: "networkidle" });
    const button = page.getByRole("button", { name: "Menu" });
    const panel = page.locator(`[id="${await button.getAttribute("aria-controls")}"]`);
    await button.click();
    // Two frames in: with motion the fade has barely started; reduced motion shows the menu whole.
    const opacity = await panel.evaluate(
      (element) =>
        new Promise<string>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve(getComputedStyle(element).opacity))),
        ),
    );
    expect(opacity).toBe("1");
  });
});
