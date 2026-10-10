import { plainText } from "@/lib/rich/parse";
import { CaseFigure } from "@/components/case/CaseFigure";
import { CheckIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";
import { getEducoursezDiagrams } from "@/content/cases/educoursez";
import type { FigureProps } from "../registry";

/**
 * Each row closes its column with a line under it: the last row on phones (one column), and the
 * last row of each of the two columns from 768px, where the list fills four rows top to bottom.
 */
function rowBorder(index: number, count: number): string {
  if (index === count - 1) return "border-b";
  if (index === Math.ceil(count / 2) - 1) return "md:border-b";
  return "";
}

/** "Built in phases": the eight phases in order, done or next. Two columns from 768px. */
export function EducoursezPhases({ locale }: FigureProps) {
  const { phases } = getEducoursezDiagrams(locale);
  const count = phases.items.length;
  return (
    <CaseFigure caption={null} panel="none">
      <ol
        aria-label={plainText(phases.label)}
        className="m-0 flex list-none flex-col p-0 md:grid md:grid-flow-col md:grid-cols-2 md:grid-rows-4 md:gap-x-10"
      >
        {phases.items.map((phase, index) => (
          <li
            key={phase.number}
            className={`grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-line py-3 text-pretty md:grid-cols-[72px_minmax(0,1fr)_auto] md:gap-3 md:py-3.5 ar:grid-cols-[88px_minmax(0,1fr)_auto] md:ar:grid-cols-[96px_minmax(0,1fr)_auto] ${rowBorder(index, count)}`}
          >
            <span className="text-sm text-muted tabular-nums md:text-[15px]">
              <Rich text={phase.number} />
            </span>
            <span className="text-[15px] font-semibold md:text-base">
              <Rich text={phase.name} />
            </span>
            {phase.isDone ? (
              <span className="inline-flex items-center gap-1 text-[13px] text-ok-ink md:text-sm">
                <CheckIcon size={14} strokeWidth={2.5} />
                <Rich text={phases.done} />
              </span>
            ) : (
              <span className="text-[13px] font-semibold text-accent-ink md:text-sm">
                <Rich text={phases.next} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </CaseFigure>
  );
}
