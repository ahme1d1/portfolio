import * as z from "zod/mini";
import { TOPICS, type Topic } from "./topics";

export const CONTACT_FIELDS = ["topic", "name", "email", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

/** What the form holds while someone types: plain strings, the topic empty until a tile is picked. */
export type ContactValues = Record<ContactField, string>;

/** What is sent: trimmed, with a known topic. */
export type ContactData = { topic: Topic; name: string; email: string; message: string };

export type EmailErrorCode = "emailMissing" | "emailNoAt" | "emailNoLocal" | "emailNoDomain" | "emailInvalid";

/** Language-neutral codes; the form shows the matching sentence from content/contact. */
export type ErrorCode = "topicMissing" | "nameMissing" | "messageMissing" | EmailErrorCode;

export type ContactErrors = Partial<Record<ContactField, ErrorCode>>;

/** Field limits, also set as maxLength on the inputs, so nobody sees a "too long" error. */
export const MAX_LENGTH = { name: 100, email: 254, message: 5000 } as const;

/** Says what is wrong with an address in the words a person would fix it with. */
export function emailProblem(raw: string): EmailErrorCode | null {
  const value = raw.trim();
  if (value === "") return "emailMissing";
  const at = value.indexOf("@");
  if (at === -1) return "emailNoAt";
  if (at === 0) return "emailNoLocal";
  const domain = value.slice(at + 1);
  if (/\s/.test(value) || domain.includes("@")) return "emailInvalid";
  if (!/^[^.]+(\.[^.]+)+$/.test(domain)) return "emailNoDomain";
  return null;
}

const requiredText = (code: ErrorCode, max: number) => z.string().check(z.trim(), z.minLength(1, code), z.maxLength(max, code));

const contactSchema = z.object({
  topic: z.enum(TOPICS, "topicMissing"),
  name: requiredText("nameMissing", MAX_LENGTH.name),
  email: z.string().check(
    z.trim(),
    z.superRefine((value, ctx) => {
      const problem = emailProblem(value);
      if (problem) ctx.addIssue({ code: "custom", message: problem, input: value });
    }),
  ),
  message: requiredText("messageMissing", MAX_LENGTH.message),
});

export type ValidationResult = { ok: true; data: ContactData } | { ok: false; errors: ContactErrors };

export function validateContact(values: ContactValues): ValidationResult {
  const result = contactSchema.safeParse(values);
  if (result.success) return { ok: true, data: result.data };
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as ContactField;
    errors[field] ??= issue.message as ErrorCode;
  }
  return { ok: false, errors };
}

/** Re-checks one field as it is fixed. */
export function validateField(field: ContactField, value: string): ErrorCode | null {
  const result = contactSchema.shape[field].safeParse(value);
  return result.success ? null : ((result.error.issues[0]?.message ?? null) as ErrorCode | null);
}
