import type { Locale } from "@/lib/i18n/locale";
import { arServices } from "./ar";
import { enServices, type ServicesCopy } from "./en";

const COPY: Record<Locale, ServicesCopy> = { en: enServices, ar: arServices };

export function getServicesCopy(locale: Locale): ServicesCopy {
  return COPY[locale];
}

export type { ServicesCopy };
