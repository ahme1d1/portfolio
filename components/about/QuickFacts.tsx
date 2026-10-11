import { DefinitionRows } from "@/components/ui/DefinitionRows";
import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import type { AboutCopy } from "@/content/about";
import { getHomeCopy } from "@/content/home";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";

/** The facts list, and beside it (level with the list) the optional outside-work panel once Ahmed writes it. */
export function QuickFacts({ locale, copy }: { locale: Locale; copy: AboutCopy }) {
  const { facts, outside } = copy;
  const headingId = pageId("about", "facts", locale);
  const outsideId = pageId("about", "outside", locale);
  const availability = (
    <span className="inline-flex items-start gap-2 lg:gap-2.5">
      {/* Centred on the first line, so it stays beside "Open" when the sentence wraps. */}
      <span
        aria-hidden="true"
        className="mt-[calc((1lh-7px)/2)] size-[7px] shrink-0 rounded-full bg-ok lg:mt-[calc((1lh-8px)/2)] lg:size-2"
      />
      {getHomeCopy(locale).hero.availability}
    </span>
  );
  const rows = [
    ...facts.rows.map((row) => ({ term: row.term, value: <Rich text={row.value} /> })),
    { term: facts.availability, value: availability },
  ];

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-x-14 lg:gap-y-7">
        <h2 id={headingId} className="type-h2">
          {facts.title}
        </h2>
        <div className="lg:col-start-1 lg:row-start-2">
          <DefinitionRows rows={rows} term="muted" termWidth="narrow" value="large" />
        </div>
        {outside.text ? (
          <aside
            aria-labelledby={outsideId}
            className="mt-2 flex flex-col gap-2 rounded-panel-sm border border-line p-5 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:gap-3 lg:rounded-panel lg:p-7"
          >
            <h2 id={outsideId} className="type-h2-panel">
              {outside.title}
            </h2>
            <p className="m-0 type-body-lg text-ink-2">
              <Rich text={outside.text} />
            </p>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
