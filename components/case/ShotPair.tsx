import Image from "next/image";
import { MirrorBlock } from "@/components/motion/MirrorBlock";
import type { CaseSlug } from "@/content/cases/slugs";
import type { RoleShots } from "@/content/cases/types";
import { plainText } from "@/lib/rich/parse";
import { BrowserFrame } from "./BrowserFrame";
import { CaseFigure } from "./CaseFigure";

const SIZES = "(min-width: 1360px) 590px, (min-width: 768px) 45vw, calc(100vw - 32px)";

type ShotPairProps = { slug: CaseSlug; shots: RoleShots; copy: { alts: readonly string[]; caption: string } };

/** Two screens from the work, side by side (stacked on phones): bare, or in small browser frames on a tint. */
export function ShotPair({ slug, shots, copy }: ShotPairProps) {
  const alt = (index: number) => plainText(copy.alts[index] ?? "");
  if (shots.frame === "bare") {
    return (
      <CaseFigure caption={copy.caption} panel="none" panelClassName="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5">
        {shots.shots.map((shot, index) => (
          <MirrorBlock key={shot.image.src} name={`case-${slug}-shot-${index}`}>
            <Image
              src={shot.image}
              alt={alt(index)}
              sizes={SIZES}
              placeholder="blur"
              className="block aspect-[1440/1064] h-auto w-full rounded-control border border-line object-cover object-top outline-1 -outline-offset-1 outline-img-line md:rounded-card-sm"
            />
          </MirrorBlock>
        ))}
      </CaseFigure>
    );
  }
  return (
    <CaseFigure caption={copy.caption} panel="tint" panelClassName="flex flex-col gap-4 md:grid md:grid-cols-2 md:items-start md:gap-7">
      {shots.shots.map((shot, index) => (
        <MirrorBlock key={shot.image.src} name={`case-${slug}-shot-${index}`}>
          <div>
            <BrowserFrame bar={shot.bar} image={shot.image} alt={alt(index)} sizes={SIZES} size="shot" />
          </div>
        </MirrorBlock>
      ))}
    </CaseFigure>
  );
}
