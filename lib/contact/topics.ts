import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";

/** What a message is about: the three tiles at the top of the contact form. */
export const TOPICS = ["role", "project", "other"] as const;

export type Topic = (typeof TOPICS)[number];

export function isTopic(value: unknown): value is Topic {
  return typeof value === "string" && (TOPICS as readonly string[]).includes(value);
}

/** The Contact page, with the topic picked when a button says which one ("Hiring?" → role). */
export function contactHref(locale: Locale, topic?: Topic): string {
  const path = localePath(locale, "/contact/");
  return topic ? `${path}?topic=${topic}` : path;
}
