import Image from "next/image";
import { MirrorBlock } from "@/components/motion/MirrorBlock";
import type { CardMedia } from "@/content/projects";
import type { CaseSlug } from "@/content/cases/slugs";
import { LeanMockup } from "./LeanMockup";
import { PhonePair } from "./PhonePair";
import { VodafoneMockup } from "./VodafoneMockup";

/** A card is a third of the content width on desktop, half at tablet width, the full width on phones. */
export const CARD_SIZES = "(min-width: 1024px) 411px, (min-width: 768px) calc(50vw - 28px), calc(100vw - 32px)";

/** The class the card's hover grows a little inside the frame. */
const GROWS = "project-card__media";

function MediaContent({ media }: { media: CardMedia }) {
  switch (media.kind) {
    case "image":
      return (
        <Image
          src={media.image}
          alt={media.alt}
          sizes={CARD_SIZES}
          placeholder="blur"
          className={`${GROWS} size-full object-cover object-top`}
        />
      );
    case "phones":
      return <PhonePair images={media.images} className={GROWS} />;
    case "vodafone":
      return <VodafoneMockup labels={media.labels} className={GROWS} />;
    case "lean":
      return <LeanMockup labels={media.labels} className={GROWS} />;
  }
}

/** The 16:10 frame at the top of a project card; it moves to its mirrored place on the language switch. */
export function ProjectMedia({ slug, media }: { slug: CaseSlug; media: CardMedia }) {
  return (
    <MirrorBlock name={`project-${slug}`}>
      <div className="aspect-[16/10] overflow-hidden rounded-card-sm bg-surface outline-1 -outline-offset-1 outline-img-line lg:rounded-card">
        <MediaContent media={media} />
      </div>
    </MirrorBlock>
  );
}
