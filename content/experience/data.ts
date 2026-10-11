import type { CompanyKey } from "@/content/companies/data";
import type { YearMonth } from "@/lib/format/years";

/**
 * Experience values that are the same in both languages. Dates are data: the page formats them
 * with the copy's month names, and a test keeps their years equal to `content/companies`.
 */

/** Newest first: the order of the timeline. */
export const ROLE_KEYS = ["vois", "evaPharma", "baianat"] as const satisfies readonly CompanyKey[];

export type RoleKey = (typeof ROLE_KEYS)[number];

export type RoleData = {
  /** The row's id part: `pageId("experience", anchor, locale)`. Services links to "eva-pharma". */
  readonly anchor: string;
  readonly start: YearMonth;
  /** null while the role goes on: the current role, drawn with a filled dot. */
  readonly end: YearMonth | null;
  readonly stack: readonly string[];
  /** A role held inside this one (Vodafone Italy inside VOIS); its title and bullets are copy. */
  readonly subRole: { readonly stack: readonly string[] } | null;
  /** Admin dashboards by name: brand names, so the same in both languages. */
  readonly dashboards: readonly string[];
};

export const ROLES: Readonly<Record<RoleKey, RoleData>> = {
  vois: {
    anchor: "vois",
    start: { year: 2024, month: 1 },
    end: null,
    stack: ["React", "TypeScript", "Vite", "Vitest"],
    subRole: { stack: ["Angular", "RxJS", "NgRx", "Angular Signals"] },
    dashboards: [],
  },
  evaPharma: {
    anchor: "eva-pharma",
    start: { year: 2022, month: 5 },
    end: { year: 2023, month: 12 },
    stack: ["React", "Next.js"],
    subRole: null,
    dashboards: [],
  },
  baianat: {
    anchor: "baianat",
    start: { year: 2021, month: 5 },
    end: { year: 2022, month: 5 },
    stack: ["Angular", "Vue.js", "REST", "GraphQL"],
    subRole: null,
    dashboards: ["Aqarat", "Printiro Designer", "Printiro Vendor", "Printiro Super Admin", "MindMore", "Facedoc"],
  },
};

/** Selected projects are filled chips; admin dashboards are outlined. */
export type ChipStyle = "filled" | "outline";

export const CHIP_STYLES = { projects: "filled", dashboards: "outline" } as const satisfies Record<string, ChipStyle>;

export type ChipGroupKey = keyof typeof CHIP_STYLES;

/** The Skills rows, top to bottom. */
export const SKILL_KEYS = ["core", "also", "markup", "apis", "testing", "tooling", "practices", "fullStack"] as const;

export type SkillKey = (typeof SKILL_KEYS)[number];

/** The row that reads in the text colour, not the secondary one. */
export const EMPHASIS_SKILL: SkillKey = "core";

export const EDUCATION = { year: 2021 } as const;
