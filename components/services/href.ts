import type { LinkTarget } from "@/content/services/data";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { pageId } from "@/lib/ids";

/**
 * The href of a language-neutral link target. A row on another page is reached by the id that page
 * gives it (`pageId`), since Next keeps visited pages of both languages mounted and a plain id would
 * repeat. Only Experience rows are linked from Services.
 */
export function targetHref(locale: Locale, target: LinkTarget): string {
  if ("url" in target) return target.url;
  const path = localePath(locale, target.path);
  return target.anchor ? `${path}#${pageId("experience", target.anchor, locale)}` : path;
}

export type ResolvedLink = { label: string; href: string };

/**
 * Labels (copy) next to their targets (data). A count mismatch throws, so the build fails rather
 * than shipping a link without a name; the content tests catch it first.
 */
export function pairLinks(locale: Locale, labels: readonly string[], targets: readonly LinkTarget[]): ResolvedLink[] {
  if (labels.length !== targets.length) {
    throw new Error(`Services links: ${labels.length} label(s) for ${targets.length} target(s): ${labels.join(", ")}`);
  }
  return targets.map((target, index) => ({ label: labels[index] ?? "", href: targetHref(locale, target) }));
}
