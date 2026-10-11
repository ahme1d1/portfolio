import { expect, test } from "./fixtures";
import { CV_PATH } from "../content/links";
import { PAGE_PATHS } from "../content/routes";
import { buildCsp } from "../lib/security/csp";

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

for (const path of ["/en/", "/ar/contact/", "/en/nope/"]) {
  test(`${path} is served with the security headers and the CSP`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.headers()).toMatchObject({
      "content-security-policy": buildCsp(),
      "cross-origin-opener-policy": "same-origin",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "x-frame-options": "DENY",
      "permissions-policy": "camera=(), microphone=(), geolocation=()",
    });
    expect(response.headers()["x-powered-by"]).toBeUndefined();
  });
}

test("the CV PDF is served without a CSP, which can break the browser's viewer", async ({ request }) => {
  const response = await request.get(CV_PATH);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-security-policy"]).toBeUndefined();
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
  // Each page names both languages and English as the default, as its <head> does.
  expect(body.match(/hreflang="x-default"/g)).toHaveLength(PAGE_PATHS.length * 2);
});
