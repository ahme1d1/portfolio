import { CaseFigure } from "@/components/case/CaseFigure";
import { ArrowIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";
import { getLeanDiagrams } from "@/content/cases/lean-academy";
import type { FigureProps } from "../registry";
import { BuilderBlocks } from "./BuilderBlocks";
import { BuilderEditPanel } from "./BuilderEditPanel";
import { BuilderPreview } from "./BuilderPreview";

/**
 * Side by side from `lg` (the desktop board: blocks | arrow | preview | edit panel), stacked below it
 * (the Mobile board), where the arrow points down. The side columns are a little narrower at `lg` so
 * the preview keeps room.
 */
const LAYOUT =
  "flex flex-col gap-3 lg:grid lg:grid-cols-[260px_56px_minmax(0,1fr)_260px] lg:items-center lg:gap-4 xl:grid-cols-[300px_64px_minmax(0,1fr)_300px]";

/** "Same order on the page": forward (right in English, left in Arabic) side by side, down when stacked. */
function SameOrder({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 lg:flex-col">
      <span aria-hidden="true" className="inline-flex text-accent-ink">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          className="lg:hidden"
        >
          <path d="M12 5v14m7-7-7 7-7-7" />
        </svg>
        <ArrowIcon size={36} className="hidden lg:block" />
      </span>
      <span className="text-[13px] leading-[1.35] text-muted lg:text-center ar:leading-relaxed">
        <Rich text={text} />
      </span>
    </div>
  );
}

/** The website builder with the Courses block open. A drawing of the interface: nothing in it is a control. */
export function LeanBuilder({ locale }: FigureProps) {
  const { builder } = getLeanDiagrams(locale);
  return (
    <CaseFigure caption={builder.caption} panel="surface" panelClassName={LAYOUT}>
      <BuilderBlocks copy={builder} />
      <SameOrder text={builder.sameOrder} />
      <BuilderPreview copy={builder} />
      <BuilderEditPanel edit={builder.edit} />
    </CaseFigure>
  );
}
