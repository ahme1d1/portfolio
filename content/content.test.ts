import { describe, expect, it } from "vitest";
import { outsideLatin, validateRich } from "@/lib/rich/parse";
import { walkStrings, type StringEntry } from "@/lib/testing/walk-strings";
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
];

/** Slots a copy string may name; the component fills them. */
const SLOTS = ["email"];

const ASCII_LETTER = /[A-Za-z]/;

const isLink = (entry: StringEntry) => entry.path.endsWith(".href");

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

  it("has well-formed inline markup", () => {
    const offenders = [...enStrings, ...arStrings].filter((s) => validateRich(s.value, SLOTS).length > 0);
    expect(offenders).toEqual([]);
  });

  it.runIf(rich)("marks every Latin word in Arabic copy, so it renders in a <bdi>", () => {
    const offenders = arStrings.filter((s) => !isLink(s) && ASCII_LETTER.test(outsideLatin(s.value)));
    expect(offenders).toEqual([]);
  });

  it("keeps links identical in both languages", () => {
    const enLinks = enStrings.filter(isLink);
    expect(arStrings.filter(isLink)).toEqual(enLinks);
  });
});
