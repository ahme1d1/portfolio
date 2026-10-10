import { describe, expect, it } from "vitest";
import { CASE_DATA } from "@/content/cases/data";
import type { CaseModules } from "@/content/cases";
import type { CaseSlug } from "@/content/cases/slugs";
import { outsideLatin, validateRich } from "@/lib/rich/parse";
import { walkStrings, type StringEntry } from "./walk-strings";

const ARABIC_LETTER = /[؀-ۿ]/;
const ASCII_LETTER = /[A-Za-z]/;
const ANY_LETTER = /\p{L}/u;

/** Arabic content that is Latin on purpose: brand names and file types. */
const LATIN_BY_DESIGN = new Set(["social.github", "social.linkedin", "cv.menuSuffix"]);

/** Slots a copy string may name; the component fills them. */
const SLOTS = ["email", "site"];

const isLink = (entry: StringEntry) => entry.path.endsWith(".href");

/** Numbers ("1,455", "98.43%") and copy that is only marked Latin ("{PostgreSQL}") need no Arabic. */
const isLanguageNeutral = (entry: StringEntry) => !ANY_LETTER.test(outsideLatin(entry.value));

const isExempt = (entry: StringEntry) => isLink(entry) || LATIN_BY_DESIGN.has(entry.path) || isLanguageNeutral(entry);

/** `rich` modules are rendered through <Rich>: Latin words in Arabic copy must sit in {…}. */
export type ContentModule = { name: string; en: unknown; ar: unknown; rich: boolean };

/** The checks every pair of English and Arabic copy modules must pass. */
export function describeContentModule({ name, en, ar, rich }: ContentModule): void {
  describe(`${name} content`, () => {
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
      const offenders = arStrings.filter((s) => !isExempt(s)).filter((s) => !ARABIC_LETTER.test(s.value));
      expect(offenders).toEqual([]);
    });

    it("translates every string that is not a link or Latin by design", () => {
      const enByPath = new Map(enStrings.map((s) => [s.path, s.value]));
      const untranslated = arStrings.filter((s) => !isExempt(s)).filter((s) => enByPath.get(s.path) === s.value);
      expect(untranslated).toEqual([]);
    });

    it("has well-formed inline markup", () => {
      const offenders = [...enStrings, ...arStrings].filter((s) => validateRich(s.value, SLOTS).length > 0);
      expect(offenders).toEqual([]);
    });

    it.runIf(rich)("marks every Latin word in Arabic copy, so it renders in a <bdi>", () => {
      const offenders = arStrings.filter((s) => !isLink(s) && ASCII_LETTER.test(outsideLatin(s.value)));
      expect(offenders).toEqual([]);
    });

    it.runIf(rich)("marks every Arabic word in English copy, so it renders in an Arabic <bdi>", () => {
      const offenders = enStrings.filter((s) => ARABIC_LETTER.test(outsideLatin(s.value)));
      expect(offenders).toEqual([]);
    });

    it("keeps links identical in both languages", () => {
      const enLinks = enStrings.filter(isLink);
      expect(arStrings.filter(isLink)).toEqual(enLinks);
    });
  });
}

/** A case study's copy and diagrams, plus the checks that tie its copy to its data. */
export function describeCaseStudy(slug: CaseSlug, modules: CaseModules): void {
  describeContentModule({ name: `case ${slug}`, en: modules.en, ar: modules.ar, rich: true });
  describeContentModule({ name: `case ${slug} diagrams`, en: modules.diagrams.en, ar: modules.diagrams.ar, rich: true });

  describe(`case study ${slug}`, () => {
    const data = CASE_DATA[slug];
    const heroImages = { browser: 2, phones: 3, diagram: 0 }[data.hero.kind];

    it.each(["en", "ar"] as const)("has one alt text for every screenshot (%s)", (locale) => {
      const copy = modules[locale];
      expect(copy.hero.alts).toHaveLength(heroImages);
      expect(copy.role.shots?.alts.length ?? 0).toBe(data.roleShots?.shots.length ?? 0);
      const alts = [...copy.hero.alts, ...(copy.role.shots?.alts ?? [])];
      expect(alts.filter((alt) => alt.trim() === "")).toEqual([]);
    });

    it.each(["en", "ar"] as const)("has copy for every group of How I built it (%s)", (locale) => {
      expect(modules[locale].built.groups).toHaveLength(data.built.groups.length);
    });

    it.each(["en", "ar"] as const)("has copy for every fact except the stack (%s)", (locale) => {
      const keys = Object.keys(modules[locale].facts);
      expect(keys.sort()).toEqual(data.facts.filter((key) => key !== "stack").sort());
    });
  });
}

/** Years and month names; "May" and "مارس" (also a verb) only next to a number. */
const DATE = [
  /\b(19|20)\d{2}\b/,
  /\b(January|February|March|April|June|July|August|September|October|November|December)\b/,
  /\bMay\s+\d|\d\s+May\b/,
  /(يناير|فبراير|أبريل|إبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
  /مارس\s+\d|\d\s+مارس/,
];

/** Every string in `values` that names a year or a month: the More-projects pages must have none. */
export function findDates(values: readonly unknown[]): StringEntry[] {
  return values.flatMap((value) => walkStrings(value)).filter((s) => DATE.some((pattern) => pattern.test(s.value)));
}
