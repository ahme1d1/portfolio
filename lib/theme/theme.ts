export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint: restores a saved choice so the page never flashes the wrong
 * theme. With nothing saved the CSS follows the system setting on its own.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

export function readEffectiveTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode, site data off). The theme still applies for this visit.
  }
}

export function toggledTheme(theme: Theme): Theme {
  return theme === "light" ? "dark" : "light";
}
