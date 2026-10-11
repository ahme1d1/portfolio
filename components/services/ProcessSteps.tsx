import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import type { ServicesCopy } from "@/content/services";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";

/**
 * "How a project runs": a real sequence, so an ordered list. The visible number is hidden from
 * screen readers (the list already says "1 of 4"). Four columns from 1024px; on phones the number
 * sits beside the step, on the title's baseline.
 */
export function ProcessSteps({ locale, copy }: { locale: Locale; copy: ServicesCopy["process"] }) {
  const headingId = pageId("services", "process", locale);

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <h2 id={headingId} className="mb-4 type-h2 lg:mb-7">
        {copy.title}
      </h2>
      <ol className="m-0 list-none border-b border-line p-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:border-b-0">
        {copy.steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[28px_minmax(0,1fr)] items-baseline gap-x-2.5 gap-y-1 border-t border-line py-5 lg:flex lg:flex-col lg:items-stretch lg:gap-2.5 lg:pb-0"
          >
            <span aria-hidden="true" className="text-base font-semibold text-accent-ink tabular-nums lg:text-[17px]">
              {index + 1}
            </span>
            <h3 className="type-h3-row">
              <Rich text={step.title} />
            </h3>
            <p className="col-start-2 m-0 type-body text-ink-2">
              <Rich text={step.text} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
