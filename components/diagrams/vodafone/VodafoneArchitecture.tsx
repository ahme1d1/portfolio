import type { ReactNode } from "react";
import { CaseFigure } from "@/components/case/CaseFigure";
import { Rich } from "@/components/ui/Rich";
import { getVodafoneDiagrams } from "@/content/cases/vodafone-modernization";
import { DiagramLabel, Drops, Stem } from "../primitives";
import type { FigureProps } from "../registry";
import { BoxText } from "./BoxText";

/** A full-width layer (the API layer, the callback bus): its text, and anything drawn beside it. */
function Layer({ eyebrow, title, detail, children }: { eyebrow: string; title: string; detail: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-control border border-line bg-page p-3.5 md:flex-row md:items-center md:justify-between md:gap-5 md:rounded-button md:px-5 md:py-4">
      <BoxText eyebrow={eyebrow} title={title} detail={detail} />
      {children}
    </div>
  );
}

/** The lines between two layers: one on phones, under each of the three module columns from tablet width. */
function Links() {
  return (
    <>
      <Stem className="h-[22px] md:hidden" />
      <div className="hidden md:block">
        <Drops count={3} lineClassName="h-[22px]" />
      </div>
    </>
  );
}

/** A drawn rollout flag: on (knob at the end) or off (knob at the start). Decorative; the label says it. */
function Toggle({ isOn }: { isOn: boolean }) {
  return isOn ? (
    <span data-toggle aria-hidden="true" className="inline-flex h-[18px] w-[30px] shrink-0 items-center justify-end rounded-full bg-on-accent px-[3px]">
      <span className="size-3 rounded-full bg-accent" />
    </span>
  ) : (
    <span data-toggle aria-hidden="true" className="inline-flex h-[18px] w-[30px] shrink-0 items-center justify-start rounded-full border border-strong px-[3px]">
      <span className="size-2.5 rounded-full bg-strong" />
    </span>
  );
}

const CARD = "flex items-center justify-between gap-3 rounded-control md:flex-col md:items-stretch md:justify-start md:rounded-button";
const STATUS = "flex shrink-0 items-center gap-2 text-[13px]";

function ModuleOn({ name, flag }: { name: string; flag: string }) {
  return (
    <div className={`${CARD} bg-accent px-3.5 py-3 text-on-accent md:px-[18px] md:py-4`}>
      <span className="text-[15px] font-semibold md:text-base">
        <Rich text={name} />
      </span>
      <span className={`${STATUS} text-on-accent-muted`}>
        <Toggle isOn />
        <Rich text={flag} />
      </span>
    </div>
  );
}

function ModuleOff({ title, detail, flag }: { title: string; detail: string; flag: string }) {
  return (
    <div className={`${CARD} border border-dashed border-strong bg-page p-3 md:p-4`}>
      <span className="text-[15px] leading-[1.35] font-semibold md:text-base md:leading-normal">
        <Rich text={title} />{" "}
        <span className="font-normal text-muted">
          <Rich text={detail} />
        </span>
      </span>
      <span className={`${STATUS} text-muted`}>
        <Toggle isOn={false} />
        <Rich text={flag} />
      </span>
    </div>
  );
}

/**
 * The four pieces: the typed API layer (a superseded request is cancelled), the modules behind their
 * rollout flags (one switched off), and the typed callback bus. The board sets the caption inside
 * the panel; here it sits under it, like every other figure (and the phone board).
 */
export function VodafoneArchitecture({ locale }: FigureProps) {
  const { architecture } = getVodafoneDiagrams(locale);
  const { api, modules, bus } = architecture;
  return (
    <CaseFigure caption={architecture.caption} panel="surface">
      <Layer eyebrow={api.eyebrow} title={api.title} detail={api.detail}>
        <span className="flex flex-wrap items-center gap-2 text-[13px] md:shrink-0 md:flex-nowrap">
          <s className="rounded-lg border border-dashed border-strong px-2.5 py-1.5 text-muted">
            <Rich text={api.cancelled} />
          </s>
          <span className="rounded-lg bg-chip px-2.5 py-1.5 text-accent-ink">
            <Rich text={api.used} />
          </span>
        </span>
      </Layer>
      <Links />
      <div className="flex flex-col gap-2">
        <DiagramLabel text={modules.label} className="leading-[1.45] font-medium md:leading-normal ar:leading-relaxed" />
        <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-3">
          <ModuleOn name={modules.module} flag={modules.flagOn} />
          <ModuleOn name={modules.module} flag={modules.flagOn} />
          <ModuleOff title={modules.off} detail={modules.offDetail} flag={modules.killSwitch} />
        </div>
      </div>
      <Links />
      <Layer eyebrow={bus.eyebrow} title={bus.title} detail={bus.detail} />
    </CaseFigure>
  );
}
