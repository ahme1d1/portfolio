import type { Locale } from "@/lib/i18n/locale";
import type { CaseModules } from "..";
import { arFantasy } from "./ar";
import { arFantasyDiagrams } from "./diagrams.ar";
import { enFantasyDiagrams, type FantasyDiagramsCopy } from "./diagrams.en";
import { enFantasy } from "./en";

export const fantasyCase: CaseModules = {
  en: enFantasy,
  ar: arFantasy,
  diagrams: { en: enFantasyDiagrams, ar: arFantasyDiagrams },
};

export function getFantasyDiagrams(locale: Locale): FantasyDiagramsCopy {
  return locale === "ar" ? arFantasyDiagrams : enFantasyDiagrams;
}
