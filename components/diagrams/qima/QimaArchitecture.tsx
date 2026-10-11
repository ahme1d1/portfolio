import { CaseFigure } from "@/components/case/CaseFigure";
import { getQimaDiagrams } from "@/content/cases/qima";
import type { FigureProps } from "../registry";
import { DiagramBox, DiagramLabel, Drops } from "../primitives";

const LINE = "block w-0.5 bg-strong";

/**
 * A frontend's line down to the API with what it sends. From 768px the label sits beside the line;
 * on phones it sits on the line, which stretches so both columns reach the API.
 */
function Wire({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-1.5 md:grid md:grid-cols-[minmax(0,1fr)_2px_minmax(0,1fr)] md:items-center md:gap-0 md:px-0">
      <span aria-hidden="true" data-line="" className={`${LINE} h-2.5 md:hidden`} />
      <DiagramLabel
        text={text}
        className="text-center leading-[1.35] md:col-start-3 md:row-start-1 md:ps-2.5 md:text-start md:leading-normal"
      />
      <span aria-hidden="true" data-line="" className={`${LINE} min-h-2.5 flex-1 md:col-start-2 md:row-start-1 md:h-[30px] md:min-h-0 md:flex-none`} />
    </div>
  );
}

/** On phones: the branch from the rail on the end side into a service; the last one ends the rail. */
function Branch({ isLast }: { isLast: boolean }) {
  return (
    <span aria-hidden="true" className="relative md:hidden">
      <span data-line="" className={`absolute start-0 end-[11px] -mt-px h-0.5 bg-strong ${isLast ? "top-1/2" : "top-[calc(50%-5px)]"}`} />
      <span data-line="" className={`absolute start-[11px] top-0 w-0.5 bg-strong ${isLast ? "h-1/2" : "bottom-0"}`} />
    </span>
  );
}

/** The website and the dashboard on one REST API, with payments, instalments and files behind it. */
export function QimaArchitecture({ locale }: FigureProps) {
  const { architecture } = getQimaDiagrams(locale);
  const { clients, api, services } = architecture;
  const last = services.length - 1;
  return (
    <CaseFigure caption={architecture.caption} panel="surface">
      <DiagramLabel text={architecture.label} className="mb-2 font-medium" />
      <div className="grid grid-cols-2 gap-2.5 md:gap-3">
        {clients.map((client) => (
          <DiagramBox key={client.name} eyebrow={client.eyebrow} title={client.name} detail={client.detail} tone="page" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2.5 md:gap-3">
        {clients.map((client) => (
          <Wire key={client.name} text={client.link} />
        ))}
      </div>
      <DiagramBox eyebrow={api.eyebrow} title={api.name} detail={api.detail} tone="accent" centered />
      <div className="hidden md:block">
        <Drops count={3} className="gap-3" />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_24px] md:grid-cols-3 md:gap-3">
        <span aria-hidden="true" className="md:hidden" />
        <span aria-hidden="true" className="relative h-3 md:hidden">
          <span data-line="" className="absolute inset-y-0 start-[11px] w-0.5 bg-strong" />
        </span>
        {services.map((service, index) => (
          <div key={service.name} className="contents">
            <div className={index === last ? "" : "pb-2.5 md:pb-0"}>
              <DiagramBox eyebrow={service.eyebrow} title={service.name} detail={service.detail} tone="page" className="h-full" />
            </div>
            <Branch isLast={index === last} />
          </div>
        ))}
      </div>
    </CaseFigure>
  );
}
