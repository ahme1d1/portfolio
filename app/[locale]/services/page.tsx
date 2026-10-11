import { ServicesView } from "@/components/services/ServicesView";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

/** Prerendered at build time; the build fails if this page starts rendering per request. */
export const ensureStatic = "navigation";

export const generateMetadata = pageMetadata("services", "/services/");

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = await resolveLocale(params);
  return <ServicesView locale={locale} />;
}
