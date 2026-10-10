import { expect, test, type Page } from "@playwright/test";
import { MORE_PROJECT_SLUGS, nextCaseSlug, type CaseSlug } from "../content/cases/slugs";

/** Each case's title in both languages, and whether its hero is screenshots (a drawing has none). */
const CASES: Readonly<Record<CaseSlug, { en: string; ar: string; screenshots: boolean }>> = {
  "fantasy-eg": { en: "Fantasy EG", ar: "Fantasy EG", screenshots: true },
  educoursez: { en: "Educoursez", ar: "Educoursez", screenshots: true },
  "vodafone-modernization": { en: "Vodafone modernization", ar: "تحديث نظام فودافون", screenshots: false },
  tikvideo: { en: "TikVideo", ar: "TikVideo", screenshots: true },
  "cultural-bridge": { en: "Cultural Bridge", ar: "جسر الثقافة", screenshots: true },
  qima: { en: "Qima", ar: "منصة قيمة", screenshots: true },
  "lean-academy": { en: "Lean Academy", ar: "لين أكاديمي", screenshots: false },
};

const TITLES: Readonly<Record<CaseSlug, string>> = {
  "fantasy-eg": "Fantasy EG",
  educoursez: "Educoursez",
  "vodafone-modernization": "Vodafone modernization",
  tikvideo: "TikVideo",
  "cultural-bridge": "Cultural Bridge",
  qima: "Qima",
  "lean-academy": "Lean Academy",
};

/** The visible text of the page's content: the footer's "© 2026" and hidden variants don't count. */
const mainText = (page: Page) => page.locator("main").evaluate((main) => (main as HTMLElement).innerText);

for (const [slug, titles] of Object.entries(CASES) as [CaseSlug, { en: string; ar: string; screenshots: boolean }][]) {
  test.describe(`case study ${slug}`, () => {
    for (const locale of ["en", "ar"] as const) {
      test(`opens with its title and goes back to Work (${locale})`, async ({ page }) => {
        await page.goto(`/${locale}/work/${slug}/`);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(titles[locale]);
        const breadcrumb = page.getByRole("navigation", { name: locale === "en" ? "Breadcrumb" : "مسار التصفح" });
        await breadcrumb.getByRole("link").click();
        await expect(page).toHaveURL(new RegExp(`/${locale}/work/$`));
      });

      test(`shows no placeholder and no horizontal scroll (${locale})`, async ({ page }) => {
        await page.goto(`/${locale}/work/${slug}/`);
        const text = await mainText(page);
        expect(text).not.toMatch(/\[|add the real|أضف الرقم/);
        if (MORE_PROJECT_SLUGS.includes(slug)) expect(text).not.toMatch(/\b(19|20)\d{2}\b/);
        for (const width of [390, 800]) {
          await page.setViewportSize({ width, height: 900 });
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
          expect(overflow, `overflow at ${width}px`).toBe(0);
        }
      });
    }

    test("loads its hero screenshots", async ({ page }) => {
      test.skip(!titles.screenshots, "This hero is a drawing.");
      await page.goto(`/en/work/${slug}/`);
      const images = page.locator("main figure").first().locator("img");
      await expect(images.first()).toBeVisible();
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      }
    });

    test("ends with the next case study", async ({ page }) => {
      const next = nextCaseSlug(slug);
      await page.goto(`/en/work/${slug}/`);
      await page.getByRole("link", { name: `Next case study ${TITLES[next]}` }).click();
      await expect(page).toHaveURL(new RegExp(`/en/work/${next}/$`));
    });

    test("puts the summary above the facts on phones", async ({ page }, { project }) => {
      test.skip(project.name !== "mobile", "Desktop keeps the facts first.");
      await page.goto(`/en/work/${slug}/`);
      const summary = await page.getByRole("heading", { level: 2, name: "Summary" }).boundingBox();
      const facts = await page.getByRole("region", { name: "Project facts" }).boundingBox();
      expect(summary?.y ?? 0).toBeLessThan(facts?.y ?? 0);
    });
  });
}

test("moving between case studies and languages logs no errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/en/work/");
  await page.getByRole("link", { name: /^Read the case study ?: Fantasy EG$/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Fantasy EG" })).toBeVisible();
  await page.getByRole("link", { name: /^Next case study / }).click();
  await expect(page).toHaveURL(/\/en\/work\/educoursez\/$/);
  await page.getByRole("link", { name: "العربية" }).first().click();
  await expect(page).toHaveURL(/\/ar\/work\/educoursez\/$/);
  expect(errors).toEqual([]);
});
