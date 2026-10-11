import type { ReactNode } from "react";
import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";

/** A case-study section: an h2, then its paragraphs, rows and figures 20px apart (14 on phones). */
export function CaseSection({ headingId, title, children }: { headingId: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={headingId} className={`${SECTION} flex flex-col gap-3.5 lg:gap-5`}>
      <h2 id={headingId} className="type-h2">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Running text in a section, kept to 600px. It doesn't play in: reading text just shows. */
export function Prose({ text }: { text: string }) {
  return (
    <p data-reveal-style="still" className="m-0 max-w-[600px] type-body-lg text-ink-2">
      <Rich text={text} />
    </p>
  );
}
