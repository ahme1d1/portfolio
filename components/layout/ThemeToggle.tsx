"use client";

import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { applyTheme, readEffectiveTheme, toggledTheme } from "@/lib/theme/theme";
import type { SiteCopy } from "@/content/site";

export function switchTheme() {
  applyTheme(toggledTheme(readEffectiveTheme()));
}

type ThemeLabels = SiteCopy["theme"];

/** Header button. Icon and name come from CSS, so they are right before hydration. */
export function ThemeToggle({ labels }: { labels: ThemeLabels }) {
  return (
    <button
      type="button"
      onClick={switchTheme}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-page text-ink transition-[background-color,border-color,transform] duration-150 ease-enter hover:border-strong hover:bg-surface active:scale-[0.97]"
    >
      <MoonIcon className="theme-icon theme-icon-moon" />
      <SunIcon className="theme-icon theme-icon-sun" />
      <span className="sr-only theme-show-light">{labels.switchToDark}</span>
      <span className="sr-only theme-show-dark">{labels.switchToLight}</span>
    </button>
  );
}

/** The labelled row in the mobile menu: "Dark theme" in light, "Light theme" in dark. */
export function ThemeRow({ labels }: { labels: ThemeLabels }) {
  return (
    <button
      type="button"
      onClick={switchTheme}
      className="mt-2.5 flex h-13 cursor-pointer items-center justify-center gap-2.5 rounded-button border border-line bg-page text-base font-semibold text-ink transition-[background-color,border-color,transform] duration-150 ease-enter hover:border-strong hover:bg-surface active:scale-[0.97]"
    >
      {/* The outer spans only switch visibility; the inner ones lay out icon and text. */}
      <span className="theme-show-light">
        <span className="inline-flex items-center gap-2.5">
          <MoonIcon />
          {labels.darkRow}
        </span>
      </span>
      <span className="theme-show-dark">
        <span className="inline-flex items-center gap-2.5">
          <SunIcon />
          {labels.lightRow}
        </span>
      </span>
    </button>
  );
}
