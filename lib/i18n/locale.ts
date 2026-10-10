export const LOCALES = ["en", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export type Direction = "ltr" | "rtl";

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}
