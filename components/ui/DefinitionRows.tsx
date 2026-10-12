import type { ReactNode } from "react";
import { ROW_Y } from "./layout";
import { Rich } from "./Rich";

export type DefinitionRow = {
  /** Copy markup is allowed (`{Fantasy EG}` in an Arabic term). */
  term: string;
  value: ReactNode;
  /** The row that matters most (Experience "Core") reads in the text colour, not the secondary one. */
  isEmphasis?: boolean;
};

type DefinitionRowsProps = {
  rows: readonly DefinitionRow[];
  /** label: a semibold term (Skills); muted: a quiet term before a larger value (About's quick facts). */
  term: "label" | "muted";
  /** The term column from md: narrow 180px, wide 220px (260px in Arabic, whose terms run longer). */
  termWidth: "narrow" | "wide";
  value?: "body" | "large";
  /** Two columns of rows from lg (About's quick facts); one column by default. */
  columns?: 1 | 2;
};

const COLUMNS = {
  narrow: "md:grid-cols-[180px_minmax(0,1fr)]",
  wide: "md:grid-cols-[220px_minmax(0,1fr)] ar:md:grid-cols-[260px_minmax(0,1fr)]",
} as const;

const TERM = {
  label: "type-h3-label",
  muted: "type-body text-muted",
} as const;

const VALUE = {
  body: "type-body max-w-[560px] ar:max-w-[520px]",
  large: "type-body-lg",
} as const;

/** A divided list of terms and values: side by side from md, stacked on phones; optionally two columns of rows from lg. */
export function DefinitionRows({ rows, term, termWidth, value = "body", columns = 1 }: DefinitionRowsProps) {
  const valueTone = (row: DefinitionRow) => (value === "large" || row.isEmphasis ? "text-ink" : "text-ink-2");
  return (
    // With an odd number of rows, the last one spans both columns so the bottom border still lines up.
    <dl
      className={`m-0 border-b border-line ${columns === 2 ? "lg:grid lg:grid-cols-2 lg:gap-x-14 lg:[&>div:last-child:nth-child(odd)]:col-span-2" : ""}`}
    >
      {rows.map((row) => (
        <div
          key={row.term}
          className={`flex flex-col gap-1 border-t border-line ${ROW_Y} md:grid md:items-baseline md:gap-8 ${COLUMNS[termWidth]}`}
        >
          <dt className={TERM[term]}>
            <Rich text={row.term} />
          </dt>
          <dd className={`m-0 ${VALUE[value]} ${valueTone(row)}`}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
