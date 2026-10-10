import type { Locale } from "@/lib/i18n/locale";
import type { CaseModules } from "..";
import { arLean } from "./ar";
import { arLeanDiagrams } from "./diagrams.ar";
import { enLeanDiagrams, type LeanDiagramsCopy } from "./diagrams.en";
import { enLean } from "./en";

export const leanCase: CaseModules = {
  en: enLean,
  ar: arLean,
  diagrams: { en: enLeanDiagrams, ar: arLeanDiagrams },
};

export function getLeanDiagrams(locale: Locale): LeanDiagramsCopy {
  return locale === "ar" ? arLeanDiagrams : enLeanDiagrams;
}
