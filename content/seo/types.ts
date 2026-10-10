import type { CaseSlug } from "../cases/slugs";

export type SeoEntry = { title: string; description: string };

export type SeoPageKey = "home" | "work" | "experience" | "services" | "about" | "contact" | "notFound";

export type SeoCopy = Record<SeoPageKey, SeoEntry> & { cases: Record<CaseSlug, SeoEntry> };
