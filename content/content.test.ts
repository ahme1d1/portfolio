import { describe, expect, it } from "vitest";
import { describeCaseStudy, describeContentModule, findDates, type ContentModule } from "@/lib/testing/content-guards";
import { arAbout } from "./about/ar";
import { enAbout } from "./about/en";
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

/** Every pair of copy modules; the case studies add their own checks. */
const MODULES: readonly ContentModule[] = [
  { name: "site", en: enSite, ar: arSite, rich: false },
  { name: "seo", en: enSeo, ar: arSeo, rich: false },
  { name: "home", en: enHome, ar: arHome, rich: true },
  { name: "projects", en: enProjects, ar: arProjects, rich: true },
  { name: "companies", en: enCompanies, ar: arCompanies, rich: true },
  { name: "work", en: enWork, ar: arWork, rich: true },
  { name: "contact", en: enContact, ar: arContact, rich: true },
  { name: "about", en: enAbout, ar: arAbout, rich: true },
  { name: "case-shared", en: enCaseShared, ar: arCaseShared, rich: true },
];

MODULES.forEach(describeContentModule);

for (const [slug, modules] of caseModules()) describeCaseStudy(slug, modules);

describe.each(MORE_PROJECT_SLUGS)("More-projects case study %s", (slug) => {
  it("never shows a date: the work was done through an agency", () => {
    const modules = caseModules().find(([caseSlug]) => caseSlug === slug)?.[1];
    const values = [modules, CASE_DATA[slug], enSeo.cases[slug], arSeo.cases[slug], enProjects.items[slug], arProjects.items[slug]];
    expect(findDates(values)).toEqual([]);
  });
});
