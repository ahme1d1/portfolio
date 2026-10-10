import type { Locale } from "@/lib/i18n/locale";
import type { CaseModules } from "..";
import { arTikVideo } from "./ar";
import { arTikVideoDiagrams } from "./diagrams.ar";
import { enTikVideoDiagrams, type TikVideoDiagramsCopy } from "./diagrams.en";
import { enTikVideo } from "./en";

export const tikvideoCase: CaseModules = {
  en: enTikVideo,
  ar: arTikVideo,
  diagrams: { en: enTikVideoDiagrams, ar: arTikVideoDiagrams },
};

export function getTikVideoDiagrams(locale: Locale): TikVideoDiagramsCopy {
  return locale === "ar" ? arTikVideoDiagrams : enTikVideoDiagrams;
}
