import { expect, test } from "./fixtures";
import { caseLink } from "./helpers";

test.describe("Home", () => {
  test("names every project link and opens a case study from anywhere on its card", async ({ page }) => {
    await page.goto("/en/");
    for (const name of ["Fantasy EG", "Educoursez", "Vodafone modernization"]) {
      await expect(page.getByRole("link", { name: caseLink(name) })).toBeVisible();
    }
    // The card's one link is stretched over the whole card, so a click on the image is a click on it.
    const image = page.getByRole("img", { name: "Fantasy EG website in Arabic" });
    await image.scrollIntoViewIfNeeded();
    const box = await image.boundingBox();
    if (!box) throw new Error("the card image is not on screen");
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(page).toHaveURL(/\/en\/work\/fantasy-eg\/$/);
  });

  test("names the Arabic project links in Arabic", async ({ page }) => {
    await page.goto("/ar/");
    await expect(page.getByRole("link", { name: "اقرأ دراسة الحالة لمشروع تحديث نظام فودافون" })).toBeVisible();
  });

  test("shows one All work link at each width", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.getByRole("link", { name: "All work" })).toHaveCount(1);
    await expect(page.getByRole("link", { name: "All work" })).toHaveAttribute("href", "/en/work/");
  });

  test("tells search engines who the site is about", async ({ page }) => {
    await page.goto("/en/");
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(data).toMatchObject({ "@type": "Person", name: "Ahmed Gabal", jobTitle: "Senior Frontend Engineer" });
  });

  test("loads the portrait first and the project images when needed", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.getByRole("img", { name: "Ahmed Gabal" })).toHaveAttribute("fetchpriority", "high");
    await expect(page.getByRole("img", { name: "Fantasy EG website in Arabic" })).toHaveAttribute("loading", "lazy");
  });
});
