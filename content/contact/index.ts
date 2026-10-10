import type { Locale } from "@/lib/i18n/locale";
import { arContact } from "./ar";
import { enContact, type ContactCopy, type FormCopy } from "./en";

const COPY: Record<Locale, ContactCopy> = { en: enContact, ar: arContact };

export function getContactCopy(locale: Locale): ContactCopy {
  return COPY[locale];
}

export type { ContactCopy, FormCopy };
