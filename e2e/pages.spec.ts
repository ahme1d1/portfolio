import { expect, test, type Page } from "@playwright/test";
import { CV_PATH } from "../content/links";

const PAGES = [
  { path: "/experience/", en: "Experience", ar: "الخبرات" },
  { path: "/services/", en: "Services", ar: "الخدمات" },
  { path: "/about/", en: "About", ar: "نبذة عني" },
  { path: "/contact/", en: "Contact", ar: "تواصل" },
] as const;

/** The visible text of the page's content: hidden responsive variants don't count. */
const mainText = (page: Page) => page.locator("main").evaluate((main) => (main as HTMLElement).innerText);

/** Footer links exist at every width; the header's are in the menu on phones. */
const footerLink = (page: Page, name: string) => page.getByRole("contentinfo").getByRole("link", { name, exact: true });

test("the CV the header links to is a PDF", async ({ request }) => {
  const response = await request.get(CV_PATH);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

for (const { path, ...titles } of PAGES) {
  for (const locale of ["en", "ar"] as const) {
    test(`${path} (${locale}) has its title, no placeholder and no horizontal scroll`, async ({ page }) => {
      await page.goto(`/${locale}${path}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(titles[locale]);
      expect(await mainText(page)).not.toMatch(/\[|Ahmed:|أحمد:/);
      for (const width of [390, 800]) {
        await page.setViewportSize({ width, height: 900 });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `overflow at ${width}px`).toBe(0);
      }
    });
  }
}

test.describe("Experience", () => {
  test("offers the CV beside the title and lists the three companies, newest first", async ({ page }) => {
    await page.goto("/en/experience/");
    await expect(page.getByRole("main").getByRole("link", { name: "Download CV (PDF)" })).toHaveAttribute("href", CV_PATH);
    const roles = page.getByRole("region", { name: "Roles" }).getByRole("listitem").filter({ has: page.getByRole("heading", { level: 3 }) });
    await expect(roles).toHaveCount(3);
    await expect(roles.first().getByRole("link")).toHaveText("VOIS (Vodafone Intelligent Solutions)");
  });
});

test.describe("Services", () => {
  test("the EVA Pharma link lands on that row of Experience, clear of the header", async ({ page }) => {
    await page.goto("/en/services/");
    await page.getByRole("link", { name: "EVA Pharma & Curium sites" }).click();
    await expect(page).toHaveURL(/\/en\/experience\/#experience-eva-pharma-en$/);
    const row = page.locator("#experience-eva-pharma-en");
    await expect(row).toBeInViewport();
    const header = await page.getByRole("banner").boundingBox();
    await expect.poll(async () => (await row.boundingBox())?.y ?? 0).toBeGreaterThanOrEqual((header?.height ?? 0) - 1);
  });

  test("Start a project opens the form with the project picked", async ({ page }) => {
    await page.goto("/en/services/");
    await page.getByRole("main").getByRole("link", { name: /Start a project/ }).click();
    await expect(page).toHaveURL(/\/en\/contact\/\?topic=project$/);
    await expect(page.getByRole("radio", { name: "A project" })).toBeChecked();
  });
});

test.describe("About", () => {
  test("loads the portrait and links to the experience and Fantasy EG", async ({ page }) => {
    await page.goto("/en/about/");
    const portrait = page.getByRole("img", { name: "Ahmed Gabal" });
    await expect(portrait).toBeVisible();
    await expect.poll(() => portrait.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await page.getByRole("main").getByRole("link", { name: "Fantasy EG case study" }).click();
    await expect(page).toHaveURL(/\/en\/work\/fantasy-eg\/$/);
  });
});

test("moving through the four pages and switching language logs no errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/en/");
  for (const { path, en } of PAGES) {
    await footerLink(page, en).click();
    await expect(page).toHaveURL(new RegExp(`/en${path}$`));
    await expect(page.getByRole("heading", { level: 1, name: en })).toBeVisible();
  }
  await page.getByRole("link", { name: "العربية" }).first().click();
  await expect(page).toHaveURL(/\/ar\/contact\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "تواصل" })).toBeVisible();
  expect(errors).toEqual([]);
});
