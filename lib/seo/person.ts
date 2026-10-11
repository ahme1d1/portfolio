import { COMPANIES } from "@/content/companies/data";
import { getHomeCopy } from "@/content/home";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PORTRAIT_PATH, SITE_URL } from "@/content/links";
import { getPageSeo } from "@/content/seo";
import { getSiteCopy } from "@/content/site";
import { otherLocale, type Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { plainText } from "@/lib/rich/parse";

/** Person structured data for Home (schema.org), so search engines know whose site this is. */
export function personJsonLd(locale: Locale): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: getSiteCopy(locale).name,
    alternateName: getSiteCopy(otherLocale(locale)).name,
    jobTitle: plainText(getHomeCopy(locale).hero.role),
    description: getPageSeo(locale, "home").description,
    url: new URL(localePath(locale, "/"), SITE_URL).href,
    // A stable address: the page's own portrait is a hashed build file that changes with every edit.
    image: new URL(PORTRAIT_PATH, SITE_URL).href,
    email: `mailto:${EMAIL}`,
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    worksFor: { "@type": "Organization", name: "VOIS", url: COMPANIES.vois.url },
    knowsLanguage: ["en", "ar"],
  };
}

/** JSON for a <script> tag: "<" is escaped so the data can never close the tag (Next JSON-LD guide). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
