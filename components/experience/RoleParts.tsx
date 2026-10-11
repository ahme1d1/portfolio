import { Rich } from "@/components/ui/Rich";
import type { Locale } from "@/lib/i18n/locale";
import { asLatin } from "@/lib/rich/parse";

/** The muted stack under a role title: Latin, so a left-to-right run on Arabic pages. */
export function StackLine({ locale, stack }: { locale: Locale; stack: readonly string[] }) {
  return (
    <p className="m-0 mt-1.5 text-sm text-muted md:text-[15px]">
      <Rich text={asLatin(locale, stack.join(", "))} />
    </p>
  );
}

const BULLETS =
  "m-0 mt-3 flex max-w-[560px] list-disc flex-col gap-2 ps-5 type-body text-pretty text-ink-2 md:mt-3.5 ar:max-w-[520px]";

/** What the role involved, one bullet each; a `*bold lead-in*` reads in the text colour. */
export function RoleBullets({ items }: { items: readonly string[] }) {
  return (
    <ul className={BULLETS}>
      {items.map((item) => (
        <li key={item} className="ps-1">
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

/** The timeline's marker: filled accent for the current role, a hollow ring for past ones. */
export function TimelineDot({ isCurrent }: { isCurrent: boolean }) {
  const fill = isCurrent ? "bg-accent" : "border-2 border-strong bg-page";
  return (
    <span
      aria-hidden="true"
      data-dot={isCurrent ? "current" : "past"}
      className={`absolute start-0 top-1.5 size-2.5 rounded-full md:size-3 ${fill}`}
    />
  );
}

/** The line from under a dot down to the next one, centred on the dot (10px, 12px from md). */
export function TimelineRule() {
  return <span aria-hidden="true" className="absolute start-1 top-6 -bottom-1.5 w-0.5 bg-line md:start-[5px]" />;
}
