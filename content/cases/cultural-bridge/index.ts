import type { Locale } from "@/lib/i18n/locale";
import type { CaseModules } from "..";
import { arCulturalBridge } from "./ar";
import { arCulturalBridgeDiagrams } from "./diagrams.ar";
import { enCulturalBridgeDiagrams, type CulturalBridgeDiagramsCopy } from "./diagrams.en";
import { enCulturalBridge } from "./en";

export const culturalBridgeCase: CaseModules = {
  en: enCulturalBridge,
  ar: arCulturalBridge,
  diagrams: { en: enCulturalBridgeDiagrams, ar: arCulturalBridgeDiagrams },
};

export function getCulturalBridgeDiagrams(locale: Locale): CulturalBridgeDiagramsCopy {
  return locale === "ar" ? arCulturalBridgeDiagrams : enCulturalBridgeDiagrams;
}
