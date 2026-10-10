import type { ContactData } from "./schema";

export const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/** Long enough for a slow phone connection, short enough that nobody waits on a dead one. */
const TIMEOUT_MS = 15_000;

export type SendResult = { ok: true } | { ok: false; reason: "config" | "network" | "rejected" };

type SendOptions = { accessKey: string; fetchFn?: typeof fetch; timeoutMs?: number };

/**
 * The public Web3Forms access key (it only allows sending to Ahmed's inbox). Read as this exact
 * expression so Next inlines it at build time.
 */
export function accessKey(): string {
  return process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
}

/** Control characters (line breaks, tabs) have no place in an email subject. */
const CONTROL_CHARS = /[\u0000-\u001f\u007f]+/g;

/** The email Ahmed receives: a subject that says what the message is about and who sent it. */
function subjectFor(data: ContactData): string {
  return `Portfolio message (${data.topic}) from ${data.name.replace(CONTROL_CHARS, " ")}`;
}

/**
 * What the browser sends. A no-JS post sends the same field names, with a fixed subject (the
 * static page cannot know the topic or the name before it is posted).
 */
export function formFields(data: ContactData, key: string): Record<string, string> {
  return {
    access_key: key,
    subject: subjectFor(data),
    from_name: "Ahmed Gabal portfolio",
    topic: data.topic,
    name: data.name,
    email: data.email,
    message: data.message,
    botcheck: "",
  };
}

/** Sends from the browser to Web3Forms. Never throws: the form shows the matching error state. */
export async function sendMessage(data: ContactData, { accessKey: key, fetchFn = fetch, timeoutMs = TIMEOUT_MS }: SendOptions): Promise<SendResult> {
  if (key === "") return { ok: false, reason: "config" };
  const body = new FormData();
  for (const [name, value] of Object.entries(formFields(data, key))) body.append(name, value);
  try {
    const response = await fetchFn(WEB3FORMS_URL, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
      signal: AbortSignal.timeout(timeoutMs),
    });
    const json: unknown = await response.json().catch(() => null);
    const isSuccess = typeof json === "object" && json !== null && (json as { success?: unknown }).success === true;
    return response.ok && isSuccess ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    // Offline, blocked or timed out: the summary asks to try again or to email directly.
    return { ok: false, reason: "network" };
  }
}
