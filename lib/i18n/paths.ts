import { isLocale, type Locale } from "./locale";

/** "work" → "/work/", "/" → "/". Every URL on the site ends with a slash. */
function normalise(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed === "" ? "/" : `/${trimmed}/`;
}

export function localePath(locale: Locale, path: string): string {
  const normalised = normalise(path);
  return normalised === "/" ? `/${locale}/` : `/${locale}${normalised}`;
}

export function stripLocale(pathname: string): string {
  const [first, ...rest] = pathname.split("/").filter(Boolean);
  if (first !== undefined && isLocale(first)) return normalise(rest.join("/"));
  return normalise(pathname);
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocale(pathname));
}

/**
 * The `aria-current` value for a link: "page" on the page itself, "true" on its section
 * (Work while reading a case study). A locale's home only counts as current on itself.
 */
export function currentState(pathname: string, href: string): "page" | "true" | undefined {
  const here = normalise(pathname);
  const target = normalise(href);
  if (here === target) return "page";
  const isHome = target.split("/").filter(Boolean).length <= 1;
  if (!isHome && here.startsWith(target)) return "true";
  return undefined;
}
