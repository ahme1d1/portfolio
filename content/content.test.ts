import { describe, expect, it } from "vitest";
import { outsideLatin, validateRich } from "@/lib/rich/parse";
import { walkStrings, type StringEntry } from "@/lib/testing/walk-strings";
import { CASE_DATA } from "./cases/data";
import { caseModules } from "./cases";
import { arCaseShared } from "./cases/shared/ar";
import { enCaseShared } from "./cases/shared/en";
import { MORE_PROJECT_SLUGS } from "./cases/slugs";
import { arCompanies } from "./companies/ar";
import { enCompanies } from "./companies/en";
import { arContact } from "./contact/ar";
import { enContact } from "./contact/en";
import { arHome } from "./home/ar";
import { enHome } from "./home/en";
import { arProjects } from "./projects/ar";
import { enProjects } from "./projects/en";
import { arSeo } from "./seo/ar";
import { enSeo } from "./seo/en";
import { arSite } from "./site/ar";
import { enSite } from "./site/en";
import { arWork } from "./work/ar";
import { enWork } from "./work/en";

const ARABIC_LETTER = /[؀-ۿ]/;
const ANY_LETTER = /\p{L}/u;

/** Arabic content that is Latin on purpose: brand names and file types. */
const LATIN_BY_DESIGN = new Set(["social.github", "social.linkedin", "cv.menuSuffix"]);

/** `rich` modules are rendered through <Rich>: Latin words in Arabic copy must sit in {…}. */
const MODULES = [
  { name: "site", en: enSite, ar: arSite, rich: false },
  { name: "seo", en: enSeo, ar: arSeo, rich: false },
  { name: "home", en: enHome, ar: arHome, rich: true },
  { name: "projects", en: enProjects, ar: arProjects, rich: true },
  { name: "companies", en: enCompanies, ar: arCompanies, rich: true },
  { name: "work", en: enWork, ar: arWork, rich: true },
  { name: "contact", en: enContact, ar: arContact, rich: true },
  { name: "case-shared", en: enCaseShared, ar: arCaseShared, rich: true },
  ...caseModules().flatMap(([slug, modules]) => [
    { name: `case ${slug}`, en: modules.en, ar: modules.ar, rich: true },
    { name: `case ${slug} diagrams`, en: modules.diagrams.en, ar: modules.diagrams.ar, rich: true },
  ]),
];

/** Slots a copy string may name; the component fills them. */
const SLOTS = ["email", "site"];

const ASCII_LETTER = /[A-Za-z]/;

const isLink = (entry: StringEntry) => entry.path.endsWith(".href");

/** Numbers ("1,455", "98.43%") and copy that is only marked Latin ("{PostgreSQL}") need no Arabic. */
const isLanguageNeutral = (entry: StringEntry) => !ANY_LETTER.test(outsideLatin(entry.value));

describe.each(MODULES)("$name content", ({ en, ar, rich }) => {
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
      .filter((s) => !isLink(s) && !LATIN_BY_DESIGN.has(s.path) && !isLanguageNeutral(s))
      .filter((s) => !ARABIC_LETTER.test(s.value));
    expect(offenders).toEqual([]);
  });

  it("translates every string that is not a link or Latin by design", () => {
    const enByPath = new Map(enStrings.map((s) => [s.path, s.value]));
    const untranslated = arStrings
      .filter((s) => !isLink(s) && !LATIN_BY_DESIGN.has(s.path) && !isLanguageNeutral(s))
      .filter((s) => enByPath.get(s.path) === s.value);
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

describe.each(caseModules())("case study %s", (slug, modules) => {
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

/** Years and month names; "May" and "مارس" (also a verb) only next to a number. */
const DATE = [
  /\b(19|20)\d{2}\b/,
  /\b(January|February|March|April|June|July|August|September|October|November|December)\b/,
  /\bMay\s+\d|\d\s+May\b/,
  /(يناير|فبراير|أبريل|إبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
  /مارس\s+\d|\d\s+مارس/,
];

describe.each(MORE_PROJECT_SLUGS)("More-projects case study %s", (slug) => {
  it("never shows a date: the work was done through an agency", () => {
    const modules = caseModules().find(([caseSlug]) => caseSlug === slug)?.[1];
    const strings = [
      ...walkStrings(modules),
      ...walkStrings(CASE_DATA[slug]),
      ...walkStrings(enSeo.cases[slug]),
      ...walkStrings(arSeo.cases[slug]),
      ...walkStrings(enProjects.items[slug]),
      ...walkStrings(arProjects.items[slug]),
    ];
    expect(strings.filter((s) => DATE.some((pattern) => pattern.test(s.value)))).toEqual([]);
  });
});
