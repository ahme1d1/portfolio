import type { Locale } from "@/lib/i18n/locale";
import type { CaseModules } from "..";
import { arQima } from "./ar";
import { arQimaDiagrams } from "./diagrams.ar";
import { enQimaDiagrams, type QimaDiagramsCopy } from "./diagrams.en";
import { enQima } from "./en";

export const qimaCase: CaseModules = {
  en: enQima,
  ar: arQima,
  diagrams: { en: enQimaDiagrams, ar: arQimaDiagrams },
};

export function getQimaDiagrams(locale: Locale): QimaDiagramsCopy {
  return locale === "ar" ? arQimaDiagrams : enQimaDiagrams;
}
