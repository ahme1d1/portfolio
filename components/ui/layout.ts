/** The page column: 1280px of content between 40px gutters (16px on phones). */
export const PAGE_X = "mx-auto w-full max-w-page px-4 lg:px-10";

/**
 * Below the first screen, each block settles in as it reaches the screen (`app/scroll-motion.css`):
 * every child, and every row of a child list.
 */
export const REVEAL = "reveal-children";

/** A section after the first: 128px above on desktop, 56px on phones. Its blocks settle in. */
export const SECTION = `${PAGE_X} ${REVEAL} pt-14 lg:pt-32`;
