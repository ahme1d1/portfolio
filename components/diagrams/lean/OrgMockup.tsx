/**
 * A tiny website on the hero drawing, one look per organization: a logo and menu, a banner, a row of
 * tiles and a footer line. Decorative (aria-hidden): the card's name and list say what it is. Phone
 * sizes first (a 96px thumbnail beside the name), the board's desktop sizes from `md`.
 */
type MockupLook = {
  logo: string;
  brand: string;
  banner: string;
  lines: readonly [string, string];
  /** A white box beside the banner's lines (the training centre). */
  aside: boolean;
  tiles: string;
  tileCount: number;
};

const LOOKS: readonly MockupLook[] = [
  {
    logo: "rounded-[3px] bg-accent md:rounded-[5px]",
    brand: "w-[26px] md:w-16",
    banner: "flex flex-col justify-end gap-1 bg-accent md:gap-1.5",
    lines: ["w-[60%] bg-on-accent", "w-[38%] bg-on-accent-muted"],
    aside: false,
    tiles: "grid-cols-3",
    tileCount: 3,
  },
  {
    logo: "rounded-full bg-inverse",
    brand: "w-[22px] md:w-[52px]",
    banner: "flex flex-col justify-center gap-1 bg-inverse md:gap-1.5",
    lines: ["w-[52%] bg-on-inverse", "w-[32%] bg-on-inverse-muted"],
    aside: false,
    tiles: "grid-cols-2",
    tileCount: 2,
  },
  {
    logo: "rounded-[3px] border-2 border-accent md:rounded-sm",
    brand: "w-7 md:w-[72px]",
    banner: "grid grid-cols-[minmax(0,1fr)_22px] items-center gap-1.5 bg-tint md:grid-cols-[minmax(0,1fr)_56px] md:gap-3",
    lines: ["w-[80%] bg-accent", "w-1/2 bg-strong"],
    aside: true,
    tiles: "grid-cols-4",
    tileCount: 4,
  },
];

const BAR = "block h-[5px] rounded-full md:h-2";

function BannerLines({ lines }: { lines: MockupLook["lines"] }) {
  return (
    <>
      {lines.map((line) => (
        <span key={line} className={`${BAR} ${line}`} />
      ))}
    </>
  );
}

/** The mini website of the organization at `index` on the drawing. */
export function OrgMockup({ index, className = "" }: { index: number; className?: string }) {
  const look = LOOKS[index % LOOKS.length];
  if (!look) return null;
  return (
    <span
      aria-hidden="true"
      data-mockup
      className={`flex flex-col gap-1 rounded-[10px] border border-line p-2 md:gap-1.5 md:rounded-control md:p-2.5 ${className}`}
    >
      <span className="flex items-center gap-1 md:gap-2">
        <span className={`block size-2.5 shrink-0 md:size-4 ${look.logo}`} />
        <span className={`block h-1.5 rounded-full bg-line md:h-2 ${look.brand}`} />
        <span className="ms-auto flex gap-[3px] md:gap-1.5">
          {[0, 1, 2].map((item) => (
            <span key={item} className="block h-1 w-2.5 rounded-full bg-line md:h-1.5 md:w-6" />
          ))}
        </span>
      </span>
      <span className={`h-[42px] rounded-md p-2 md:h-[72px] md:rounded-lg md:p-3 ${look.banner}`}>
        {look.aside ? (
          <>
            <span className="flex flex-col gap-1 md:gap-1.5">
              <BannerLines lines={look.lines} />
            </span>
            <span className="block h-[26px] rounded-sm bg-page md:h-12 md:rounded-md" />
          </>
        ) : (
          <BannerLines lines={look.lines} />
        )}
      </span>
      <span className={`grid gap-1 md:gap-1.5 ${look.tiles}`}>
        {Array.from({ length: look.tileCount }, (_, tile) => (
          <span key={tile} className="block h-5 rounded-sm bg-surface md:h-[34px] md:rounded-md" />
        ))}
      </span>
      <span className={`${BAR} bg-line`} />
    </span>
  );
}
