import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./locale";

/** Reads the locale route parameter; anything other than en or ar is a 404. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
