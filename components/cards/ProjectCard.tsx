import { AnyLink } from "@/components/ui/AnyLink";
import { Rich } from "@/components/ui/Rich";
import type { ProjectCardData } from "@/content/projects";
import { ProjectMedia } from "./media/ProjectMedia";
import { StatusPill } from "./StatusPill";

/**
 * A project: media, title and status, what it is, the stack, and one link stretched over the whole
 * card. Hover, press and focus styles live in globals.css (`.project-card`).
 */
export function ProjectCard({ card }: { card: ProjectCardData }) {
  return (
    <article className="project-card relative flex flex-col gap-2.5 rounded-card-sm lg:gap-3.5 lg:rounded-card">
      <ProjectMedia slug={card.slug} media={card.media} />
      <div className="flex items-center justify-between gap-3">
        <h3
          className={`project-card__title type-h3-card ${card.hasTitleNote ? "[&_bdi]:text-[0.72em] [&_bdi]:font-medium" : ""}`}
        >
          <Rich text={card.title} />
        </h3>
        {card.status ? <StatusPill kind={card.status.kind} label={card.status.label} /> : null}
      </div>
      <p className="m-0 type-body text-ink-2">
        <Rich text={card.description} />
      </p>
      <p className="m-0 type-small text-muted">
        <bdi dir="ltr" lang="en">
          {card.stack}
        </bdi>
      </p>
      <AnyLink
        href={card.href}
        className="inline-flex min-h-11 items-center self-start text-[15px] font-semibold text-accent-ink after:absolute after:inset-0 after:content-[''] lg:text-base"
      >
        {card.linkLabel}
        {/* A leading space has to be its own text node, or the accessible name drops it. */}
        {card.linkSuffix.startsWith(" ") ? " " : null}
        <span className="sr-only">{card.linkSuffix.trimStart()}</span>
      </AnyLink>
    </article>
  );
}
