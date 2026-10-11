// @vitest-environment node
import { unstable_getResponseFromNextConfig } from "next/experimental/testing/server";
import { describe, expect, it } from "vitest";
import { buildCsp } from "@/lib/security/csp";
import nextConfig from "../next.config";

const ORIGIN = "https://ahmedgabal.vercel.app";

async function headersFor(path: string): Promise<Headers> {
  const response = await unstable_getResponseFromNextConfig({ url: ORIGIN + path, nextConfig });
  return response.headers;
}

describe("security headers (next.config.ts)", () => {
  it.each(["/en/", "/ar/work/qima/", "/en/nope/", "/nope/"])("sends the CSP and the other headers with %s", async (path) => {
    const headers = await headersFor(path);
    expect(headers.get("content-security-policy")).toBe(buildCsp());
    expect(headers.get("cross-origin-opener-policy")).toBe("same-origin");
    expect(headers.get("x-content-type-options")).toBe("nosniff");
    expect(headers.get("x-frame-options")).toBe("DENY");
    expect(headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(headers.get("permissions-policy")).toBe("camera=(), microphone=(), geolocation=()");
  });

  it.each(["/cv/Ahmed_Gabal_Senior_Frontend_Engineer.pdf", "/_next/static/chunks/app.js"])(
    "sends no CSP with the file %s (a CSP on the PDF can break the browser's viewer)",
    async (path) => {
      const headers = await headersFor(path);
      expect(headers.get("content-security-policy")).toBeNull();
      expect(headers.get("x-content-type-options")).toBe("nosniff");
    },
  );

  it("never says which framework serves the site", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });
});
