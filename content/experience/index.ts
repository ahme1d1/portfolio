import type { Locale } from "@/lib/i18n/locale";
import { arExperience } from "./ar";
import { enExperience, type ExperienceCopy, type RoleCopy, type TermCopy } from "./en";

const COPY: Record<Locale, ExperienceCopy> = { en: enExperience, ar: arExperience };

export function getExperienceCopy(locale: Locale): ExperienceCopy {
  return COPY[locale];
}

export type { ExperienceCopy, RoleCopy, TermCopy };
