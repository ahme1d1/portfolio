import { CaseFigure } from "@/components/case/CaseFigure";
import { getCulturalBridgeDiagrams } from "@/content/cases/cultural-bridge";
import type { FigureProps } from "../registry";
import { Chevron, DiagramBox, DiagramLabel, Stem } from "../primitives";

/** From lg: the three apps in one row with a 150px link between each pair. */
const ROW = "lg:grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)_150px_minmax(0,1fr)]";

/**
 * Below lg the apps stack, with a 24px rail on the end side that gathers them into the API;
 * from lg they sit in one row and the rail pieces are hidden.
 */
const CHAIN = `grid grid-cols-[minmax(0,1fr)_24px] lg:items-center ${ROW}`;

/** "forward" goes from the website to the organizer dashboard, "back" from the admin dashboard to it. */
type Direction = "forward" | "back";

type App = { eyebrow: string; name: string; detail: string };
type Link = { above: string; below: string };

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Below lg: the link's arrow stands upright, down to the next app or up to the one before. */
function UprightArrow({ direction }: { direction: Direction }) {
  const isDown = direction === "forward";
  return (
    <span aria-hidden="true" className={`row-span-2 flex h-10 w-3 items-center lg:hidden ${isDown ? "flex-col" : "flex-col-reverse"}`}>
      <span className="w-0.5 flex-1 bg-accent" />
      <svg
        data-arrow={isDown ? "down" : "up"}
        width="12"
        height="8"
        viewBox="0 0 12 8"
        focusable="false"
        className={`block shrink-0 text-accent ${isDown ? "-mt-0.5" : "-mb-0.5 rotate-180"}`}
      >
        <path d="M1 1l5 6 5-6" {...STROKE} />
      </svg>
    </span>
  );
}

/** From lg: the link's line with a chevron at the app it points to, mirrored in Arabic. */
function SideArrow({ direction }: { direction: Direction }) {
  const isForward = direction === "forward";
  const head = (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      focusable="false"
      className={`block shrink-0 text-accent rtl:-scale-x-100 ${isForward ? "-ms-0.5" : "-me-0.5"}`}
    >
      <path d={isForward ? "M1 1l6 5-6 5" : "M7 1L1 6l6 5"} {...STROKE} />
    </svg>
  );
  return (
    <span aria-hidden="true" className="hidden w-full items-center lg:flex">
      {isForward ? null : head}
      <span className="h-0.5 flex-1 bg-accent" />
      {isForward ? head : null}
    </span>
  );
}

/**
 * A link between two apps: its arrow beside two stacked labels on phones; from lg a label, the
 * arrow, a label, between two columns.
 */
function AppLink({ link, direction }: { link: Link; direction: Direction }) {
  return (
    <div className="grid grid-cols-[12px_minmax(0,1fr)] items-center gap-x-3 py-2 ps-5 lg:flex lg:flex-col lg:gap-1.5 lg:px-2.5 lg:py-0 lg:text-center">
      <UprightArrow direction={direction} />
      <DiagramLabel text={link.above} />
      <SideArrow direction={direction} />
      <DiagramLabel text={link.below} />
    </div>
  );
}

function AppBox({ app }: { app: App }) {
  return <DiagramBox eyebrow={app.eyebrow} title={app.name} detail={app.detail} tone="page" className="lg:self-stretch" />;
}

/**
 * Below lg, a piece of the rail beside each row: "first" starts at the website, "join" takes in an
 * app, "through" passes a link by.
 */
function Rail({ piece }: { piece: "first" | "join" | "through" }) {
  return (
    <span aria-hidden="true" className="relative lg:hidden">
      {piece === "through" ? null : <span className="absolute start-0 end-[11px] top-1/2 -mt-px h-0.5 bg-strong" />}
      <span className={`absolute start-[11px] bottom-0 w-0.5 bg-strong ${piece === "first" ? "top-1/2 -mt-px" : "top-0"}`} />
    </span>
  );
}

/** Below lg: the rail's last row, an empty cell and the chevron into the API. */
function RailEnd() {
  return (
    <>
      <span aria-hidden="true" className="lg:hidden" />
      <span aria-hidden="true" className="relative h-6 lg:hidden">
        <span className="absolute start-[11px] top-0 bottom-1 w-0.5 bg-strong" />
        <svg width="12" height="8" viewBox="0 0 12 8" focusable="false" className="absolute start-1.5 bottom-0 block text-strong">
          <path d="M1 1l5 6 5-6" {...STROKE} />
        </svg>
      </span>
    </>
  );
}

/** From lg: a line from under each app's centre, joined, dropping into the API. Symmetric, so it reads the same both ways. */
function Bracket() {
  return (
    <>
      <div aria-hidden="true" className={`hidden h-3.5 lg:grid ${ROW}`}>
        <span className="w-1/2 justify-self-end border-s-2 border-b-2 border-strong" />
        <span className="border-b-2 border-strong" />
        <span className="flex justify-center border-b-2 border-strong">
          <span className="w-0.5 bg-strong" />
        </span>
        <span className="border-b-2 border-strong" />
        <span className="w-1/2 justify-self-start border-e-2 border-b-2 border-strong" />
      </div>
      <Stem className="hidden h-3.5 lg:block" />
      <Chevron className="hidden lg:block" />
    </>
  );
}

/** The website and the two dashboards on one REST API, and the two links that tie the apps together. */
export function CulturalBridgeArchitecture({ locale }: FigureProps) {
  const { architecture } = getCulturalBridgeDiagrams(locale);
  const { api } = architecture;
  return (
    <CaseFigure caption={architecture.caption} panel="surface">
      <div className={CHAIN}>
        <AppBox app={architecture.website} />
        <Rail piece="first" />
        <AppLink link={architecture.ticketLink} direction="forward" />
        <Rail piece="through" />
        <AppBox app={architecture.organizer} />
        <Rail piece="join" />
        <AppLink link={architecture.loginLink} direction="back" />
        <Rail piece="through" />
        <AppBox app={architecture.admin} />
        <Rail piece="join" />
        <RailEnd />
      </div>
      <Bracket />
      <DiagramBox eyebrow={api.eyebrow} title={api.name} detail={api.detail} tone="accent" centered className="mt-1.5 lg:mx-auto lg:w-2/5" />
    </CaseFigure>
  );
}
