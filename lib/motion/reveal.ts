import type { Locale } from "@/lib/i18n/locale";

/**
 * Blocks that play in as they come into view, once (the animation Ahmed built for TikVideo's home
 * page): they rise 24px and fade in over 500ms, and blocks that arrive together cascade 120ms apart.
 * `components/motion/RevealOnScroll.tsx` runs it; `app/reveal.css` draws the states.
 */

/** Every block of a section after the first, and every row of its lists. */
export const REVEAL_BLOCKS = ".reveal-children > :not(ul, ol), .reveal-children > :is(ul, ol) > li";

/**
 * A held-back block plays once its top is this far above the bottom of the screen. Less than any
 * footer is tall, so the last block of a page can always be scrolled past it.
 */
export const TRIGGER_MARGIN_PX = 40;

export const STAGGER_MS = 120;
export const MAX_STAGGER_STEP = 4;

/** The longest a block's entrance runs (500ms, a diagram's lines about 950ms) before its styles come off. */
export const SETTLE_MS = 1000;

/** pending: hidden, waiting to come into view. play: animating in. done: plain again. */
export type RevealState = "pending" | "play" | "done";

/** How the current page appeared. */
export type PageEntry = "load" | "navigation" | "locale-switch";

/**
 * A block's state when its page appears, from its top edge and the screen height. `null` leaves it
 * to the CSS load animation, which plays every block at first paint (before any JavaScript) and ends
 * with it shown. At load and after a language switch only blocks below the screen are held back:
 * one on screen may already be fading in, or was just seen in the other language.
 */
export function initialRevealState(entry: PageEntry, top: number, screenHeight: number): RevealState | null {
  // After a link the whole new page plays in; it waits below the screen until scrolled to.
  if (entry === "navigation") return "pending";
  if (top >= screenHeight) return "pending";
  // On screen: at load the CSS load animation plays it; after a language switch the page mirrors.
  return entry === "load" ? null : "done";
}

export function staggerStep(index: number): number {
  return Math.min(index, MAX_STAGGER_STEP);
}

let hasLoaded = false;
let switchingTo: Locale | null = null;

/** Called by the language switch: the page in `target` mirrors this one instead of playing in. */
export function markLocaleSwitch(target: Locale): void {
  switchingTo = target;
  // The hero's on-load animation (pure CSS) stays off while this is on <html>.
  document.documentElement.dataset.localeSwitch = "";
}

/** How the page at `pathname` appeared; each page asks once. A switch counts only if it landed. */
export function takePageEntry(pathname: string): PageEntry {
  const hasSwitched = switchingTo !== null && pathname.startsWith(`/${switchingTo}/`);
  const entry: PageEntry = !hasLoaded ? "load" : hasSwitched ? "locale-switch" : "navigation";
  hasLoaded = true;
  switchingTo = null;
  return entry;
}

/** Test helper: start again as if the site had just loaded. */
export function resetPageEntry(): void {
  hasLoaded = false;
  switchingTo = null;
}
