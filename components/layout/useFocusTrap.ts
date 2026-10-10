"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FocusTrapOptions = {
  isActive: boolean;
  containerRef: RefObject<HTMLElement | null>;
  /** A control outside the container that belongs to the trap, such as the button that closes it. */
  extraRef?: RefObject<HTMLElement | null>;
  onEscape: () => void;
};

/** Keeps Tab and Shift+Tab inside the container (plus one extra control) and closes on Esc. */
export function useFocusTrap({ isActive, containerRef, extraRef, onEscape }: FocusTrapOptions) {
  useEffect(() => {
    if (!isActive) return;

    function focusables(): HTMLElement[] {
      const inside = Array.from(containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      const extra = extraRef?.current;
      return extra ? [extra, ...inside] : inside;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      const isOutside = !items.includes(active as HTMLElement);
      if (event.shiftKey && (active === first || isOutside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || isOutside)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isActive, containerRef, extraRef, onEscape]);
}
