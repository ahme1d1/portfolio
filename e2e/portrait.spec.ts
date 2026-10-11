import { expect, test, type Page } from "./fixtures";

// The portrait card on Home and About (Ahmed 2026-10-11, option C): phones keep the board's crop; from 480 px the
// whole chest-up photo shows in the card; from 768 px the photo sits beside the text, as on desktop. Before, the
// card stretched to the full width at a fixed height and cut the face (Home) or the head (About) off.
test.use({ reducedMotion: "reduce" });

test.beforeEach(async ({}, { project }) => {
  test.skip(project.name !== "desktop", "Sets its own widths.");
});

async function portraitLayout(page: Page) {
  const figure = page.locator("main figure.intro-scale").filter({ visible: true }).first();
  const heading = page.getByRole("heading", { level: 1 }).filter({ visible: true }).first();
  const fit = await figure.locator("img").evaluate((img) => getComputedStyle(img).objectFit);
  const [card, title] = [await figure.boundingBox(), await heading.boundingBox()];
  if (!card || !title) throw new Error("The portrait or the heading is not on the page");
  const isBeside = card.y < title.y + title.height && title.y < card.y + card.height;
  return { fit, isBeside, isPortraitFirst: card.x < title.x };
}

const WIDTHS = [
  { width: 390, fit: "cover", isBeside: false },
  { width: 600, fit: "contain", isBeside: false },
  { width: 834, fit: "cover", isBeside: true },
  { width: 1000, fit: "cover", isBeside: true },
  { width: 1440, fit: "cover", isBeside: true },
] as const;

for (const path of ["/", "/about/"]) {
  for (const { width, fit, isBeside } of WIDTHS) {
    test(`${path} at ${width} px: the portrait is ${isBeside ? "beside the title" : "above the title"} and never cut`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const locale of ["en", "ar"] as const) {
        await page.goto(`/${locale}${path}`);
        const layout = await portraitLayout(page);
        expect(layout.fit).toBe(fit);
        expect(layout.isBeside).toBe(isBeside);
        // Beside the text the photo sits at the end: the right in English, the left in Arabic.
        if (isBeside) expect(layout.isPortraitFirst).toBe(locale === "ar");
      }
    });
  }
}
