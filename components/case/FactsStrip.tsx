import { Rich } from "@/components/ui/Rich";
import type { CaseSharedCopy } from "@/content/cases/shared";
import type { CaseCopy, FactItem, FactKey } from "@/content/cases/types";

function FactValue({ items }: { items: readonly FactItem[] }) {
  const [only] = items;
  if (only && items.length === 1 && !only.live) {
    return (
      <>
        <Rich text={only.text} />
        {only.note ? (
          <span className="block text-muted">
            <Rich text={only.note} />
          </span>
        ) : null}
      </>
    );
  }
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0 md:gap-3">
      {items.map((item) => (
        <li key={item.text} className="flex flex-col gap-0.5">
          <span>
            <Rich text={item.text} />
          </span>
          {item.note ? (
            <span className="inline-flex items-center gap-1.5 type-small text-muted">
              {item.live ? <span data-dot className="size-1.5 shrink-0 rounded-full bg-ok" /> : null}
              <Rich text={item.note} />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

type FactsStripProps = {
  keys: readonly FactKey[];
  facts: CaseCopy["facts"];
  stack: readonly string[];
  labels: CaseSharedCopy["facts"];
  label: string;
};

/** Role, dates, platforms and stack under the hero: 4 columns, 2 at tablet width, rows on phones. */
export function FactsStrip({ keys, facts, stack, labels, label }: FactsStripProps) {
  return (
    <section aria-label={label}>
      <dl className="m-0 border-y border-line md:grid md:grid-cols-2 md:gap-6 md:py-6 xl:grid-cols-4">
        {keys.map((key) => {
          const items = key === "stack" ? null : facts[key];
          if (key !== "stack" && !items?.length) return null;
          return (
            <div key={key} className="flex flex-col gap-1.5 border-t border-line py-3.5 first:border-t-0 md:gap-2 md:border-t-0 md:py-0">
              <dt className="text-sm font-medium text-muted ar:text-[15px]">{labels[key]}</dt>
              <dd className="m-0 type-body text-ink tabular-nums">
                {items ? (
                  <FactValue items={items} />
                ) : (
                  <bdi dir="ltr" lang="en">
                    {stack.join(", ")}
                  </bdi>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
