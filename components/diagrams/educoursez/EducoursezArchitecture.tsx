import { CaseFigure } from "@/components/case/CaseFigure";
import { getEducoursezDiagrams } from "@/content/cases/educoursez";
import type { FigureProps } from "../registry";
import { DiagramBox, DiagramLabel } from "../primitives";

type WireProps = { protocol: string; realtime: string };

/**
 * The link between a client and the API: the protocol, a blue line, the realtime channel. Across
 * from 768px (labels above and below the line); on phones a vertical line with a label each side.
 */
function Wire({ protocol, realtime }: WireProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_2px_minmax(0,1fr)] items-center gap-3 md:flex md:flex-col md:gap-1.5 md:px-2.5 md:text-center">
      <DiagramLabel text={protocol} className="text-end md:text-center" />
      <span aria-hidden="true" data-line="" className="block h-10 bg-accent md:h-0.5 md:w-full" />
      <DiagramLabel text={realtime} />
    </div>
  );
}

/** The student app and the staff dashboard on either side of the one API, which is the authority. */
export function EducoursezArchitecture({ locale }: FigureProps) {
  const { architecture } = getEducoursezDiagrams(locale);
  const { student, studentLink, api, staffLink, staff } = architecture;
  return (
    <CaseFigure caption={architecture.caption} panel="surface">
      <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)_120px_minmax(0,1fr)] md:items-center md:ar:grid-cols-[minmax(0,1fr)_132px_minmax(0,1fr)_132px_minmax(0,1fr)]">
        <DiagramBox eyebrow={student.eyebrow} title={student.name} detail={student.detail} tone="page" />
        <Wire protocol={studentLink.protocol} realtime={studentLink.realtime} />
        <DiagramBox eyebrow={api.eyebrow} title={api.name} detail={api.detail} tone="accent" />
        <Wire protocol={staffLink.protocol} realtime={staffLink.realtime} />
        <DiagramBox eyebrow={staff.eyebrow} title={staff.name} detail={staff.detail} tone="page" />
      </div>
    </CaseFigure>
  );
}
