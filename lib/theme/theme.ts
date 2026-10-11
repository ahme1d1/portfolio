export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** On <html> while the theme changes: CSS turns transitions off so the page colours swap at once. */
export const THEME_SWITCHING_CLASS = "theme-switching";

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

/** The frame that will take THEME_SWITCHING_CLASS off; a quicker second switch cancels it. */
let pendingFrame = 0;

/**
 * The page colours swap at once (Interactions board): a control that eases its colours on hover would
 * otherwise fade between themes, and a black button would show black text on a fading fill. The class
 * comes off once the new colours have been drawn; the theme icons keep their turn.
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.add(THEME_SWITCHING_CLASS);
  root.dataset.theme = theme;
  cancelAnimationFrame(pendingFrame);
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = requestAnimationFrame(() => root.classList.remove(THEME_SWITCHING_CLASS));
  });
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode, site data off). The theme still applies for this visit.
  }
}

export function toggledTheme(theme: Theme): Theme {
  return theme === "light" ? "dark" : "light";
}
