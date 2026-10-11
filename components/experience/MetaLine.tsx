import { Rich } from "@/components/ui/Rich";

type MetaLineProps = {
  /** "Jan 2024 – present", or a year. */
  when: string;
  where: string;
};

/**
 * The muted line above a role or a degree: when at the start, where at the end. Its line height is
 * fixed (22px, 24px from md) so the timeline dot centres on it. The space between the two spans is
 * not drawn in a flex row, but keeps "present Egypt" apart for screen readers.
 */
export function MetaLine({ when, where }: MetaLineProps) {
  return (
    <p className="m-0 flex flex-wrap items-baseline justify-between gap-x-3 text-sm leading-[22px] text-muted md:gap-x-4 md:text-[15px] md:leading-6">
      <span className="tabular-nums">{when}</span>{" "}
      <span>
        <Rich text={where} />
      </span>
    </p>
  );
}
