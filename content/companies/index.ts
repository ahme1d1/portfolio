import type { Locale } from "@/lib/i18n/locale";
import { formatYears } from "@/lib/format/years";
import { arCompanies } from "./ar";
import { COMPANIES, type CompanyKey } from "./data";
import { enCompanies, type CompaniesCopy } from "./en";

const COPY: Record<Locale, CompaniesCopy> = { en: enCompanies, ar: arCompanies };

export type Company = { name: string; url: string; years: string };

export function getCompany(locale: Locale, key: CompanyKey): Company {
  const { url, start, end } = COMPANIES[key];
  return { name: COPY[locale].names[key], url, years: formatYears(start, end, COPY[locale].present) };
}

export type { CompanyKey, CompaniesCopy };
