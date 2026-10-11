import { test as base, expect, type Page } from "@playwright/test";

/** Browsers word CSP reports differently, but every one names the policy. */
const CSP_MESSAGE = /Content[ -]Security[ -]Policy/i;

/**
 * Collects the page's Content-Security-Policy violations: console reports (they arrive with JavaScript off
 * too, in Chromium and WebKit) and `securitypolicyviolation` events, passed out through an exposed function
 * so full page loads keep reporting.
 */
export async function watchCsp(page: Page): Promise<string[]> {
  const violations: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && CSP_MESSAGE.test(message.text())) violations.push(message.text());
  });
  await page.exposeFunction("__reportCspViolation", (report: string) => violations.push(report));
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      const report = (window as unknown as { __reportCspViolation: (text: string) => void }).__reportCspViolation;
      report(`${event.effectiveDirective} blocked ${event.blockedURI || "inline"} at ${event.sourceFile}:${event.lineNumber}`);
    });
  });
  return violations;
}

/**
 * Every spec imports `test` from here: each test fails on any CSP violation, so the whole suite (every page in
 * both languages, the 404s, the theme, the switch, the menu, the form) checks the policy in all three browsers.
 */
export const test = base.extend<{ cspGuard: void }>({
  cspGuard: [
    async ({ page }, use) => {
      const violations = await watchCsp(page);
      await use();
      expect(violations, "Content-Security-Policy violations").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
export type { Page, Route } from "@playwright/test";
