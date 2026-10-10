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

  test("the contact form's error and sent states in both languages", async ({ page }) => {
    await page.route("https://api.web3forms.com/submit", (route) => route.fulfill({ json: { success: true } }));
    for (const locale of ["en", "ar"] as const) {
      const t = locale === "en" ? { send: "Send message", project: "A project", name: "Name", email: "Email", message: "Message" } : { send: "إرسال الرسالة", project: "مشروع", name: "الاسم", email: "البريد الإلكتروني", message: "الرسالة" };
      await page.goto(`/${locale}/`);
      await page.getByRole("button", { name: t.send }).click();
      await expect(page.locator("form").getByRole("alert")).toHaveCSS("opacity", "1");
      // Focus scrolled the form into view; at the top nothing sits under the sticky header.
      await page.evaluate(() => window.scrollTo(0, 0));
      expect((await scan(page)).violations.map((v) => v.id)).toEqual([]);

      await page.getByRole("radio", { name: t.project }).check();
      await page.getByRole("textbox", { name: t.name }).fill("Sara");
      await page.getByRole("textbox", { name: t.email }).fill("sara@company.com");
      await page.getByRole("textbox", { name: t.message }).fill("Hello");
      await page.getByRole("button", { name: t.send }).click();
      await expect(page.getByRole("status").filter({ has: page.getByRole("heading") })).toHaveCSS("opacity", "1");
      await page.evaluate(() => window.scrollTo(0, 0));
      expect((await scan(page)).violations.map((v) => v.id)).toEqual([]);
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
