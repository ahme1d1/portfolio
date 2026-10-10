import type { Locale } from "@/lib/i18n/locale";
import { arWork } from "./ar";
import { enWork, type WorkCopy } from "./en";

const COPY: Record<Locale, WorkCopy> = { en: enWork, ar: arWork };

export function getWorkCopy(locale: Locale): WorkCopy {
  return COPY[locale];
}

export type { WorkCopy };
