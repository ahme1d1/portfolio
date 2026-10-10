import type { Locale } from "@/lib/i18n/locale";
import { arSite } from "./ar";
import { enSite, type SiteCopy } from "./en";

const SITE: Record<Locale, SiteCopy> = { en: enSite, ar: arSite };

export function getSiteCopy(locale: Locale): SiteCopy {
  return SITE[locale];
}

export type { SiteCopy };
