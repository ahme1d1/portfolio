import type { ProjectStatus } from "@/content/projects/data";

/** A project's status beside its title: Live (green, with a dot), In development, Ongoing. */
export function StatusPill({ kind, label, className = "" }: { kind: ProjectStatus; label: string; className?: string }) {
  if (kind === "live") {
    return (
      <span
        data-status={kind}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ok-bg px-2.5 py-1 text-[13px] font-medium whitespace-nowrap text-ok-ink ${className}`}
      >
        <span data-dot className="size-1.5 rounded-full bg-ok" />
        {label}
      </span>
    );
  }
  return (
    <span
      data-status={kind}
      className={`shrink-0 rounded-full border border-line px-2.5 py-1 text-[13px] whitespace-nowrap text-muted ${className}`}
    >
      {label}
    </span>
  );
}
