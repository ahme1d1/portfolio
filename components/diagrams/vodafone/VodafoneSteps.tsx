import { CaseFigure } from "@/components/case/CaseFigure";
import { Rich } from "@/components/ui/Rich";
import { getVodafoneDiagrams } from "@/content/cases/vodafone-modernization";
import { plainText } from "@/lib/rich/parse";
import type { FigureProps } from "../registry";

/**
 * How a business rule moves from the legacy code into a shipped module: four numbered steps, the
 * last one (shipping) in the accent. Four columns from tablet width, rows on phones.
 */
export function VodafoneSteps({ locale }: FigureProps) {
  const { steps } = getVodafoneDiagrams(locale);
  const lastIndex = steps.items.length - 1;
  return (
    <CaseFigure caption={null} panel="none">
      <ol aria-label={plainText(steps.label)} className="m-0 flex list-none flex-col p-0 md:grid md:grid-cols-4 md:gap-4">
        {steps.items.map((step, index) => {
          const isLast = index === lastIndex;
          return (
            <li
              key={step}
              data-last={isLast ? "" : undefined}
              className={`flex items-baseline gap-3.5 border-t-2 py-3 md:flex-col md:items-stretch md:gap-1 md:pt-3.5 md:pb-0 ${isLast ? "border-accent" : "border-strong"}`}
            >
              <span className={`w-3.5 shrink-0 text-sm tabular-nums md:w-auto ${isLast ? "text-accent-ink" : "text-muted"}`}>
                {index + 1}
              </span>
              <span className="text-base font-semibold ar:leading-relaxed">
                <Rich text={step} />
              </span>
            </li>
          );
        })}
      </ol>
    </CaseFigure>
  );
}
