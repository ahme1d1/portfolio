import { MediaContent } from "@/components/cards/media/ProjectMedia";
import { MirrorBlock } from "@/components/motion/MirrorBlock";
import { AnyLink } from "@/components/ui/AnyLink";
import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import type { CardMedia, ProjectCardData } from "@/content/projects";

/** The card names the case already, so its images are decorative here. */
function withoutAlt(media: CardMedia): CardMedia {
  switch (media.kind) {
    case "image":
      return { ...media, alt: "" };
    case "phones":
      return { ...media, images: media.images.map((phone) => ({ ...phone, alt: "" })) };
    default:
      return media;
  }
}

type NextCaseCardProps = { card: ProjectCardData; label: string; labelId: string; titleId: string };

/**
 * The last block of every case study (Interactions board): one link over the whole card, named by
 * its label and title. Hover fills it and underlines the title; a press scales it to 0.98.
 */
export function NextCaseCard({ card, label, labelId, titleId }: NextCaseCardProps) {
  return (
    <div className={SECTION}>
      <AnyLink
        href={card.href}
        aria-labelledby={`${labelId} ${titleId}`}
        className="group flex flex-col gap-2.5 rounded-[32px] border border-line p-4 text-ink transition-fast hover:border-strong hover:bg-surface active:scale-[0.98] active:border-strong active:bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-center md:gap-10 md:rounded-panel md:p-8 lg:grid-cols-[minmax(0,1fr)_380px]"
      >
        <div className="flex flex-col gap-2.5 md:gap-3 ar:md:gap-2.5">
          <span id={labelId} className="mt-1.5 text-sm font-medium text-muted md:mt-0 md:text-base">
            {label}
          </span>
          <span
            id={titleId}
            className={`text-[26px] leading-[1.05] font-semibold tracking-[-0.02em] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[5px] group-active:underline group-active:decoration-2 group-active:underline-offset-[5px] md:text-[40px] md:tracking-[-0.03em] ar:leading-[1.3] ar:font-bold ar:tracking-normal ${card.hasTitleNote ? "[&_bdi]:text-[0.72em] [&_bdi]:font-medium" : ""}`}
          >
            <Rich text={card.title} />
          </span>
          <span className="block max-w-[560px] type-body text-ink-2">
            <Rich text={card.description} />
          </span>
          <span className="block type-small text-muted">
            <bdi dir="ltr" lang="en">
              {card.stack}
            </bdi>
          </span>
        </div>
        <MirrorBlock name={`project-${card.slug}`}>
          <div className="h-40 overflow-hidden rounded-card-sm bg-tint max-md:order-first md:h-[190px] md:rounded-card">
            <MediaContent media={withoutAlt(card.media)} sizes="(min-width: 768px) 380px, calc(100vw - 64px)" variant="next" />
          </div>
        </MirrorBlock>
      </AnyLink>
    </div>
  );
}
