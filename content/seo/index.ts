import type { Locale } from "@/lib/i18n/locale";
import type { CaseSlug } from "../cases/slugs";
import { arSeo } from "./ar";
import { enSeo } from "./en";
import type { SeoCopy, SeoEntry, SeoPageKey } from "./types";

const SEO: Record<Locale, SeoCopy> = { en: enSeo, ar: arSeo };

export function getPageSeo(locale: Locale, page: SeoPageKey): SeoEntry {
  return SEO[locale][page];
}

export function getCaseSeo(locale: Locale, slug: CaseSlug): SeoEntry {
  return SEO[locale].cases[slug];
}

export type { SeoEntry, SeoPageKey };
