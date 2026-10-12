import portrait from "@/assets/images/portrait.png";
import { MirrorBlock } from "@/components/motion/MirrorBlock";
import { Img } from "@/components/ui/Img";
import { GAP_HEAD, INTRO, PAGE_X } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import type { AboutCopy } from "@/content/about";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { AboutDoors } from "./AboutDoors";

/**
 * The title, the portrait, the introduction and the two doors. One DOM order (title, portrait,
 * text) serves both layouts: stacked on phones (the whole photo from 480 px, where a full-width card
 * would crop it), and from md a grid that puts the portrait beside both, as tall as the text column.
 */
export function AboutHero({ locale, copy }: { locale: Locale; copy: AboutCopy }) {
  const headingId = pageId("about", "title", locale);

  return (
    <section aria-labelledby={headingId} className={`${PAGE_X} pt-8 lg:pt-18`}>
      <div
        className={`${INTRO} flex flex-col ${GAP_HEAD} md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:grid-rows-[auto_1fr] md:gap-x-8 lg:gap-x-14`}
      >
        <h1 id={headingId} className="type-h1 lg:pt-2">
          {copy.title}
        </h1>
        <MirrorBlock name="about-portrait">
          <figure className="intro-scale relative m-0 h-95 overflow-hidden rounded-card-sm bg-tint md:col-start-2 md:row-span-2 md:row-start-1 md:h-auto md:min-h-110 lg:min-h-150 lg:rounded-card">
            <Img
              src={portrait}
              alt={copy.portraitAlt}
              sizes="(min-width: 1024px) 480px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover object-bottom min-[480px]:object-contain md:object-cover"
            />
          </figure>
        </MirrorBlock>
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex max-w-[640px] flex-col gap-4 lg:gap-5 ar:max-w-[680px]">
            {copy.intro.map((paragraph, index) => (
              <p key={paragraph} className={`m-0 ${index === 0 ? "type-lede text-ink" : "type-body-lg text-ink-2"}`}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
          <AboutDoors locale={locale} doors={copy.doors} />
        </div>
      </div>
    </section>
  );
}
