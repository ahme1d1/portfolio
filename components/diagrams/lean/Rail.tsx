/**
 * Phones only (the Mobile board): boxes stacked in one column hang off a line that runs down the end
 * side, with a short branch into the middle of each box. Render it inside every box of the column.
 * The box needs `group/rail relative` and a 1px border; the column needs `gap-2.5 pt-3 pe-6`. The
 * first box's line reaches up to the box above the column, the last one's stops at its middle.
 */
export function RailBranch() {
  return (
    <>
      <span
        aria-hidden="true"
        data-line=""
        className="absolute -end-[14px] -top-[11px] -bottom-px w-0.5 bg-strong group-first/rail:-top-[13px] group-last/rail:bottom-1/2 md:hidden"
      />
      <span aria-hidden="true" data-line="" className="absolute top-1/2 -end-[14px] -mt-px h-0.5 w-[14px] bg-strong md:hidden" />
    </>
  );
}

/** The column the boxes sit in: one column with the rail on phones, the given grid from `md` up. */
export const RAIL_COLUMN = "flex flex-col gap-2.5 pt-3 pe-6 md:grid md:p-0";
