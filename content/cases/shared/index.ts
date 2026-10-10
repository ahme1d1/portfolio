import type { Locale } from "@/lib/i18n/locale";
import { arCaseShared } from "./ar";
import { enCaseShared, type CaseSharedCopy } from "./en";

const COPY: Record<Locale, CaseSharedCopy> = { en: enCaseShared, ar: arCaseShared };

export function getCaseSharedCopy(locale: Locale): CaseSharedCopy {
  return COPY[locale];
}

export type { CaseSharedCopy };
