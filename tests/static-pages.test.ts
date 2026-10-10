import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const APP = join(import.meta.dirname, "..", "app");

function pageFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return pageFiles(path);
    return name === "page.tsx" ? [path] : [];
  });
}

/**
 * Every real page must stay static. The 404 catch-all is the exception: Next 16.4 cannot build a
 * static shell for a page that only calls notFound().
 */
describe("static pages", () => {
  const pages = pageFiles(APP).filter((file) => !file.includes("[...rest]"));

  it("finds the site's pages", () => {
    expect(pages.length).toBeGreaterThanOrEqual(7);
  });

  it.each(pages.map((file) => [relative(APP, file), file]))("%s requires static output", (_, file) => {
    expect(readFileSync(file, "utf8")).toMatch(/export const ensureStatic = "navigation";/);
  });
});
