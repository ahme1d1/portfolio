import { ArrowIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";
import type { VodafoneLabels } from "@/content/projects";

/** One side of the drawing: a page made of blocks, the swapped-in React blocks in accent. */
function Page({ label, caption, isNew }: { label: string; caption: string; isNew: boolean }) {
  const swapped = isNew ? "bg-accent" : "bg-line";
  const block = "h-6.5 rounded-[5px] lg:h-[34px] lg:rounded-md";
  return (
    <span className="flex flex-col gap-1.5 lg:gap-2">
      <span className="text-xs font-semibold text-ink-2 lg:text-[13px]">
        <Rich text={label} />
      </span>
      <span className="flex flex-col gap-1 rounded-[10px] border border-line bg-page p-2 lg:gap-1.5 lg:rounded-control">
        <span className="h-[9px] rounded-[3px] bg-line lg:h-3 lg:rounded-sm" />
        <span className="grid grid-cols-2 gap-1 lg:gap-1.5">
          <span className={`${block} ${swapped}`} />
          <span className={`${block} bg-line`} />
        </span>
        <span className={`${block} ${swapped}`} />
        <span className="hidden text-xs whitespace-nowrap text-muted lg:block">
          <Rich text={caption} />
        </span>
      </span>
    </span>
  );
}

/** "Before → Now, still live": the migration drawn in CSS (the NDA rules out screenshots). */
export function VodafoneMockup({ labels, className = "" }: { labels: VodafoneLabels; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`grid size-full grid-cols-[minmax(0,1fr)_22px_minmax(0,1fr)] items-center gap-1.5 bg-surface p-3.5 text-ink lg:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)] lg:gap-1 lg:p-4 ${className}`}
    >
      <Page label={labels.before} caption={labels.beforeCaption} isNew={false} />
      <ArrowIcon size={28} className="size-[22px] text-muted lg:size-7" />
      <Page label={labels.after} caption={labels.afterCaption} isNew />
    </div>
  );
}
