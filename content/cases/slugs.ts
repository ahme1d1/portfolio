/** Case studies in reading order. The "Next case study" card follows this order and loops. */
export const CASE_SLUGS = [
  "fantasy-eg",
  "educoursez",
  "vodafone-modernization",
  "tikvideo",
  "cultural-bridge",
  "qima",
  "lean-academy",
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

/** Client work done through agencies: never show dates or the agency on these pages. */
export const MORE_PROJECT_SLUGS: readonly CaseSlug[] = ["tikvideo", "cultural-bridge", "qima", "lean-academy"];

export function isCaseSlug(value: string): value is CaseSlug {
  return (CASE_SLUGS as readonly string[]).includes(value);
}

export function nextCaseSlug(slug: CaseSlug): CaseSlug {
  const index = CASE_SLUGS.indexOf(slug);
  return CASE_SLUGS[(index + 1) % CASE_SLUGS.length] as CaseSlug;
}
