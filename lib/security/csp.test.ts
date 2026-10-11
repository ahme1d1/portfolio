import { describe, expect, it } from "vitest";
import { WEB3FORMS_URL } from "@/lib/contact/send";
import { buildCsp, CSP_DIRECTIVES } from "./csp";

/** The values of one directive in a built header, or undefined when it is absent. */
function directive(header: string, name: string): string[] | undefined {
  const entry = header.split("; ").find((part) => part.split(" ")[0] === name);
  return entry?.split(" ").slice(1);
}

describe("buildCsp", () => {
  const header = buildCsp();

  it("joins each directive and its sources with spaces and the directives with semicolons", () => {
    expect(buildCsp({ "default-src": ["'self'"], "img-src": ["'self'", "data:"] })).toBe("default-src 'self'; img-src 'self' data:");
  });

  it("builds the site's policy from its directive table", () => {
    expect(header).toBe(buildCsp(CSP_DIRECTIVES));
    expect(directive(header, "default-src")).toEqual(["'self'"]);
  });

  it("lets Next's inline scripts run, and holds no hash or nonce that would switch 'unsafe-inline' off", () => {
    // Static pages carry inline scripts that change per page and per build, so no hash list can cover them.
    const scripts = directive(header, "script-src") ?? [];
    expect(scripts).toEqual(["'self'", "'unsafe-inline'"]);
    expect(scripts.some((source) => /^'(sha\d+|nonce)-/.test(source))).toBe(false);
  });

  it("allows styles only from the site's own stylesheets, with no inline styles", () => {
    expect(directive(header, "style-src")).toEqual(["'self'"]);
    expect(directive(header, "style-src-attr")).toBeUndefined();
  });

  it("loads images and fonts from the site only", () => {
    expect(directive(header, "img-src")).toEqual(["'self'"]);
    expect(directive(header, "font-src")).toEqual(["'self'"]);
  });

  it("lets the contact form send to Web3Forms, by fetch and by the no-JavaScript post with its success page", () => {
    const api = new URL(WEB3FORMS_URL).origin;
    expect(directive(header, "connect-src")).toEqual(["'self'", api]);
    expect(directive(header, "form-action")).toEqual([api, "https://web3forms.com"]);
  });

  it("forbids framing the site, a <base> element and plugins", () => {
    expect(directive(header, "frame-ancestors")).toEqual(["'none'"]);
    expect(directive(header, "base-uri")).toEqual(["'none'"]);
    expect(directive(header, "object-src")).toEqual(["'none'"]);
  });

  it("does not upgrade requests, which would break http://localhost in Safari (Vercel serves HTTPS only)", () => {
    expect(directive(header, "upgrade-insecure-requests")).toBeUndefined();
  });
});
