/** The page column: 1280px of content between 40px gutters (16px on phones). */
export const PAGE_X = "mx-auto w-full max-w-page px-4 lg:px-10";

/**
 * Each block plays in once as it comes into view (`lib/motion/reveal.ts`): every child, and every
 * row of a child list.
 */
export const REVEAL = "reveal-children";

/** A section after the first: 128px above on desktop, 56px on phones. Its blocks play in. */
export const SECTION = `${PAGE_X} ${REVEAL} pt-14 lg:pt-32`;

/** A page's hero: its children play in on load, one after another (`app/reveal.css`). */
export const INTRO = "intro-children";

/*
 * Spacing roles (docs/SPEC.md "Page rhythm"): one value per role on every page, phones first, then
 * from lg. A heading and what it introduces: 16 / 24. A heading and its own lede: 12. A divided row:
 * 16 / 24 above and below. A row's heading and its text: 6 / 8.
 */

/** Between a heading (h1 or section h2) or a lede and the block it introduces, as a flex/grid gap. */
export const GAP_HEAD = "gap-4 lg:gap-6";

/** The same space as a margin under a heading row that sits outside the block's flex column. */
export const MB_HEAD = "mb-4 lg:mb-6";

/** Between a heading and its own lede. */
export const GAP_LEDE = "gap-3";

/** Above and below each row of a divided list. */
export const ROW_Y = "py-4 lg:py-6";

/** Between a row's heading and its text. */
export const GAP_ROW = "gap-1.5 lg:gap-2";
