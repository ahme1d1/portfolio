import type { Locale } from "@/lib/i18n/locale";
import type { CaseModules } from "..";
import { arVodafone } from "./ar";
import { arVodafoneDiagrams } from "./diagrams.ar";
import { enVodafoneDiagrams, type VodafoneDiagramsCopy } from "./diagrams.en";
import { enVodafone } from "./en";

export const vodafoneCase: CaseModules = {
  en: enVodafone,
  ar: arVodafone,
  diagrams: { en: enVodafoneDiagrams, ar: arVodafoneDiagrams },
};

export function getVodafoneDiagrams(locale: Locale): VodafoneDiagramsCopy {
  return locale === "ar" ? arVodafoneDiagrams : enVodafoneDiagrams;
}
