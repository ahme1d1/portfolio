import { CaseFigure } from "@/components/case/CaseFigure";
import { getTikVideoDiagrams } from "@/content/cases/tikvideo";
import type { FigureProps } from "../registry";
import { DiagramBox, DiagramLabel } from "../primitives";

/**
 * A stack on phones and tablets; from lg one row of five columns: the frontends, a 120px link
 * (132px in Arabic, whose labels run longer), the API, a link, the services it calls.
 */
const CHAIN =
  "flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)_120px_minmax(0,1fr)] lg:items-center ar:lg:grid-cols-[minmax(0,1fr)_132px_minmax(0,1fr)_132px_minmax(0,1fr)]";

const LINE_TONES = { accent: "bg-accent", strong: "bg-strong" } as const;

type ChainLinkProps = { above: string; below: string; tone: keyof typeof LINE_TONES };

/**
 * A labelled link in the chain. From lg it lies between two columns (a label, the line, a label);
 * in the stack the line stands upright between its two labels.
 */
function ChainLink({ above, below, tone }: ChainLinkProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_2px_minmax(0,1fr)] items-center gap-3 lg:flex lg:flex-col lg:gap-1.5 lg:px-2.5 lg:text-center">
      <DiagramLabel text={above} className="text-end lg:text-center" />
      <span aria-hidden="true" data-line="" className={`block h-10 lg:h-0.5 lg:w-full ${LINE_TONES[tone]}`} />
      <DiagramLabel text={below} />
    </div>
  );
}

/** The two frontends I built on the backend team's Laravel API, and the services the API calls. */
export function TikVideoArchitecture({ locale }: FigureProps) {
  const { architecture } = getTikVideoDiagrams(locale);
  const { api } = architecture;
  return (
    <CaseFigure caption={architecture.caption} panel="surface">
      <div className={CHAIN}>
        <div className="flex flex-col gap-2 lg:gap-3">
          {architecture.frontends.map((app) => (
            <DiagramBox key={app.name} eyebrow={app.eyebrow} title={app.name} detail={app.detail} tone="accentOutline" />
          ))}
        </div>
        <ChainLink above={architecture.apiLink.above} below={architecture.apiLink.below} tone="accent" />
        <DiagramBox eyebrow={api.eyebrow} title={api.name} detail={api.detail} tone="page" />
        <ChainLink above={architecture.servicesLink.above} below={architecture.servicesLink.below} tone="strong" />
        <div className="flex flex-col gap-1.5 lg:gap-2">
          {architecture.services.map((service) => (
            <DiagramBox key={service.label} eyebrow={service.label} title={service.name} tone="page" size="sm" />
          ))}
        </div>
      </div>
    </CaseFigure>
  );
}
