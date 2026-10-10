import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(import.meta.dirname, "..");

// Ahmed's rule: the two agencies behind the "More projects" work are never named on the site or in
// this public repo. So this file holds only SHA-256 hashes of their names and of one's domain.
interface Forbidden {
  readonly length: number;
  readonly sha256: string;
}
type Mode = "code" | "copy";

/** Code is checked case-sensitively, as the names are written. */
const IN_CODE: readonly Forbidden[] = [
  { length: 6, sha256: "b6392a1a9830cb9259c387c3d292c893253c52a3eeefeae12a285da6ec42929f" },
  { length: 6, sha256: "2509a26877403b3ffa4f242a266f7843bc3327829ddf8f325fb6dca399b7c2ac" },
  { length: 9, sha256: "ee62090bb7ab9c03c238b04be035e1989c0c09577374b712702e7fa40e92e7de" },
];
/** Copy is lower-cased first, so any letter case counts. */
const IN_COPY: readonly Forbidden[] = [
  { length: 6, sha256: "381d5d94e168a810f723a90993e1a424589391db725bf0a4d9b91579f757ddc6" },
  { length: 6, sha256: "d4fba09b856cc0aa0f2b643f7d9ca20d309dc89b5e562f1229809c51f1e20dcc" },
  { length: 9, sha256: "ee62090bb7ab9c03c238b04be035e1989c0c09577374b712702e7fa40e92e7de" },
];
const COPY_DIRS = [join(ROOT, "content")];

const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "coverage", "playwright-report", "test-results"]);
const SKIP_FILES = new Set([join(ROOT, "package-lock.json")]);
const TEXT_FILE = /\.(ts|tsx|mts|mjs|js|json|css|md|txt|xml|svg|html)$/;
const LETTER = /[A-Za-z]/;

const hashes = new Map<string, string>();
function sha256(text: string): string {
  const known = hashes.get(text);
  if (known) return known;
  const hash = createHash("sha256").update(text).digest("hex");
  hashes.set(text, hash);
  return hash;
}

const isLetter = (char: string | undefined) => char !== undefined && LETTER.test(char);

/**
 * True when a name starts a word (no Latin letter before it). In code anything may follow
 * ("WidgetTeam", "Widget_Co"); in copy no letter may follow, so a longer word passes.
 */
function hasForbiddenName(text: string, names: readonly Forbidden[], mode: Mode): boolean {
  for (let start = 0; start < text.length; start++) {
    if (!isLetter(text[start]) || isLetter(text[start - 1])) continue;
    const found = names.some(({ length, sha256: hash }) => {
      const end = start + length;
      if (end > text.length || (mode === "copy" && isLetter(text[end]))) return false;
      const slice = text.slice(start, end);
      return sha256(mode === "copy" ? slice.toLowerCase() : slice) === hash;
    });
    if (found) return true;
  }
  return false;
}

function listTextFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return SKIP_DIRS.has(name) ? [] : listTextFiles(path);
    return TEXT_FILE.test(name) ? [path] : [];
  });
}

describe("agency names", () => {
  it("never appear in any file of the repo", () => {
    const offenders = listTextFiles(ROOT)
      .filter((file) => !SKIP_FILES.has(file))
      .filter((file) => {
        const text = readFileSync(file, "utf8");
        const isCopy = COPY_DIRS.some((dir) => file.startsWith(dir));
        return hasForbiddenName(text, IN_CODE, "code") || (isCopy && hasForbiddenName(text, IN_COPY, "copy"));
      })
      .map((file) => relative(ROOT, file));

    expect(offenders).toEqual([]);
  });
});

describe("hasForbiddenName", () => {
  // "Widget" stands in for a name and "widget.io" for a domain.
  const standIn = (word: string): Forbidden => ({ length: word.length, sha256: sha256(word) });
  const inCode = [standIn("Widget"), standIn("widget.io")];
  const inCopy = [standIn("widget"), standIn("widget.io")];

  it("finds a name in code where a word starts, whatever follows", () => {
    for (const text of ["Widget", "built by Widget.", "WidgetTeam", "Widget_Co", "_Widget", "1Widget"]) {
      expect(hasForbiddenName(text, inCode, "code"), text).toBe(true);
    }
  });

  it("lets code use the name inside a longer word or in lower case", () => {
    for (const text of ["MyWidget", "widget", "widgets", "Widge", ""]) {
      expect(hasForbiddenName(text, inCode, "code"), text).toBe(false);
    }
  });

  it("finds the domain in code", () => {
    expect(hasForbiddenName("see widget.io/about", inCode, "code")).toBe(true);
  });

  it("finds a name in copy in any letter case when no letter follows", () => {
    for (const text of ["WIDGET", "widget", "the Widget's site", "Widget.", "WIDGET.IO"]) {
      expect(hasForbiddenName(text, inCopy, "copy"), text).toBe(true);
    }
  });

  it("lets copy use a longer word that starts with the name", () => {
    for (const text of ["Widgets", "widgetry", "MyWidget", "WidgetTeam"]) {
      expect(hasForbiddenName(text, inCopy, "copy"), text).toBe(false);
    }
  });
});
