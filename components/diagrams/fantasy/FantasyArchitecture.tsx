import { CaseFigure } from "@/components/case/CaseFigure";
import { getFantasyDiagrams } from "@/content/cases/fantasy-eg";
import type { FigureProps } from "../registry";
import { Chevron, DiagramBox, DiagramLabel, FanIn, Stem } from "../primitives";

/** Four clients over one API that owns every rule, self-hosted in Docker with PostgreSQL behind it. */
export function FantasyArchitecture({ locale }: FigureProps) {
  const { architecture } = getFantasyDiagrams(locale);
  return (
    <CaseFigure caption={architecture.caption} panel="border">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {architecture.clients.map((client) => (
          <DiagramBox
            key={client.name}
            title={client.name}
            detail={client.detail}
            tone={client.inDevelopment ? "dashed" : "surface"}
            size="sm"
          />
        ))}
      </div>
      <FanIn drops={[25, 75]} height={24} className="md:hidden" />
      <FanIn drops={[12.5, 37.5, 62.5, 87.5]} className="hidden md:block" />
      <Chevron />
      <div className="mt-1.5 rounded-panel-sm border-2 border-dashed border-line px-3 pt-2.5 pb-3 md:mx-auto md:w-[62%] md:rounded-card-sm md:px-4 md:pt-3.5 md:pb-4">
        <DiagramLabel text={architecture.host} className="mb-2 md:mb-2.5" />
        <DiagramBox title={architecture.api.name} detail={architecture.api.detail} tone="accent" size="lg" centered />
        <Stem className="h-3 md:h-4" />
        <Chevron />
        <DiagramBox
          title={architecture.database.name}
          detail={architecture.database.detail}
          tone="surface"
          size="md"
          centered
          className="mt-1 md:mt-1.5"
        />
      </div>
    </CaseFigure>
  );
}
