import { Rich } from "@/components/ui/Rich";
import { CHIP_STYLES, type ChipGroupKey, type ChipStyle } from "@/content/experience/data";

export type ChipGroup = { key: ChipGroupKey; label: string; items: readonly string[] };

const CHIP = "inline-flex min-h-8 items-center rounded-full px-3 py-1 text-sm text-ink-2";

const STYLES: Record<ChipStyle, string> = {
  filled: "bg-surface",
  outline: "border border-line",
};

/** "Selected projects" and "Admin dashboards": a label, then the names as pills. Empty groups are left out. */
export function RoleChips({ groups }: { groups: readonly ChipGroup[] }) {
  const shown = groups.filter((group) => group.items.length > 0);
  if (shown.length === 0) return null;
  return (
    <div className="mt-3.5 flex flex-col gap-3 md:mt-4">
      {shown.map((group) => {
        const style = CHIP_STYLES[group.key];
        return (
          <div key={group.key} className="flex flex-col gap-2">
            <p className="m-0 text-sm font-medium text-muted md:text-[15px]">
              <Rich text={group.label} />
            </p>
            <ul data-chips={style} className="m-0 flex list-none flex-wrap gap-1.5 p-0 md:gap-2">
              {group.items.map((item) => (
                <li key={item} className={`${CHIP} ${STYLES[style]}`}>
                  <Rich text={item} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
