import { getLeanDiagrams } from "@/content/cases/lean-academy";
import { Rich } from "@/components/ui/Rich";
import { plainText } from "@/lib/rich/parse";
import type { FigureProps } from "../registry";
import { ChipList, Drops } from "../primitives";
import { OrgMockup } from "./OrgMockup";
import { RAIL_COLUMN, RailBranch } from "./Rail";

type HeroCopy = ReturnType<typeof getLeanDiagrams>["hero"];

/** The accent bar: the platform's name, and what it offers every organization. */
function PlatformBar({ hero }: { hero: HeroCopy }) {
  return (
    <div className="flex flex-col gap-3 rounded-button bg-accent px-4 py-3.5 text-on-accent md:flex-row md:items-center md:justify-between md:gap-8 md:rounded-card-sm md:px-6 md:py-5">
      <span className="flex shrink-0 flex-col gap-0.5 md:gap-1">
        <span className="text-[13px] font-medium text-on-accent-muted">
          <Rich text={hero.platform.eyebrow} />
        </span>
        <span className="text-xl leading-snug ar:leading-relaxed font-semibold tracking-[-0.01em] md:text-[22px] ar:tracking-normal">
          <Rich text={hero.platform.name} />
        </span>
      </span>
      <ul
        aria-label={plainText(hero.offersLabel)}
        className="m-0 flex list-none flex-wrap gap-x-3.5 gap-y-0.5 p-0 md:justify-end md:gap-x-6 md:gap-y-1"
      >
        {hero.offers.map((offer) => (
          <li key={offer} className="py-[3px] text-[13px] font-medium md:py-1 md:text-sm">
            <Rich text={offer} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** One organization: its own mini website, and the website and portals it gets. */
function OrganizationCard({ name, index, hero }: { name: string; index: number; hero: HeroCopy }) {
  return (
    <div className="group/rail relative grid grid-cols-[96px_minmax(0,1fr)] items-center gap-3 rounded-button border border-line bg-page p-3 md:flex md:flex-col md:items-stretch md:rounded-card-sm md:p-4">
      <OrgMockup index={index} className="md:order-2" />
      <span className="flex min-w-0 flex-col gap-2 md:contents">
        <span className="text-base leading-snug ar:leading-relaxed font-semibold md:order-1 md:text-[17px]">
          <Rich text={name} />
        </span>
        <ChipList
          label={plainText(hero.getsLabel)}
          items={hero.gets.map((get) => ({ text: get.name, tone: get.highlighted ? "accent" : "plain" }))}
          className="md:order-3"
        />
      </span>
      <RailBranch />
    </div>
  );
}

/**
 * The hero drawing (the case adds the figure and its caption): one platform over three kinds of
 * organization, each with its own website. Desktop: three cards hanging from the bar. Phones: the
 * cards stacked, hanging off a line on the end side.
 */
export function LeanHero({ locale }: FigureProps) {
  const { hero } = getLeanDiagrams(locale);
  return (
    <div className="flex flex-col rounded-panel-sm bg-surface p-4 md:p-6 lg:rounded-panel lg:p-10">
      <PlatformBar hero={hero} />
      <Drops count={3} className="hidden gap-6 md:grid" lineClassName="h-7" />
      <div className={`${RAIL_COLUMN} md:grid-cols-3 md:gap-6`}>
        {hero.organizations.map((name, index) => (
          <OrganizationCard key={name} name={name} index={index} hero={hero} />
        ))}
      </div>
    </div>
  );
}
