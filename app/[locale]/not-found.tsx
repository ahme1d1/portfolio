import { locale as rootLocale } from "next/root-params";
import { NotFoundView } from "@/components/pages/NotFoundView";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/locale";

/**
 * Next 16.4 sends every notFound() response as an error shell and renders this in the browser,
 * without the metadata title. The status is still 404, and NotFoundView sets the title itself.
 */
export default async function LocaleNotFound() {
  const value = await rootLocale();
  return <NotFoundView locale={value && isLocale(value) ? value : DEFAULT_LOCALE} />;
}
