import { ArrowIcon } from "@/components/ui/icons";
import type { LeanLabels } from "@/content/projects";

const BAR = "rounded-md bg-line";

/** Page sections → the website builder: Lean Academy drawn in CSS (no dashboard screenshots). */
export function LeanMockup({ labels, className = "" }: { labels: LeanLabels; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`grid size-full grid-cols-[minmax(0,0.8fr)_24px_minmax(0,1.2fr)] items-center gap-2.5 bg-surface p-4 text-ink lg:p-6 ${className}`}
    >
      <span className="flex flex-col gap-2">
        {labels.sections.map((section) => (
          <span key={section} className="rounded-lg border border-line bg-page px-2.5 py-2 text-xs font-semibold text-ink-2">
            {section}
          </span>
        ))}
      </span>
      <ArrowIcon size={22} className="justify-self-center text-muted" />
      <span className="flex flex-col gap-2">
        <span className="flex flex-col gap-1.5 rounded-control border border-line bg-page p-2.5">
          <span className={`h-2 ${BAR}`} />
          <span className={`h-5 lg:h-6.5 ${BAR}`} />
          <span className="h-7 rounded-md bg-accent lg:h-[34px]" />
          <span className={`h-3 lg:h-[18px] ${BAR}`} />
        </span>
        <span className="text-xs font-semibold text-ink-2">{labels.result}</span>
      </span>
    </div>
  );
}
