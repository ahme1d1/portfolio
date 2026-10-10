import { PagePlaceholder } from "@/components/pages/PagePlaceholder";
import { getSiteCopy } from "@/content/site";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

/** Prerendered at build time; the build fails if this page starts rendering per request. */
export const ensureStatic = "navigation";

export const generateMetadata = pageMetadata("contact", "/contact/");

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = await resolveLocale(params);
  return <PagePlaceholder title={getSiteCopy(locale).nav.items[4]?.label ?? ""} />;
}
