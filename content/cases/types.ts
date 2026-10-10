import type { StaticImageData } from "next/image";

/** Every diagram on the case studies. Each is a React component in `components/diagrams/`. */
export const FIGURE_IDS = [
  "fantasy-architecture",
  "educoursez-architecture",
  "educoursez-phases",
  "vodafone-hero",
  "vodafone-architecture",
  "vodafone-table",
  "vodafone-tools",
  "vodafone-steps",
  "tikvideo-architecture",
  "cultural-bridge-architecture",
  "qima-architecture",
  "lean-hero",
  "lean-architecture",
  "lean-builder",
] as const;

export type FigureId = (typeof FIGURE_IDS)[number];

/** The rows of the facts strip. Their labels are shared copy; the stack row comes from data. */
export type FactKey = "role" | "timeline" | "status" | "company" | "languages" | "platforms" | "stack";

/** A browser frame's address bar: a URL (with or without the lock), an empty pill, or the dots only. */
export type BrowserBar = { kind: "url"; url: string; lock: boolean } | { kind: "blank" } | { kind: "dots" };

export type HeroData =
  /** The live site in a browser frame, with the phone version beside it. */
  | { kind: "browser"; bar: BrowserBar; desktop: StaticImageData; phone: StaticImageData }
  /** Three app screens side by side, the middle one higher. */
  | { kind: "phones"; images: readonly [StaticImageData, StaticImageData, StaticImageData] }
  /** A drawing instead of screenshots (Vodafone is under NDA; Lean Academy shows no dashboards). */
  | { kind: "diagram"; figure: FigureId };

/** Two screens in the "My role" section, bare or in small browser frames. */
export type RoleShots = {
  frame: "bare" | "browser";
  shots: readonly { image: StaticImageData; bar: BrowserBar }[];
};

/**
 * What a case study shows that is the same in both languages. There is no date field on purpose:
 * the four More-projects case studies must never show one.
 */
export type CaseData = {
  stack: readonly string[];
  /** The live site's link, under the lede. */
  site: { href: string; label: string } | null;
  /** The facts strip's rows, in order. */
  facts: readonly FactKey[];
  hero: HeroData;
  roleShots: RoleShots | null;
  /** "How I built it": the architecture figure, then each group's figure (if any), in order. */
  built: { figure: FigureId; groups: readonly { figure: FigureId | null }[] };
};

/** A heading and its paragraph: a row, a decision, a lesson. */
export type Block = { title: string; body: string };

/** One line of a fact; `note` is the muted second line, `live` puts the green dot before it. */
export type FactItem = { text: string; note: string | null; live?: boolean };

/** A number with what it counts. `value: null` is a number Ahmed has not given yet: it is left out. */
export type Metric = { value: string | null; label: string };

/**
 * A case study's copy in one language, in the inline markup of `lib/rich/parse.ts`. Values Ahmed
 * has not given are `null` and left out of the page; a section whose items are all null is left out.
 */
export type CaseCopy = {
  /** `null` uses the brand name. */
  title: string | null;
  /** The line beside the status pill: role and dates (never dates on More projects). */
  meta: string;
  lede: string;
  /** Vodafone's NDA note under the lede. */
  notice: string | null;
  hero: { alts: readonly string[]; caption: string };
  facts: Partial<Record<Exclude<FactKey, "stack">, readonly FactItem[]>>;
  summary: { owned: string; hard: string; result: string; resultNote: string | null };
  problem: readonly string[];
  role: {
    intro: string;
    items: readonly Block[];
    shots: { alts: readonly string[]; caption: string } | null;
  };
  built: {
    intro: string;
    /** One per group in the data, in order: a heading (none for the first group on some cases), a lead-in, blocks. */
    groups: readonly { title: string | null; intro: string | null; blocks: readonly Block[] | null }[];
  };
  hard: {
    intro: string | null;
    items: readonly Block[];
    dropped: { title: string; items: readonly string[] } | null;
  };
  result: { paragraphs: readonly string[]; blocks: readonly Block[] | null; metrics: readonly Metric[] };
  learned: readonly Block[] | null;
};
