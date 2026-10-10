import type { Locale } from "@/lib/i18n/locale";
import { culturalBridgeCase } from "./cultural-bridge";
import { educoursezCase } from "./educoursez";
import { fantasyCase } from "./fantasy-eg";
import { leanCase } from "./lean-academy";
import { qimaCase } from "./qima";
import { tikvideoCase } from "./tikvideo";
import { vodafoneCase } from "./vodafone-modernization";
import { CASE_SLUGS, type CaseSlug } from "./slugs";
import type { CaseCopy } from "./types";

/** One case study's copy in both languages, and its diagrams' labels. */
export type CaseModules = {
  en: CaseCopy;
  ar: CaseCopy;
  diagrams: { en: object; ar: object };
};

/** Every case study's copy. */
const CASES: Readonly<Record<CaseSlug, CaseModules>> = {
  "fantasy-eg": fantasyCase,
  educoursez: educoursezCase,
  "vodafone-modernization": vodafoneCase,
  tikvideo: tikvideoCase,
  "cultural-bridge": culturalBridgeCase,
  qima: qimaCase,
  "lean-academy": leanCase,
};

export function getCaseCopy(locale: Locale, slug: CaseSlug): CaseCopy {
  return CASES[slug][locale];
}

/** For the content tests: each case study's modules. */
export function caseModules(): readonly (readonly [CaseSlug, CaseModules])[] {
  return CASE_SLUGS.map((slug) => [slug, CASES[slug]] as const);
}
