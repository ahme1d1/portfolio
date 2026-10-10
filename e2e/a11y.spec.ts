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
