import type { ReactNode } from "react";
import { Rich } from "@/components/ui/Rich";

/** The panels a figure sits on: a grey surface, a tint (screenshots), a thin border, or none. */
export type FigurePanel = "surface" | "tint" | "border" | "none";

const PANELS: Record<FigurePanel, string> = {
  surface: "rounded-panel-sm bg-surface p-4 lg:rounded-panel lg:p-6",
  tint: "rounded-panel-sm bg-tint p-4 lg:rounded-panel lg:p-8",
  border: "rounded-panel-sm border border-line p-4 lg:rounded-panel lg:p-7",
  none: "",
};

/** A figure's caption: muted, kept to a short measure. */
export function FigureCaption({ text }: { text: string }) {
  return (
    <figcaption className="max-w-[480px] type-caption text-muted ar:max-w-[440px]">
      <Rich text={text} />
    </figcaption>
  );
}

type CaseFigureProps = {
  caption: string | null;
  panel: FigurePanel;
  /** Extra classes for the panel, e.g. its own grid. */
  panelClassName?: string;
  children: ReactNode;
};

/** A figure in a case-study section: the drawing or screens on a panel, then the caption. */
export function CaseFigure({ caption, panel, panelClassName = "", children }: CaseFigureProps) {
  return (
    <figure className="m-0 mt-1 flex flex-col gap-2.5 lg:mt-2 lg:gap-3">
      <div className={`${PANELS[panel]} ${panelClassName}`}>{children}</div>
      {caption ? <FigureCaption text={caption} /> : null}
    </figure>
  );
}
