"use client";

import { useLayoutEffect } from "react";
import { restoreSavedTheme } from "@/lib/theme/theme";

/**
 * Puts the saved theme back on <html> whenever the root layout mounts, before paint. The language
 * switch mounts a new root layout and React clears <html>'s other attributes; without this a dark
 * choice turns light until the next reload. Renders nothing.
 */
export function KeepTheme() {
  useLayoutEffect(() => {
    restoreSavedTheme();
  }, []);
  return null;
}
