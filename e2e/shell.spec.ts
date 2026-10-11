import { expect, test } from "./fixtures";

const isMobile = (name: string) => name === "mobile";

test.describe("theme", () => {
  test("a chosen theme survives a reload without flashing", async ({ page }, { project }) => {
    test.skip(isMobile(project.name), "The header button is desktop only; the menu row is tested below.");
    await page.goto("/en/");
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    // The inline script runs before first paint: the attribute is there before any React code.
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        (window as unknown as { themeAtParse: string | undefined }).themeAtParse = document.documentElement.dataset.theme;
      });
    });
    await page.reload();
    expect(await page.evaluate(() => (window as unknown as { themeAtParse?: string }).themeAtParse)).toBe("dark");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
    await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  });

  test("a chosen theme stays through the language switch", async ({ page }, { project }) => {
    test.skip(isMobile(project.name), "The header button is desktop only.");
    await page.goto("/en/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await page.locator("header").getByRole("link", { name: "العربية" }).click();
    await expect(page).toHaveURL(/\/ar\/$/);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
  });

  test("the first visit follows the system", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/ar/");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(0, 0, 0)");
    await context.close();
  });
});

test.describe("mobile menu", () => {
  test.beforeEach(async ({}, { project }) => {
    test.skip(!isMobile(project.name), "The menu exists below 1024px.");
  });

  test("works with the keyboard", async ({ page }) => {
    await page.goto("/en/work/");
    const button = page.getByRole("button", { name: "Menu" });
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Work" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
  });

  test("switches the theme from its row", async ({ page }) => {
    await page.goto("/en/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("button", { name: "Dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.getByRole("button", { name: "Light theme" })).toBeVisible();
  });

  test("closes after picking a page", async ({ page }) => {
    await page.goto("/ar/");
    await page.getByRole("button", { name: "القائمة" }).click();
    await page.getByRole("navigation", { name: "القائمة الرئيسية" }).getByRole("link", { name: "نبذة عني" }).click();
    await expect(page).toHaveURL(/\/ar\/about\/$/);
    await expect(page.getByRole("button", { name: "القائمة" })).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("language switch", () => {
  test("opens the same page in the other language and keeps focus on the switch", async ({ page }) => {
    await page.goto("/en/work/qima/");
    const toArabic = page.locator("header").getByRole("link", { name: "العربية" });
    await toArabic.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/ar\/work\/qima\/$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("header").getByRole("link", { name: "English" })).toBeFocused();
  });
});

test("the skip link jumps to the main content", async ({ page }, { project }) => {
  await page.goto("/en/about/");
  // Safari on macOS skips links on Tab unless the user turns it on; Option+Tab always reaches them.
  await page.keyboard.press(project.name === "safari" ? "Alt+Tab" : "Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-en")).toBeFocused();
});
