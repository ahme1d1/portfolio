import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";

/**
 * Shared pieces of the case-study diagrams (HTML and inline SVG, never images). Labels are real
 * text; lines, arrows and dots are aria-hidden. Copy goes through <Rich>, so Arabic labels can
 * hold {Latin}.
 */

export type BoxTone = "surface" | "page" | "accent" | "accentOutline" | "dashed";
export type BoxSize = "sm" | "md" | "lg";

const TONES: Record<BoxTone, { box: string; eyebrow: string; detail: string }> = {
  surface: { box: "border border-line bg-surface", eyebrow: "text-muted", detail: "text-muted" },
  page: { box: "border border-line bg-page", eyebrow: "text-muted", detail: "text-muted" },
  accent: { box: "bg-accent text-on-accent", eyebrow: "text-on-accent-muted", detail: "text-on-accent-muted" },
  accentOutline: { box: "border-2 border-accent bg-page", eyebrow: "text-accent-ink", detail: "text-muted" },
  dashed: { box: "border-2 border-dashed border-strong", eyebrow: "text-muted", detail: "text-muted" },
};

const SIZES: Record<BoxSize, { box: string; title: string; detail: string }> = {
  sm: {
    box: "gap-0.5 rounded-[10px] p-2.5 md:gap-1 md:rounded-control md:p-3.5",
    title: "text-sm md:text-base",
    detail: "text-xs md:text-[13px]",
  },
  md: {
    box: "gap-0.5 rounded-control p-3 md:gap-1 md:rounded-button md:p-4",
    title: "text-[15px] md:text-[17px]",
    detail: "text-[13px] md:text-sm",
  },
  lg: {
    box: "gap-0.5 rounded-[10px] p-3 md:gap-1 md:rounded-control md:p-4",
    title: "text-base md:text-lg",
    detail: "text-xs md:text-[13px]",
  },
};

type DiagramBoxProps = {
  eyebrow?: string | null;
  title: string;
  detail?: string | null;
  tone?: BoxTone;
  size?: BoxSize;
  centered?: boolean;
  className?: string;
  children?: ReactNode;
};

/** A box in a diagram: an optional small label, the name, an optional detail line, then any extras. */
export function DiagramBox({
  eyebrow = null,
  title,
  detail = null,
  tone = "surface",
  size = "md",
  centered = false,
  className = "",
  children,
}: DiagramBoxProps) {
  const toneStyle = TONES[tone];
  const sizeStyle = SIZES[size];
  return (
    <div className={`flex min-w-0 flex-col ${toneStyle.box} ${sizeStyle.box} ${centered ? "items-center text-center" : ""} ${className}`}>
      {eyebrow ? (
        <span className={`text-xs font-medium md:text-[13px] ${toneStyle.eyebrow}`}>
          <Rich text={eyebrow} />
        </span>
      ) : null}
      <span className={`leading-snug font-semibold ${sizeStyle.title}`}>
        <Rich text={title} />
      </span>
      {detail ? (
        <span className={`leading-snug ${sizeStyle.detail} ${toneStyle.detail}`}>
          <Rich text={detail} />
        </span>
      ) : null}
      {children}
    </div>
  );
}

/** A small muted label on a diagram, e.g. a group's name. */
export function DiagramLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`block text-xs text-muted md:text-[13px] ${className}`}>
      <Rich text={text} />
    </span>
  );
}

/**
 * A row of boxes joined into one line that drops into the next row. `drops` are the x positions in
 * percent of each box's centre; the bracket is symmetric, so it reads the same in both directions.
 */
export function FanIn({ drops, height = 28, className = "" }: { drops: readonly number[]; height?: number; className?: string }) {
  const first = Math.min(...drops);
  const last = Math.max(...drops);
  const middle = height / 2;
  return (
    <svg width="100%" height={height} aria-hidden="true" focusable="false" className={`block text-strong ${className}`}>
      {drops.map((x) => (
        <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2={middle} stroke="currentColor" strokeWidth="2" />
      ))}
      <line x1={`${first}%`} y1={middle} x2={`${last}%`} y2={middle} stroke="currentColor" strokeWidth="2" />
      <line x1="50%" y1={middle} x2="50%" y2={height} stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/** A small down chevron at the end of a line. */
export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="9" viewBox="0 0 14 9" aria-hidden="true" focusable="false" className={`mx-auto block shrink-0 text-strong ${className}`}>
      <path d="M1 1l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A short vertical line between two stacked boxes. */
export function Stem({ className = "h-3 md:h-4" }: { className?: string }) {
  return <span aria-hidden="true" className={`mx-auto block w-0.5 shrink-0 bg-strong ${className}`} />;
}

const COLUMNS = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" } as const;

/**
 * One vertical line under the centre of each column: rows of boxes hanging from the one above.
 * Pass `className` with a grid template when the columns are not equal.
 */
export function Drops({ count, className = "", lineClassName = "h-5 md:h-[22px]" }: { count: keyof typeof COLUMNS; className?: string; lineClassName?: string }) {
  return (
    <div aria-hidden="true" className={`grid ${COLUMNS[count]} ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className={`mx-auto block w-0.5 bg-strong ${lineClassName}`} />
      ))}
    </div>
  );
}

/** "A becomes B": points forward (right in English, left in Arabic), and down on phones when stacked. */
export function FlowArrow({ size = 36, stacked = true, className = "" }: { size?: number; stacked?: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex text-accent ${className}`}>
      {stacked ? (
        <svg
          width={Math.round(size * 0.78)}
          height={Math.round(size * 0.78)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          className="md:hidden"
        >
          <path d="M12 5v14m-7-7 7 7 7-7" />
        </svg>
      ) : null}
      <ArrowIcon size={size} className={stacked ? "hidden md:block" : ""} />
    </span>
  );
}

/** A labelled link between two boxes in a chain: a label, the line, a second label. */
export function Connector({ above, below, tone = "accent", className = "" }: { above: string; below: string; tone?: "accent" | "strong"; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 px-2.5 text-center ${className}`}>
      <DiagramLabel text={above} />
      <span aria-hidden="true" className={`block h-0.5 w-full ${tone === "accent" ? "bg-accent" : "bg-strong"}`} />
      <DiagramLabel text={below} />
    </div>
  );
}

export type ChipTone = "accent" | "outline" | "dashed" | "plain";

const CHIP_TONES: Record<ChipTone, string> = {
  accent: "bg-chip text-accent-ink",
  outline: "border border-line bg-page text-ink",
  dashed: "border border-dashed border-strong text-muted",
  plain: "text-ink",
};

/** A small rounded tag: a feature, a service, a portal. */
export function Chip({ text, tone = "accent", className = "" }: { text: string; tone?: ChipTone; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium md:text-[13px] ${CHIP_TONES[tone]} ${className}`}>
      <Rich text={text} />
    </span>
  );
}

/** A list of chips; `label` names the list for screen readers. */
export function ChipList({ items, label, tone = "accent", className = "" }: { items: readonly { text: string; tone?: ChipTone }[]; label?: string; tone?: ChipTone; className?: string }) {
  return (
    <ul aria-label={label} className={`m-0 flex list-none flex-wrap gap-1.5 p-0 md:gap-2 ${className}`}>
      {items.map((item) => (
        <li key={item.text} className="flex">
          <Chip text={item.text} tone={item.tone ?? tone} />
        </li>
      ))}
    </ul>
  );
}
