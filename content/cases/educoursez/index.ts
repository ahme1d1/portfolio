import type { Locale } from "@/lib/i18n/locale";
import type { CaseModules } from "..";
import { arEducoursez } from "./ar";
import { arEducoursezDiagrams } from "./diagrams.ar";
import { enEducoursezDiagrams, type EducoursezDiagramsCopy } from "./diagrams.en";
import { enEducoursez } from "./en";

export const educoursezCase: CaseModules = {
  en: enEducoursez,
  ar: arEducoursez,
  diagrams: { en: enEducoursezDiagrams, ar: arEducoursezDiagrams },
};

export function getEducoursezDiagrams(locale: Locale): EducoursezDiagramsCopy {
  return locale === "ar" ? arEducoursezDiagrams : enEducoursezDiagrams;
}
