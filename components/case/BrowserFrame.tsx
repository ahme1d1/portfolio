import type { StaticImageData } from "next/image";
import { Img } from "@/components/ui/Img";
import { LockIcon } from "@/components/ui/icons";
import type { BrowserBar } from "@/content/cases/types";

/** "hero": the case's main screenshot. "shot": a smaller screen inside a section. */
type FrameSize = "hero" | "shot";

const STYLES: Record<FrameSize, { frame: string; bar: string; dot: string; url: string; blank: string }> = {
  hero: {
    frame: "rounded-[10px] md:rounded-button",
    bar: "h-[26px] gap-1 px-2.5 md:h-10 md:gap-2 md:px-4",
    dot: "size-1.5 md:size-2.5",
    url: "ms-2 md:ms-4 md:h-6 md:px-3",
    blank: "ms-2 h-3.5 w-24 md:ms-4 md:h-6 md:w-60",
  },
  shot: {
    frame: "rounded-[10px] md:rounded-control",
    bar: "h-[26px] gap-1 px-2.5 md:h-[34px] md:gap-2 md:px-3.5",
    dot: "size-[7px] md:size-[9px]",
    url: "ms-2 md:ms-3 md:h-[22px] md:px-2.5",
    blank: "ms-2 h-3.5 w-24 md:ms-3 md:h-[22px] md:w-48",
  },
};

function AddressBar({ bar, size }: { bar: BrowserBar; size: FrameSize }) {
  const style = STYLES[size];
  return (
    // Decorative chrome, read left to right in both languages; the screenshot's alt names the site.
    <div aria-hidden="true" dir="ltr" lang="en" className={`flex shrink-0 items-center border-b border-line ${style.bar}`}>
      {[0, 1, 2].map((dot) => (
        <span key={dot} className={`rounded-full bg-line ${style.dot}`} />
      ))}
      {bar.kind === "url" ? (
        <span
          className={`truncate text-xs leading-none text-muted md:inline-flex md:items-center md:gap-1.5 md:rounded-full md:bg-surface ${style.url}`}
        >
          {bar.lock ? <LockIcon size={11} className="hidden shrink-0 md:block" /> : null}
          {bar.url}
        </span>
      ) : null}
      {bar.kind === "blank" ? <span className={`rounded-full bg-surface ${style.blank}`} /> : null}
    </div>
  );
}

type BrowserFrameProps = {
  bar: BrowserBar;
  image: StaticImageData;
  alt: string;
  sizes: string;
  size: FrameSize;
  /** The page's largest image: loaded first. */
  isLcp?: boolean;
};

/** A screenshot in a plain browser window: three dots and the address. */
export function BrowserFrame({ bar, image, alt, sizes, size, isLcp = false }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden border border-line bg-page shadow-card ${STYLES[size].frame}`}>
      <AddressBar bar={bar} size={size} />
      <Img
        src={image}
        alt={alt}
        sizes={sizes}
        loading={isLcp ? "eager" : "lazy"}
        fetchPriority={isLcp ? "high" : undefined}
        className="block aspect-[16/10] h-auto w-full bg-surface object-cover object-top outline-1 -outline-offset-1 outline-img-line"
      />
    </div>
  );
}
