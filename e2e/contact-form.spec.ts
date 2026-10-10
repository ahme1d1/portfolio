import { expect, test, type Page, type Route } from "@playwright/test";

const WEB3FORMS = "https://api.web3forms.com/submit";

async function fillIn(page: Page, email = "sara@company.com") {
  await page.getByRole("radio", { name: "A project" }).check();
  await page.getByRole("textbox", { name: "Name" }).fill("Sara Ahmed");
  await page.getByRole("textbox", { name: "Email" }).fill(email);
  await page.getByRole("textbox", { name: "Message" }).fill("A booking app in Arabic and English.");
}

const send = (page: Page) => page.getByRole("button", { name: "Send message" }).click();

/** The form's own alert; Next's route announcer is an alert too. */
const summary = (page: Page) => page.getByRole("form", { name: "Contact form" }).getByRole("alert");

test.describe("contact form on Home", () => {
  // Nothing in these tests may reach the real service.
  test.beforeEach(async ({ page }) => {
    await page.route(WEB3FORMS, (route) => route.fulfill({ json: { success: true } }));
    await page.goto("/en/");
  });

  test("sends a message and says so", async ({ page }) => {
    let posted = "";
    await page.route(WEB3FORMS, (route) => {
      posted = route.request().postData() ?? "";
      return route.fulfill({ json: { success: true } });
    });
    await fillIn(page);
    await send(page);
    await expect(page.getByRole("heading", { name: "Message sent." })).toBeFocused();
    expect(posted).toContain("e2e-key");
    expect(posted).toContain("Sara Ahmed");
    await page.getByRole("button", { name: "Send another message" }).click();
    await expect(page.getByRole("textbox", { name: "Name" })).toHaveValue("");
  });

  test("an empty form points at the first thing to fix", async ({ page }) => {
    await send(page);
    await expect(summary(page)).toContainText("Fix the fields below");
    await expect(page.getByRole("radio", { name: "A role" })).toBeFocused();
  });

  test("an address without its domain gets the board's message", async ({ page }) => {
    await fillIn(page, "sara@company");
    await send(page);
    const email = page.getByRole("textbox", { name: "Email" });
    await expect(email).toBeFocused();
    await expect(email).toHaveAccessibleDescription("Add the part after the @, like company.com");
    await expect(email).toHaveValue("sara@company");
  });

  test("a dropped connection keeps the message and offers the email address", async ({ page }) => {
    await page.route(WEB3FORMS, (route) => route.abort());
    await fillIn(page);
    // Sent from the keyboard: Safari does not focus a button on click, so the keyboard is where focus matters.
    const button = page.getByRole("button", { name: "Send message" });
    await button.focus();
    await page.keyboard.press("Enter");
    const alert = summary(page);
    await expect(alert).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeFocused();
    await expect(alert.getByRole("link", { name: "ahmedadel8045@gmail.com" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Message" })).toHaveValue("A booking app in Arabic and English.");
  });

  test("locks the fields while sending", async ({ page }) => {
    let release: () => void = () => undefined;
    const held = new Promise<void>((resolve) => (release = resolve));
    await page.route(WEB3FORMS, async (route: Route) => {
      await held;
      await route.fulfill({ json: { success: true } });
    });
    await fillIn(page);
    await send(page);
    await expect(page.getByRole("button", { name: "Sending…" })).toHaveAttribute("aria-busy", "true");
    await expect(page.getByRole("textbox", { name: "Name" })).not.toBeEditable();
    await expect(page.getByRole("radio", { name: "A role" })).toBeDisabled();
    release();
    await expect(page.getByRole("heading", { name: "Message sent." })).toBeVisible();
  });

  test("arrow keys move between the topics", async ({ page }) => {
    const role = page.getByRole("radio", { name: "A role" });
    await role.focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("radio", { name: "A project" })).toBeChecked();
  });

  test("keeps a draft while you look at another page", async ({ page }) => {
    await page.getByRole("textbox", { name: "Name" }).fill("Sara Ahmed");
    await page.getByRole("link", { name: "All work" }).click();
    await expect(page).toHaveURL(/\/en\/work\/$/);
    await page.goBack();
    await expect(page.getByRole("textbox", { name: "Name" })).toHaveValue("Sara Ahmed");
  });
});

test("without JavaScript the form still posts to Web3Forms", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en/");
  const form = page.locator('form[aria-label="Contact form"]');
  await expect(form).toHaveAttribute("action", WEB3FORMS);
  await expect(form).toHaveAttribute("method", "post");
  await expect(form.locator('input[name="access_key"]')).toHaveValue("e2e-key");
  await context.close();
});
