import { Rich } from "@/components/ui/Rich";
import type { CaseSharedCopy } from "@/content/cases/shared";
import type { CaseCopy } from "@/content/cases/types";

type SummaryPanelProps = { headingId: string; title: string; labels: CaseSharedCopy["summary"]; summary: CaseCopy["summary"] };

/** The three-line summary: what I owned, what was hard, the result. On phones it comes before the facts. */
export function SummaryPanel({ headingId, title, labels, summary }: SummaryPanelProps) {
  const items = [
    { title: labels.owned, body: summary.owned, note: null },
    { title: labels.hard, body: summary.hard, note: null },
    { title: labels.result, body: summary.result, note: summary.resultNote },
  ];
  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col gap-4 rounded-panel-sm bg-surface px-4 py-5 max-md:order-first md:gap-5 md:p-8 lg:rounded-panel"
    >
      <h2 id={headingId} className="type-h2-panel">
        {title}
      </h2>
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-7">
        {items.map((item) => (
          <div
            key={item.title}
            className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4 first:mt-0 first:border-t-0 first:pt-0 md:gap-2 lg:mt-0 lg:border-t-0 lg:pt-0"
          >
            <h3 className="type-h3-label">{item.title}</h3>
            <p className="m-0 type-body text-ink-2">
              <Rich text={item.body} />
            </p>
            {item.note ? (
              <p className="m-0 type-body text-ink-2">
                <Rich text={item.note} />
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
