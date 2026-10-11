import { ExperienceView } from "@/components/experience/ExperienceView";
import { resolveLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo/metadata";

/** Prerendered at build time; the build fails if this page starts rendering per request. */
export const ensureStatic = "navigation";

export const generateMetadata = pageMetadata("experience", "/experience/");

export default async function ExperiencePage({ params }: PageProps<"/[locale]/experience">) {
  const locale = await resolveLocale(params);
  return <ExperienceView locale={locale} />;
}
