import { Rich } from "@/components/ui/Rich";

type BoxTextProps = {
  eyebrow: string;
  title: string;
  detail?: string | null;
  /** The eyebrow in the accent text colour (the one new component), muted otherwise. */
  isAccent?: boolean;
};

/** The text of a box on the Vodafone drawings: a small label, the name, an optional line under it. */
export function BoxText({ eyebrow, title, detail = null, isAccent = false }: BoxTextProps) {
  return (
    <span className="flex min-w-0 flex-col gap-0.5 md:gap-1">
      <span className={`text-xs font-medium md:text-[13px] ar:leading-relaxed ${isAccent ? "text-accent-ink" : "text-muted"}`}>
        <Rich text={eyebrow} />
      </span>
      <span className="text-base font-semibold md:text-[17px]">
        <Rich text={title} />
      </span>
      {detail ? (
        <span className="text-[13px] leading-[1.45] text-ink-2 md:text-sm md:leading-normal ar:leading-relaxed">
          <Rich text={detail} />
        </span>
      ) : null}
    </span>
  );
}
