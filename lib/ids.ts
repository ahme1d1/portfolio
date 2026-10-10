import type { CaseSlug } from "@/content/cases/slugs";
import type { Locale } from "@/lib/i18n/locale";

/** A case study's own scope: two case pages kept in the DOM must not share an id. */
export type CaseScope = `case-${CaseSlug}`;

/** Pages that render their own ids (server components cannot use useId: it restarts on every page). */
export type PageKey = "home" | "work" | "experience" | "services" | "about" | "contact" | CaseScope;

export function caseScope(slug: CaseSlug): CaseScope {
  return `case-${slug}`;
}

/** An id that stays unique while Next keeps up to three visited pages, in either language, in the DOM. */
export function pageId(page: PageKey, part: string, locale: Locale): string {
  return `${page}-${part}-${locale}`;
}
