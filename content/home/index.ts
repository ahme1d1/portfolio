import type { Locale } from "@/lib/i18n/locale";
import { arHome } from "./ar";
import { enHome, type HomeCopy } from "./en";

const COPY: Record<Locale, HomeCopy> = { en: enHome, ar: arHome };

export function getHomeCopy(locale: Locale): HomeCopy {
  return COPY[locale];
}

export type { HomeCopy };
