"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  REVEAL_BLOCKS,
  SETTLE_MS,
  STAGGER_MS,
  TRIGGER_MARGIN_PX,
  initialRevealState,
  staggerStep,
  takePageEntry,
  type PageEntry,
  type RevealState,
} from "@/lib/motion/reveal";

const MOTION_QUERY = "screen and (prefers-reduced-motion: no-preference)";

/** Laid out on screen: false inside a hidden kept page, and for display: contents. */
function isRendered(element: Element): boolean {
  return element.getClientRects().length > 0;
}

function byPageOrder(a: Element, b: Element): number {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

/** Blocks that came into view together play in page order, a step apart, then go back to plain. */
function play(blocks: readonly HTMLElement[]) {
  [...blocks].sort(byPageOrder).forEach((block, index) => {
    const step = staggerStep(index);
    block.dataset.revealOrder = String(step);
    block.dataset.reveal = "play";
    window.setTimeout(() => {
      block.dataset.reveal = "done";
      delete block.dataset.revealOrder;
    }, SETTLE_MS + step * STAGGER_MS);
  });
}

function onIntersect(entries: readonly IntersectionObserverEntry[], observer: IntersectionObserver) {
  const arrived = entries.filter((item) => item.isIntersecting).map((item) => item.target as HTMLElement);
  arrived.forEach((block) => observer.unobserve(block));
  play(arrived);
}

/**
 * Plays each block in as it comes into view, once (`lib/motion/reveal.ts`). Runs before paint on
 * every page, so nothing hidden ever flashes: without JavaScript, or with reduced motion, nothing
 * is hidden at all. Renders nothing.
 */
export function RevealOnScroll() {
  const pathname = usePathname();
  // React runs effects twice in development: the page's entry is decided once.
  const entryRef = useRef<{ pathname: string; entry: PageEntry } | null>(null);

  useLayoutEffect(() => {
    const known = entryRef.current?.pathname === pathname ? entryRef.current.entry : null;
    const entry = known ?? takePageEntry(pathname);
    entryRef.current = { pathname, entry };
    // After the switch React has cleared <html>'s attributes (new root layout): mark it again so the
    // CSS keeps the hero still; any other page lets it play.
    if (entry === "locale-switch") document.documentElement.dataset.localeSwitch = "";
    else delete document.documentElement.dataset.localeSwitch;
    if (!("IntersectionObserver" in window) || !window.matchMedia(MOTION_QUERY).matches) return;

    // Read every block first, then write, so the browser lays the page out once.
    const screenHeight = window.innerHeight;
    const plan = [...document.querySelectorAll<HTMLElement>(REVEAL_BLOCKS)].filter(isRendered).map((block) => {
      const current = (block.dataset.reveal as RevealState | undefined) ?? null;
      const next = current ? null : initialRevealState(entry, block.getBoundingClientRect().top, screenHeight);
      return { block, state: next ?? current, isNew: next !== null };
    });

    const observer = new IntersectionObserver(onIntersect, { rootMargin: `0px 0px -${TRIGGER_MARGIN_PX}px 0px` });
    for (const { block, state, isNew } of plan) {
      // A state turns the block's CSS load animation off (it matches only blocks without one).
      if (isNew && state) block.dataset.reveal = state;
      // Held-back blocks, new or from a page shown again, are watched by this page's observer.
      if (state === "pending") observer.observe(block);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
