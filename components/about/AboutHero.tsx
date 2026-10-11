import portrait from "@/assets/images/portrait.png";
import { MirrorBlock } from "@/components/motion/MirrorBlock";
import { Img } from "@/components/ui/Img";
import { INTRO, PAGE_X } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { TextLink } from "@/components/ui/TextLink";
import type { AboutCopy } from "@/content/about";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { pageId } from "@/lib/ids";

/**
 * The title, the portrait and the introduction. One DOM order (title, portrait, text) serves both
 * layouts: stacked on phones, and from lg a grid that puts the portrait beside both, as tall as
 * the text column.
 */
export function AboutHero({ locale, copy }: { locale: Locale; copy: AboutCopy }) {
  const headingId = pageId("about", "title", locale);
  const links = [
    { href: localePath(locale, "/experience/"), label: copy.links.experience },
    { href: localePath(locale, "/work/fantasy-eg/"), label: copy.links.fantasy },
  ];

  return (
    <section aria-labelledby={headingId} className={`${PAGE_X} pt-8 lg:pt-18`}>
      <div className={`${INTRO} flex flex-col gap-[18px] lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-7`}>
        <h1 id={headingId} className="type-h1 lg:pt-2">
          {copy.title}
        </h1>
        <MirrorBlock name="about-portrait">
          <figure className="intro-scale relative m-0 h-95 overflow-hidden rounded-card-sm bg-tint lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-auto lg:min-h-150 lg:rounded-card">
            <Img
              src={portrait}
              alt={copy.portraitAlt}
              sizes="(min-width: 1024px) 480px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover object-bottom"
            />
          </figure>
        </MirrorBlock>
        <div className="flex flex-col gap-[18px] lg:gap-7">
          <div className="flex max-w-[640px] flex-col gap-[18px] lg:gap-5 ar:max-w-[720px]">
            {copy.intro.map((paragraph, index) => (
              <p key={paragraph} className={`m-0 ${index === 0 ? "type-lede text-ink" : "type-body-lg text-ink-2"}`}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
          <ul className="m-0 flex list-none flex-col border-t border-line p-0 lg:flex-row lg:flex-wrap lg:gap-x-7 lg:gap-y-2 lg:border-t-0">
            {links.map((link) => (
              <li key={link.href} className="flex border-b border-line lg:border-b-0">
                <TextLink href={link.href} className="min-h-13 w-full text-base lg:min-h-11 lg:w-auto lg:text-[17px]">
                  <Rich text={link.label} />
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
