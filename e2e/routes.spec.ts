import { expect, test } from "@playwright/test";
import { PAGE_PATHS } from "../content/routes";

const LOCALES = [
  { locale: "en", dir: "ltr" },
  { locale: "ar", dir: "rtl" },
] as const;

test.describe("every page", () => {
  for (const { locale, dir } of LOCALES) {
    for (const path of PAGE_PATHS) {
      const url = `/${locale}${path}`;
      test(`${url} is a static page in its language`, async ({ page }) => {
        const response = await page.goto(url);
        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("html")).toHaveAttribute("dir", dir);
        await expect(page.locator("h1:visible")).toHaveCount(1);
        await expect(page).toHaveTitle(locale === "en" ? / \| Ahmed Gabal$/ : / \| أحمد جبل$/);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${url}$`));
      });
    }
  }
});

test.describe("addresses", () => {
  test("the bare domain opens English", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\/$/);
  });

  test("a missing trailing slash is added", async ({ page }) => {
    await page.goto("/ar/work");
    await expect(page).toHaveURL(/\/ar\/work\/$/);
  });
});

test.describe("missing pages", () => {
  const CASES = [
    { url: "/en/nope/", heading: "This page doesn't exist.", title: "Page not found: old or mistyped link | Ahmed Gabal" },
    { url: "/en/work/nope/", heading: "This page doesn't exist.", title: "Page not found: old or mistyped link | Ahmed Gabal" },
    { url: "/ar/a/b/c/", heading: "هذه الصفحة غير موجودة.", title: "الصفحة غير موجودة | أحمد جبل" },
    { url: "/fr/", heading: "This page doesn't exist.", title: "Page not found: old or mistyped link | Ahmed Gabal" },
  ];

  for (const { url, heading, title } of CASES) {
    test(`${url} answers 404 with the site's own page`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
      await expect(page).toHaveTitle(title);
    });
  }
});

test("the sitemap lists every page in both languages", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  expect(body.match(/<url>/g)).toHaveLength(PAGE_PATHS.length * 2);
  expect(body).toContain("/ar/work/lean-academy/");
});
