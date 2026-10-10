import type { CompanyKey } from "@/content/companies/data";

/** "Other client work" on Work: small agency projects without a case study. */
export const OTHER_CLIENT_WORK = [
  { id: "eventsPlatform", brand: null },
  { id: "fazah", brand: "Fazah" },
  { id: "asass", brand: "Asass" },
] as const;

export type OtherClientId = (typeof OTHER_CLIENT_WORK)[number]["id"];

export type EarlierType = "corporate" | "landing" | "dashboard" | "ecommerce" | "elearning" | "realEstate";

/** A project name that is a translated phrase rather than a brand. */
export type EarlierNameKey = "evaPharmaSite" | "curiumSite";

export type EarlierRow = { company: Extract<CompanyKey, "evaPharma" | "baianat">; type: EarlierType } & (
  | { brand: string }
  | { nameKey: EarlierNameKey }
);

/** "Earlier work" on Work, as listed in the CV. */
export const EARLIER_WORK: readonly EarlierRow[] = [
  { nameKey: "evaPharmaSite", type: "corporate", company: "evaPharma" },
  { nameKey: "curiumSite", type: "corporate", company: "evaPharma" },
  { brand: "Acticolla", type: "landing", company: "evaPharma" },
  { brand: "Medsulto", type: "dashboard", company: "evaPharma" },
  { brand: "Kemitt", type: "ecommerce", company: "baianat" },
  { brand: "twjeih", type: "elearning", company: "baianat" },
  { brand: "Aqarat", type: "realEstate", company: "baianat" },
  { brand: "Aqarat", type: "dashboard", company: "baianat" },
  { brand: "Printiro Designer", type: "dashboard", company: "baianat" },
  { brand: "Printiro Vendor", type: "dashboard", company: "baianat" },
  { brand: "Printiro Super Admin", type: "dashboard", company: "baianat" },
  { brand: "MindMore", type: "dashboard", company: "baianat" },
  { brand: "Facedoc", type: "dashboard", company: "baianat" },
];

/** The mobile lists group Earlier work by company, in this order. */
export const EARLIER_COMPANIES = ["evaPharma", "baianat"] as const;
