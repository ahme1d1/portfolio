import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case/CaseStudyView";
import { CASE_SLUGS, isCaseSlug } from "@/content/cases/slugs";
import { getCaseSeo } from "@/content/seo";
import { isLocale } from "@/lib/i18n/locale";
import { resolveLocale } from "@/lib/i18n/server";
import { buildMetadata } from "@/lib/seo/metadata";

/** Prerendered at build time; the build fails if this page starts rendering per request. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCaseSlug(slug)) return {};
  return buildMetadata({ locale, path: `/work/${slug}/`, seo: getCaseSeo(locale, slug) });
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  if (!isCaseSlug(slug)) notFound();
  return <CaseStudyView locale={locale} slug={slug} />;
}
