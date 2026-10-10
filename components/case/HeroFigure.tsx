import Image from "next/image";
import { CaseDiagram } from "@/components/diagrams/registry";
import { MirrorBlock } from "@/components/motion/MirrorBlock";
import { PAGE_X } from "@/components/ui/layout";
import type { CaseSlug } from "@/content/cases/slugs";
import type { CaseCopy, HeroData } from "@/content/cases/types";
import type { Locale } from "@/lib/i18n/locale";
import { plainText } from "@/lib/rich/parse";
import { BrowserFrame } from "./BrowserFrame";
import { FigureCaption } from "./CaseFigure";

/** The board stages: 1280 x 520 on desktop, 358 x 270 on a phone; positions are kept as percentages. */
const STAGE = "relative aspect-[358/270] overflow-hidden rounded-panel-sm bg-tint md:aspect-[1280/520] lg:rounded-panel";
const DESKTOP_SIZES = "(min-width: 1440px) 760px, (min-width: 768px) 57vw, 70vw";
const PHONE_SIZES = "(min-width: 1440px) 220px, (min-width: 768px) 17vw, 26vw";
const PHONES_SIZES = "(min-width: 768px) 212px, 100px";

type HeroProps = { slug: CaseSlug; hero: HeroData; alts: readonly string[]; locale: Locale };

function HeroStage({ slug, hero, alts, locale }: HeroProps) {
  const alt = (index: number) => plainText(alts[index] ?? "");
  switch (hero.kind) {
    case "browser":
      return (
        <div className={STAGE}>
          <MirrorBlock name={`case-${slug}-desktop`}>
            <div className="absolute start-[4.47%] top-[8.15%] w-[69.83%] md:start-[5%] md:top-[9.23%] md:w-[59.38%]">
              <BrowserFrame bar={hero.bar} image={hero.desktop} alt={alt(0)} sizes={DESKTOP_SIZES} size="hero" isLcp />
            </div>
          </MirrorBlock>
          <MirrorBlock name={`case-${slug}-phone`}>
            <div className="absolute end-[4.47%] top-[12.6%] z-10 w-[27.93%] md:end-[7.5%] md:top-[5.77%] md:w-[17.19%]">
              <Image
                src={hero.phone}
                alt={alt(1)}
                sizes={PHONE_SIZES}
                placeholder="blur"
                className="block h-auto w-full rounded-phone border-4 border-page shadow-card outline-1 -outline-offset-1 outline-img-line md:border-[6px]"
              />
            </div>
          </MirrorBlock>
        </div>
      );
    case "phones":
      return (
        <div className="flex h-[270px] items-start justify-center gap-3 overflow-hidden rounded-panel-sm bg-tint pt-5 md:h-[500px] md:gap-12 md:pt-6 lg:rounded-panel">
          {hero.images.map((image, index) => (
            <MirrorBlock key={image.src} name={`case-${slug}-screen-${index}`}>
              <Image
                src={image}
                alt={alt(index)}
                sizes={PHONES_SIZES}
                placeholder="blur"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
                className={`block h-auto w-[100px] rounded-control shadow-card outline-1 -outline-offset-1 outline-img-line md:w-[212px] md:rounded-card ${index === 1 ? "" : "mt-[18px] md:mt-6"}`}
              />
            </MirrorBlock>
          ))}
        </div>
      );
    case "diagram":
      return <CaseDiagram id={hero.figure} locale={locale} />;
  }
}

/** The case's main image under the title: the live site, the app's screens, or a drawing. */
export function HeroFigure({ slug, hero, copy, locale }: { slug: CaseSlug; hero: HeroData; copy: CaseCopy["hero"]; locale: Locale }) {
  return (
    <div className={`${PAGE_X} pt-7 lg:pt-12`}>
      <figure className="m-0 flex flex-col gap-2.5 lg:gap-3">
        <HeroStage slug={slug} hero={hero} alts={copy.alts} locale={locale} />
        <FigureCaption text={copy.caption} />
      </figure>
    </div>
  );
}
