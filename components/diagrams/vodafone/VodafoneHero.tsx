import { Rich } from "@/components/ui/Rich";
import { getVodafoneDiagrams } from "@/content/cases/vodafone-modernization";
import { FlowArrow } from "../primitives";
import type { FigureProps } from "../registry";

/** Which of the four widget tiles are React: none before, the first and last during the migration. */
const BEFORE_TILES = [false, false, false, false] as const;
const DURING_TILES = [true, false, false, true] as const;

const TILE = "flex items-center justify-center rounded-[10px] px-2 text-center text-[13px] ar:leading-relaxed";
const LEGACY_TILE = "border border-strong text-muted";
const REACT_TILE = "bg-accent font-semibold text-on-accent";

function Tile({ text, isReact, className }: { text: string; isReact: boolean; className: string }) {
  return (
    <span className={`${TILE} ${isReact ? REACT_TILE : LEGACY_TILE} ${className}`}>
      <Rich text={text} />
    </span>
  );
}

type PageProps = {
  label: string;
  page: string;
  tiles: readonly boolean[];
  table: string;
  isTableReact: boolean;
  widget: string;
  module: string;
};

/** One state of the page: its name, then the page drawn as a header bar, four widget tiles and the table. */
function PageMock({ label, page, tiles, table, isTableReact, widget, module }: PageProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2 md:gap-2.5">
      <span className="text-sm font-semibold text-ink-2 md:text-[15px]">
        <Rich text={label} />
      </span>
      <div className="flex flex-col gap-2 rounded-button border border-line bg-page p-3.5 md:gap-2.5 md:rounded-card-sm md:p-4">
        <span className="text-[13px] text-muted ar:leading-relaxed">
          <Rich text={page} />
        </span>
        <span aria-hidden="true" className="h-5 rounded-md bg-surface md:h-6.5 md:rounded-lg" />
        <span className="grid grid-cols-2 gap-2 md:gap-2.5">
          {/* The tiles are fixed positions on the page, so their index is a stable key. */}
          {tiles.map((isReact, index) => (
            <Tile key={index} text={isReact ? module : widget} isReact={isReact} className="h-11.5 md:h-15.5" />
          ))}
        </span>
        <Tile text={table} isReact={isTableReact} className="h-10.5 md:h-14" />
      </div>
    </div>
  );
}

/**
 * The hero drawing (NDA: no screenshots): the legacy page before, then the same page during the
 * migration with React modules in place of some widgets. Stacked with a down arrow on phones. The
 * hero adds the <figure> and its caption.
 */
export function VodafoneHero({ locale }: FigureProps) {
  const { hero } = getVodafoneDiagrams(locale);
  const shared = { widget: hero.widget, module: hero.module };
  return (
    <div className="flex flex-col rounded-panel-sm bg-surface p-[18px] md:grid md:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] md:items-center md:p-6 md:ar:grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)] lg:rounded-panel lg:p-10">
      <PageMock {...hero.before} {...shared} tiles={BEFORE_TILES} isTableReact={false} />
      <div className="flex items-center justify-center gap-2 py-3 md:flex-col md:px-3 md:py-0">
        <FlowArrow size={36} />
        <span className="text-[13px] text-muted md:text-center ar:leading-relaxed">
          <Rich text={hero.step} />
        </span>
      </div>
      <PageMock {...hero.during} {...shared} tiles={DURING_TILES} isTableReact />
    </div>
  );
}
