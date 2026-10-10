import type { Locale } from "@/lib/i18n/locale";
import { fantasyCase } from "./fantasy-eg";
import { CASE_SLUGS, type CaseSlug } from "./slugs";
import type { CaseCopy } from "./types";

/** One case study's copy in both languages, and its diagrams' labels. */
export type CaseModules = {
  en: CaseCopy;
  ar: CaseCopy;
  diagrams: { en: object; ar: object };
};

/** Every case study with content. */
const CASES: Partial<Record<CaseSlug, CaseModules>> = {
  "fantasy-eg": fantasyCase,
};

/** The copy of one case study, or undefined while it has none yet. */
export function getCaseCopy(locale: Locale, slug: CaseSlug): CaseCopy | undefined {
  return CASES[slug]?.[locale];
}

/** For the content tests: each case study's modules. */
export function caseModules(): readonly (readonly [CaseSlug, CaseModules])[] {
  return CASE_SLUGS.flatMap((slug) => {
    const modules = CASES[slug];
    return modules ? [[slug, modules] as const] : [];
  });
}
