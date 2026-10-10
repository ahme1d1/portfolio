import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE_URL } from "@/content/links";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/lib/i18n/locale";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

/**
 * An unknown first segment (/fr/, /nope/) still gets the English shell: its page calls notFound(),
 * and the 404 renders inside the shell. Calling notFound() here would fall back to Next's plain 404.
 */
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  return <SiteShell locale={isLocale(locale) ? locale : DEFAULT_LOCALE}>{children}</SiteShell>;
}
