import type { Locale } from "@/lib/i18n/locale";

/**
 * A tiny inline markup for copy, so content stays plain typed strings:
 *   {React}       Latin text inside Arabic copy (rendered as <bdi dir="ltr" lang="en">)
 *   {منصة قيمة}   Arabic text inside English copy (rendered as <bdi dir="rtl" lang="ar">); the script decides
 *   *Vodafone*    emphasis (may hold {…})
 *   {$email}      a slot the caller fills, e.g. a link
 * "و {X}", "بـ {X}" and "لـ {X}" are kept on one line automatically.
 */
export type RichNode =
  | { type: "text"; value: string }
  | { type: "latin"; value: string }
  | { type: "arabic"; value: string }
  | { type: "slot"; name: string }
  | { type: "strong"; children: RichNode[] }
  | { type: "nowrap"; children: RichNode[] };

type Tokenized = { nodes: RichNode[]; errors: string[]; slots: string[] };

/** A particle that must not end a line before the Latin word after it, e.g. " و " or "بـ ". */
const PARTICLE = /(^|\s)(و|بـ|لـ) $/u;

const ARABIC_LETTER = /[\u0600-\u06FF]/;
const ASCII_LETTER = /[A-Za-z]/;

/** A {…} run in Arabic script is an Arabic name in English copy; anything else is Latin. */
function runNode(value: string): RichNode {
  return ARABIC_LETTER.test(value) ? { type: "arabic", value } : { type: "latin", value };
}

function tokenize(text: string): Tokenized {
  const root: RichNode[] = [];
  const errors: string[] = [];
  const slots: string[] = [];
  let strong: RichNode[] | null = null;
  let buffer = "";

  const target = (): RichNode[] => strong ?? root;
  const flush = () => {
    if (buffer !== "") target().push({ type: "text", value: buffer });
    buffer = "";
  };

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === "{") {
      const close = text.indexOf("}", i + 1);
      if (close === -1) {
        errors.push("unclosed {");
        buffer += text.slice(i);
        break;
      }
      const inner = text.slice(i + 1, close);
      if (inner.includes("{")) errors.push("nested {");
      if (inner === "") errors.push("empty {}");
      if (ARABIC_LETTER.test(inner) && ASCII_LETTER.test(inner)) errors.push(`mixed script {${inner}}`);
      flush();
      if (inner.startsWith("$")) {
        slots.push(inner.slice(1));
        target().push({ type: "slot", name: inner.slice(1) });
      } else {
        target().push(runNode(inner));
      }
      i = close;
    } else if (char === "*") {
      flush();
      if (strong === null) {
        strong = [];
      } else {
        root.push({ type: "strong", children: glue(strong) });
        strong = null;
      }
    } else {
      if (char === "}") errors.push("stray }");
      buffer += char;
    }
  }
  flush();
  if (strong !== null) {
    errors.push("unclosed *");
    root.push(...strong);
  }
  return { nodes: glue(root), errors, slots };
}

/** Wraps a joining particle and the Latin word after it into one unbreakable group. */
function glue(nodes: readonly RichNode[]): RichNode[] {
  const out: RichNode[] = [];
  for (const node of nodes) {
    const previous = out.at(-1);
    const match = previous?.type === "text" && node.type === "latin" ? PARTICLE.exec(previous.value) : null;
    if (previous?.type !== "text" || match === null) {
      out.push(node);
      continue;
    }
    const particle = `${match[2]} `;
    const before = previous.value.slice(0, previous.value.length - particle.length);
    out.pop();
    if (before !== "") out.push({ type: "text", value: before });
    out.push({ type: "nowrap", children: [{ type: "text", value: particle }, node] });
  }
  return out;
}

export function parseRich(text: string): RichNode[] {
  const { nodes, errors } = tokenize(text);
  if (errors.length === 0) return nodes;
  // Content tests reject broken markup, so this only guards against a crash: show the words.
  return text === "" ? [] : [{ type: "text", value: plainText(text) }];
}

/** Problems with the markup; empty when it is well formed. */
export function validateRich(text: string, allowedSlots: readonly string[] = []): string[] {
  const { errors, slots } = tokenize(text);
  const unknown = slots.filter((slot) => !allowedSlots.includes(slot)).map((slot) => `unknown slot $${slot}`);
  return [...errors, ...unknown];
}

/** The words without markup, for alt text, aria-labels and structured data. */
export function plainText(text: string, slots: Readonly<Record<string, string>> = {}): string {
  return text.replace(/\{\$([^}]*)\}/g, (_, name: string) => slots[name] ?? "").replace(/[{}*]/g, "");
}

/** The copy with its {…} runs and slots removed: on Arabic pages nothing Latin may remain. */
export function outsideLatin(text: string): string {
  return text.replace(/\{[^}]*\}/g, "");
}

/** A brand name as copy: marked Latin on Arabic pages, unchanged on English ones. */
export function asLatin(locale: Locale, value: string): string {
  return locale === "ar" ? `{${value}}` : value;
}
