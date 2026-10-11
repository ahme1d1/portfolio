import type { Locale } from "@/lib/i18n/locale";
import { arAbout } from "./ar";
import { enAbout, type AboutCopy } from "./en";

const COPY: Record<Locale, AboutCopy> = { en: enAbout, ar: arAbout };

export function getAboutCopy(locale: Locale): AboutCopy {
  return COPY[locale];
}

export type { AboutCopy };
