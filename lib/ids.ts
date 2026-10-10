import type { Locale } from "@/lib/i18n/locale";

/** Pages that render their own ids (server components cannot use useId: it restarts on every page). */
export type PageKey = "home" | "work" | "experience" | "services" | "about" | "contact" | "case";

/** An id that stays unique while Next keeps up to three visited pages, in either language, in the DOM. */
export function pageId(page: PageKey, part: string, locale: Locale): string {
  return `${page}-${part}-${locale}`;
}
