/** Employers, the same in both languages. Years are numbers, so content checks skip them. */
export const COMPANIES = {
  vois: { url: "https://www.voiscentre.com/", start: 2024, end: null },
  evaPharma: { url: "https://evapharma.com/", start: 2022, end: 2023 },
  baianat: { url: "https://www.baianat.com/", start: 2021, end: 2022 },
} as const satisfies Record<string, { url: string; start: number; end: number | null }>;

export type CompanyKey = keyof typeof COMPANIES;
