import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(import.meta.dirname, "..");
const SOURCE_DIRS = ["components", "app"].map((dir) => join(ROOT, dir));
/** Diagrams are drawings: their boxes and arrows keep the board's geometry, not the page rhythm. */
const DRAWINGS = join(ROOT, "components", "diagrams");

/**
 * The spacing scale (docs/SPEC.md "Page rhythm"): inside components 2–14, layout 16–128, plus 0
 * and the 1px hairline. Anything else is a one-off gap that drifts from page to page.
 */
const SCALE_PX = new Set([0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 72, 88, 96, 128]);

/** Padding, margin, gap and space utilities, with an optional minus: "-mt-2", "gap-x-[18px]", "py-3.5". */
const SPACING = /^-?(?:p[xytbselr]?|m[xytbselr]?|gap(?:-[xy])?|space-[xy])-(.+)$/;

function listComponentFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (path === DRAWINGS) return [];
    if (statSync(path).isDirectory()) return listComponentFiles(path);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

/** Every quoted string in the file: class lists live in "…", '…' and `…` literals. */
function stringLiterals(source: string): string[] {
  return [...source.matchAll(/"([^"\n]*)"|'([^'\n]*)'|`([^`]*)`/g)].map((match) => match[1] ?? match[2] ?? match[3] ?? "");
}

/** The utility without its variants: "lg:hover:mt-[18px]" or "[&_a]:mt-[18px]" → "mt-[18px]". */
function utility(token: string): string {
  return token.slice(token.lastIndexOf(":") + 1);
}

/** The pixels a spacing value stands for, or null when it isn't a length in px (auto, calc, %, 1lh). */
function pixels(value: string): number | null {
  if (value === "px") return 1;
  if (/^\d+(?:\.\d+)?$/.test(value)) return Number(value) * 4;
  const arbitrary = /^\[(\d+(?:\.\d+)?)px\]$/.exec(value);
  return arbitrary ? Number(arbitrary[1]) : null;
}

export function offScale(classes: string): string[] {
  return classes
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((token) => {
      const match = SPACING.exec(utility(token));
      const px = match ? pixels(match[1] as string) : null;
      return px !== null && !SCALE_PX.has(px) ? [`"${token}" is ${px}px`] : [];
    });
}

describe("spacing classes", () => {
  it("reads the scale from Tailwind steps and arbitrary pixels", () => {
    expect(offScale("mt-[18px] lg:gap-4.5 py-3.5 -mb-2.5 gap-x-14 mx-auto ps-[calc(1lh-2px)] [&_a]:pt-[22px]")).toEqual([
      '"mt-[18px]" is 18px',
      '"lg:gap-4.5" is 18px',
      '"[&_a]:pt-[22px]" is 22px',
    ]);
  });

  it("use only the spacing scale in components", () => {
    const problems = SOURCE_DIRS.flatMap(listComponentFiles).flatMap((file) =>
      stringLiterals(readFileSync(file, "utf8"))
        .flatMap(offScale)
        .map((problem) => `${relative(ROOT, file)}: ${problem}`),
    );
    expect(problems).toEqual([]);
  });
});
