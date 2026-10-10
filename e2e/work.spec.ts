import { expect, test } from "@playwright/test";
import { caseLink } from "./helpers";

test.describe("Work", () => {
  test("shows the three main projects and the four client projects", async ({ page }) => {
    await page.goto("/en/work/");
    await expect(page.getByRole("article")).toHaveCount(7);
    for (const name of ["TikVideo", "Cultural Bridge", "Qima", "Lean Academy"]) {
      await expect(page.getByRole("link", { name: caseLink(name) })).toBeVisible();
    }
  });

  test("lists earlier work as a table on wide screens and by company on phones", async ({ page }, { project }) => {
    await page.goto("/en/work/");
    const table = page.getByRole("table");
    const baianat = page.getByRole("heading", { level: 3, name: "Baianat 2021 – 2022" });
    if (project.name === "mobile") {
      await expect(table).toBeHidden();
      await expect(baianat).toBeVisible();
    } else {
      await expect(table.getByRole("rowheader")).toHaveCount(13);
      await expect(baianat).toBeHidden();
    }
  });

  test("the hiring door opens the contact page for a role", async ({ page }) => {
    await page.goto("/en/work/");
    await page.getByRole("link", { name: "Hiring? Tell me about the role" }).click();
    await expect(page).toHaveURL(/\/en\/contact\/\?topic=role$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
