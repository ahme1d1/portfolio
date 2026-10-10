import { CaseFigure } from "@/components/case/CaseFigure";
import { Rich } from "@/components/ui/Rich";
import { getVodafoneDiagrams } from "@/content/cases/vodafone-modernization";
import type { FigureProps } from "../registry";

/** The internal tools rebuilt for the Vodafone Germany teams, as outlined pills. */
export function VodafoneTools({ locale }: FigureProps) {
  const { tools } = getVodafoneDiagrams(locale);
  return (
    <CaseFigure caption={null} panel="none">
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0 md:gap-2.5">
        {tools.map((tool) => (
          <li key={tool} className="rounded-full border border-line px-3.5 py-2 text-[15px] font-medium md:px-4 md:py-2.5 md:text-base">
            <Rich text={tool} />
          </li>
        ))}
      </ul>
    </CaseFigure>
  );
}
