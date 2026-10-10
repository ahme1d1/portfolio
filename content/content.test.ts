import { describe, expect, it } from "vitest";
import { walkStrings, type StringEntry } from "@/lib/testing/walk-strings";
import { arSeo } from "./seo/ar";
import { enSeo } from "./seo/en";
import { arSite } from "./site/ar";
import { enSite } from "./site/en";

const ARABIC_LETTER = /[؀-ۿ]/;

/** Arabic content that is Latin on purpose: brand names and file types. */
const LATIN_BY_DESIGN = new Set(["social.github", "social.linkedin", "cv.menuSuffix"]);

const MODULES = [
  { name: "site", en: enSite, ar: arSite },
  { name: "seo", en: enSeo, ar: arSeo },
];

const isLink = (entry: StringEntry) => entry.path.endsWith(".href");

describe.each(MODULES)("$name content", ({ en, ar }) => {
  const enStrings = walkStrings(en);
  const arStrings = walkStrings(ar);

  it("has the same keys in both languages", () => {
    expect(arStrings.map((s) => s.path)).toEqual(enStrings.map((s) => s.path));
  });

  it("has no em dashes and no visible placeholders", () => {
    const offenders = [...enStrings, ...arStrings].filter((s) => /—|\[[^\]]*\]/.test(s.value));
    expect(offenders).toEqual([]);
  });

  it("has Arabic in every Arabic string that is not Latin by design", () => {
    const offenders = arStrings
      .filter((s) => !isLink(s) && !LATIN_BY_DESIGN.has(s.path))
      .filter((s) => !ARABIC_LETTER.test(s.value));
    expect(offenders).toEqual([]);
  });

  it("translates every string that is not a link or Latin by design", () => {
    const enByPath = new Map(enStrings.map((s) => [s.path, s.value]));
    const untranslated = arStrings
      .filter((s) => !isLink(s) && !LATIN_BY_DESIGN.has(s.path))
      .filter((s) => enByPath.get(s.path) === s.value);
    expect(untranslated).toEqual([]);
  });

  it("keeps links identical in both languages", () => {
    const enLinks = enStrings.filter(isLink);
    expect(arStrings.filter(isLink)).toEqual(enLinks);
  });
});
