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
