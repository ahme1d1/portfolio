import { CaseFigure } from "@/components/case/CaseFigure";
import { Rich } from "@/components/ui/Rich";
import { getVodafoneDiagrams } from "@/content/cases/vodafone-modernization";
import { plainText } from "@/lib/rich/parse";
import { FlowArrow } from "../primitives";
import type { FigureProps } from "../registry";
import { BoxText } from "./BoxText";

/**
 * "One table instead of two": the two legacy table paths, an arrow, and the one React component with
 * its features. Side by side from tablet width; on phones the legacy pair sits above a down arrow.
 */
export function VodafoneTable({ locale }: FigureProps) {
  const { table } = getVodafoneDiagrams(locale);
  return (
    <CaseFigure
      caption={null}
      panel="surface"
      panelClassName="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1.4fr)] md:items-center"
    >
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-2.5">
        {table.sources.map((source) => (
          <div
            key={source}
            className="flex min-w-0 flex-col gap-0.5 rounded-control border border-strong bg-page p-3 md:gap-1 md:rounded-button md:px-[18px] md:py-4"
          >
            <span className="text-xs font-medium text-muted md:text-[13px] ar:leading-relaxed">
              <Rich text={table.legacy} />
            </span>
            <span className="text-[15px] leading-[1.3] font-semibold md:text-base md:leading-normal">
              <Rich text={source} />
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-2 md:py-0">
        <FlowArrow size={32} />
      </div>
      <div className="flex min-w-0 flex-col gap-3 rounded-button border-2 border-accent bg-page px-4 py-3.5 md:rounded-card-sm md:px-5 md:py-[18px]">
        <BoxText eyebrow={table.eyebrow} title={table.title} isAccent />
        <ul aria-label={plainText(table.featuresLabel)} className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {table.features.map((feature) => (
            <li key={feature} className="rounded-full bg-chip px-2.5 py-1 text-[13px] font-medium text-accent-ink">
              <Rich text={feature} />
            </li>
          ))}
        </ul>
      </div>
    </CaseFigure>
  );
}
