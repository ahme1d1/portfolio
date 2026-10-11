import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(import.meta.dirname, "..");
const SOURCE_DIRS = ["components", "app"].map((dir) => join(ROOT, dir));

function listComponentFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return listComponentFiles(path);
    return name.endsWith(".tsx") && !name.endsWith(".test.tsx") ? [path] : [];
  });
}

/** Every quoted string in the file: class lists live in "…", '…' and `…` literals. */
function stringLiterals(source: string): string[] {
  return [...source.matchAll(/"([^"\n]*)"|'([^'\n]*)'|`([^`]*)`/g)].map((match) => match[1] ?? match[2] ?? match[3] ?? "");
}

/** The utility without its variants: "hover:active:scale-[0.97]" → "scale-[0.97]". */
function utility(token: string): string {
  return token.replace(/^(?:[\w-]+(?:-\[[^\]]*\])?:)+/, "");
}

/**
 * Why a class string breaks the motion rules (Interactions board), or null.
 * - `transition`, `transition-colors` and `transition-all` also animate outline-color, so the focus ring would fade in.
 * - Tailwind 4 `scale-*` and `translate-*` set the `scale` and `translate` properties, so a list naming
 *   `transform` leaves presses and slides unanimated.
 * - A press scale needs `transition-fast`, or it snaps.
 */
function motionProblem(classes: string): string | null {
  const tokens = classes.split(/\s+/).filter(Boolean);
  for (const token of tokens.map(utility)) {
    if (token === "transition" || token === "transition-colors" || token === "transition-all") {
      return `"${token}" animates the focus ring; use transition-fast`;
    }
    if (token.startsWith("[transition")) return `"${token}" sets the transition by hand; use transition-fast`;
    if (token.startsWith("transition-[") && /transform|outline|box-shadow/.test(token)) {
      return `"${token}" names transform, outline or box-shadow`;
    }
  }
  const pressesWithScale = tokens.some(
    (token) => /(^|:)active:/.test(token) && /^scale-(?!100\b)/.test(utility(token)),
  );
  if (pressesWithScale && !tokens.map(utility).includes("transition-fast")) {
    return "a press scale without transition-fast snaps";
  }
  return null;
}

describe("motion classes", () => {
  it("name their properties, never animate the focus ring, and animate every press", () => {
    const problems = SOURCE_DIRS.flatMap(listComponentFiles).flatMap((file) =>
      stringLiterals(readFileSync(file, "utf8"))
        .map(motionProblem)
        .filter((problem): problem is string => problem !== null)
        .map((problem) => `${relative(ROOT, file)}: ${problem}`),
    );

    expect(problems).toEqual([]);
  });

  it("recognises the patterns it guards against", () => {
    expect(motionProblem("text-muted transition-colors hover:text-ink")).toMatch(/focus ring/);
    expect(motionProblem("lg:transition hover:bg-surface")).toMatch(/focus ring/);
    expect(motionProblem("[transition:all_150ms] hover:bg-surface")).toMatch(/by hand/);
    expect(motionProblem("transition-[opacity,transform] data-open:opacity-100")).toMatch(/transform/);
    expect(motionProblem("bg-inverse active:scale-[0.97]")).toMatch(/snaps/);
    expect(motionProblem("transition-fast bg-inverse active:scale-[0.97]")).toBeNull();
    expect(motionProblem("transition-[opacity,translate,visibility] ease-leave")).toBeNull();
    expect(motionProblem("has-aria-disabled:active:scale-100")).toBeNull();
  });
});
