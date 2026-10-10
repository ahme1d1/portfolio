import type { Metadata } from "next";
import { getSiteCopy } from "@/content/site";
import { getPageSeo, type SeoEntry, type SeoPageKey } from "@/content/seo";
import { isLocale, type Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";

const OG_LOCALE: Record<Locale, string> = { en: "en_US", ar: "ar_EG" };

type BuildMetadataInput = {
  locale: Locale;
  /** The page path without the locale, e.g. "/work/qima/". */
  path: string;
  seo: SeoEntry;
  noIndex?: boolean;
};

export function buildMetadata({ locale, path, seo, noIndex = false }: BuildMetadataInput): Metadata {
  const { name } = getSiteCopy(locale);
  const title = `${seo.title} | ${name}`;
  const canonical = localePath(locale, path);

  return {
    title: { absolute: title },
    description: seo.description,
    alternates: {
      canonical,
      languages: {
        en: localePath("en", path),
        ar: localePath("ar", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      locale: OG_LOCALE[locale],
      siteName: name,
      title,
      description: seo.description,
    },
    ...(noIndex ? { robots: { index: false } } : {}),
  };
}

type LocaleParams = { params: Promise<{ locale: string }> };

/** `export const generateMetadata = pageMetadata("work", "/work/")` for a fixed page. */
export function pageMetadata(page: SeoPageKey, path: string) {
  return async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    return buildMetadata({ locale, path, seo: getPageSeo(locale, page) });
  };
}

/** The 404 title, e.g. "Page not found: old or mistyped link | Ahmed Gabal". */
export function notFoundTitle(locale: Locale): string {
  return `${getPageSeo(locale, "notFound").title} | ${getSiteCopy(locale).name}`;
}
