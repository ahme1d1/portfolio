import { CaseFigure } from "@/components/case/CaseFigure";
import { Rich } from "@/components/ui/Rich";
import { getLeanDiagrams } from "@/content/cases/lean-academy";
import { plainText } from "@/lib/rich/parse";
import type { FigureProps } from "../registry";
import { ChipList, DiagramBox, Drops } from "../primitives";
import { RAIL_COLUMN, RailBranch } from "./Rail";

type ArchitectureCopy = ReturnType<typeof getLeanDiagrams>["architecture"];

/** The three boxes under my part, and the drops into them: the gateway is the widest. */
const BACKEND_COLUMNS = "md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]";

/** My part: one Angular app, and the three things it is for every organization. */
function AppBox({ app, parts }: Pick<ArchitectureCopy, "app" | "parts">) {
  return (
    <div className="flex flex-col gap-3 rounded-control bg-accent p-3.5 text-on-accent md:gap-3.5 md:rounded-button md:px-5 md:py-[18px]">
      <div className="flex flex-col gap-0.5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <span className="flex flex-col gap-0.5 lg:gap-1">
          <span className="text-[13px] font-medium text-on-accent-muted">
            <Rich text={app.eyebrow} />
          </span>
          <span className="text-base leading-snug ar:leading-relaxed font-semibold md:text-[17px]">
            <Rich text={app.title} />
          </span>
        </span>
        <span className="text-[13px] leading-snug ar:leading-relaxed text-on-accent-muted md:text-sm">
          <Rich text={app.detail} />
        </span>
      </div>
      <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-2.5">
        {parts.map((part) => (
          <span
            key={part.title}
            className="flex flex-col gap-0.5 rounded-[10px] border border-on-accent-muted px-3 py-2.5 md:px-3.5 md:py-3"
          >
            <span className="text-[15px] leading-snug ar:leading-relaxed font-semibold">
              <Rich text={part.title} />
            </span>
            <span className="text-[13px] leading-snug ar:leading-relaxed text-on-accent-muted">
              <Rich text={part.detail} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * How the app reaches the backend: my part on top (accent), then the API gateway with the services
 * behind it, the SignalR hub and the identity provider, which are other people's work. On phones the
 * three hang off a line on the end side.
 */
export function LeanArchitecture({ locale }: FigureProps) {
  const { architecture } = getLeanDiagrams(locale);
  const { gateway, hub, identity } = architecture;
  return (
    <CaseFigure caption={architecture.caption} panel="surface">
      <AppBox app={architecture.app} parts={architecture.parts} />
      <Drops count={3} className={`hidden gap-3 md:grid ${BACKEND_COLUMNS}`} />
      <div className={`${RAIL_COLUMN} md:gap-3 ${BACKEND_COLUMNS}`}>
        <DiagramBox eyebrow={gateway.eyebrow} title={gateway.title} tone="page" className="group/rail relative">
          <ChipList
            label={plainText(architecture.servicesLabel)}
            items={architecture.services.map((service) => ({ text: service.name, tone: service.mine ? "accent" : "plain" }))}
            className="mt-2 md:mt-2.5"
          />
          <RailBranch />
        </DiagramBox>
        {[hub, identity].map((box) => (
          <DiagramBox key={box.title} eyebrow={box.eyebrow} title={box.title} detail={box.detail} tone="page" className="group/rail relative">
            <RailBranch />
          </DiagramBox>
        ))}
      </div>
    </CaseFigure>
  );
}
