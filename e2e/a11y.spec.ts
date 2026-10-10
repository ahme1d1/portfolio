import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PAGE_PATHS } from "../content/routes";

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`accessibility (${colorScheme})`, () => {
    test.use({ colorScheme });
    test.beforeEach(async ({}, { project }) => {
      test.skip(project.name === "safari", "Axe runs in Chromium; WebKit covers behaviour.");
    });

    for (const locale of ["en", "ar"]) {
      for (const path of PAGE_PATHS) {
        test(`/${locale}${path} has no WCAG A or AA violations`, async ({ page }) => {
          await page.goto(`/${locale}${path}`);
          const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
          expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
        });
      }
    }
  });
}

test.describe("accessibility of other states", () => {
  test.beforeEach(async ({}, { project }) => {
    test.skip(project.name === "safari", "Axe runs in Chromium; WebKit covers behaviour.");
  });

  const scan = (page: import("@playwright/test").Page) =>
    new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();

  test("the open mobile menu", async ({ page }, { project }) => {
    test.skip(project.name !== "mobile", "The menu exists below 1024px.");
    for (const locale of ["en", "ar"]) {
      await page.goto(`/${locale}/`);
      await page.getByRole("button", { name: locale === "en" ? "Menu" : "القائمة" }).click();
      // Measure contrast once the 200ms fade-in has finished, not mid-animation.
      await expect(page.locator("[data-open]")).toHaveCSS("opacity", "1");
      const results = await scan(page);
      expect(results.violations.map((v) => v.id)).toEqual([]);
    }
  });

  test("the 404 page in both languages", async ({ page }) => {
    for (const url of ["/en/nope/", "/ar/nope/"]) {
      await page.goto(url);
      await page.getByRole("heading", { level: 1 }).waitFor();
      const results = await scan(page);
      expect(results.violations.map((v) => v.id)).toEqual([]);
    }
  });
});
