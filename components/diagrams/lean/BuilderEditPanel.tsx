import type { ReactNode } from "react";
import { Rich } from "@/components/ui/Rich";
import type { BuilderCopy } from "./builder-copy";

type EditCopy = BuilderCopy["edit"];

/** A labelled field of the drawn panel: plain text, never a real input. */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">
        <Rich text={label} />
      </span>
      {children}
    </span>
  );
}

const BOX = "flex h-[34px] items-center rounded-lg border border-line px-2.5 text-[13px] text-ink";

/** The rich-text toolbar's buttons: bold, italic, underline. */
const TOOL_LOOKS = ["font-bold", "italic", "underline"] as const;

/** Background swatches: page, surface, tint, and the chosen accent with a ring. */
const SWATCHES = [
  "border border-strong bg-page",
  "border border-line bg-surface",
  "bg-tint",
  "bg-accent ring-2 ring-accent ring-offset-2 ring-offset-page",
] as const;

/** The edit panel of the block being edited: its heading, text, background, button, then Preview and Save. */
export function BuilderEditPanel({ edit }: { edit: EditCopy }) {
  return (
    <div className="flex flex-col gap-3 rounded-button border-2 border-accent bg-page p-3.5 md:p-4">
      <span className="flex flex-col gap-0.5">
        <span className="text-[13px] font-medium text-accent-ink">
          <Rich text={edit.eyebrow} />
        </span>
        <span className="text-[17px] leading-snug ar:leading-relaxed font-semibold">
          <Rich text={edit.title} />
        </span>
      </span>
      <Field label={edit.heading.label}>
        <span className={BOX}>
          <Rich text={edit.heading.value} />
        </span>
      </Field>
      <Field label={edit.paragraph.label}>
        <span className="flex flex-col rounded-lg border border-line">
          <span aria-hidden="true" dir="ltr" className="flex gap-1 border-b border-line px-2 py-1.5 ar:justify-end">
            {edit.paragraph.tools.map((tool, index) => (
              <span
                key={tool}
                className={`inline-flex size-[22px] items-center justify-center rounded-[5px] bg-surface text-xs text-ink-2 ${TOOL_LOOKS[index] ?? ""}`}
              >
                <Rich text={tool} />
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="flex flex-col gap-1.5 p-2.5">
            <span className="block h-1.5 w-[90%] rounded-full bg-line" />
            <span className="block h-1.5 w-[64%] rounded-full bg-line" />
          </span>
        </span>
      </Field>
      <Field label={edit.background}>
        <span aria-hidden="true" className="flex gap-2">
          {SWATCHES.map((swatch) => (
            <span key={swatch} className={`block size-[22px] rounded-full ${swatch}`} />
          ))}
        </span>
      </Field>
      <Field label={edit.button.label}>
        <span className={BOX}>
          <Rich text={edit.button.value} />
        </span>
      </Field>
      <span className="flex justify-end gap-2">
        <span className="inline-flex h-8 items-center rounded-lg border border-line px-3.5 text-[13px] font-medium text-ink-2">
          <Rich text={edit.actions.preview} />
        </span>
        <span className="inline-flex h-8 items-center rounded-lg bg-accent px-3.5 text-[13px] font-semibold text-on-accent">
          <Rich text={edit.actions.save} />
        </span>
      </span>
    </div>
  );
}
