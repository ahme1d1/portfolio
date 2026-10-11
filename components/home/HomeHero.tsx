import portrait from "@/assets/images/portrait.png";
import { MirrorBlock } from "@/components/motion/MirrorBlock";
import { ButtonLink, ButtonPrefix } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import { INTRO, PAGE_X } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getHomeCopy } from "@/content/home";
import { getSiteCopy } from "@/content/site";
import { contactHref } from "@/lib/contact/topics";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { pageId } from "@/lib/ids";

function Availability({ text }: { text: string }) {
  return (
    <p className="m-0 inline-flex items-start gap-2 self-start rounded-2xl bg-ok-bg py-2 ps-3 pe-3.5 text-[13px] leading-[18px] font-medium text-ok-ink ar:leading-[22px] lg:items-center lg:self-auto lg:rounded-full lg:px-3 lg:py-1.5 lg:text-sm lg:leading-normal">
      <span className="mt-[5.5px] size-[7px] shrink-0 rounded-full bg-ok ar:mt-[7.5px] lg:mt-0" />
      <span className="text-balance">{text}</span>
    </p>
  );
}

/** Statement + proof: name, availability, one sentence, two doors, and the portrait (on top on phones). */
export function HomeHero({ locale }: { locale: Locale }) {
  const { hero } = getHomeCopy(locale);
  const { name } = getSiteCopy(locale);
  const headingId = pageId("home", "intro", locale);
  const buttonWidth = "w-full lg:w-auto";

  return (
    <section aria-labelledby={headingId} className={`${PAGE_X} pt-8 lg:pt-18`}>
      <div className="flex flex-col gap-[18px] lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-14">
        <div className={`${INTRO} flex flex-col gap-[18px] lg:gap-8 lg:pt-1`}>
          <div className="flex flex-col gap-[18px] lg:flex-row lg:flex-wrap lg:items-center lg:gap-4">
            <p className="m-0 flex flex-col gap-0.5">
              <span className="text-base leading-[1.25] font-semibold lg:text-lg">{name}</span>
              <span className="text-sm leading-[1.25] text-ink-2 lg:text-base">{hero.role}</span>
            </p>
            <Availability text={hero.availability} />
          </div>
          <h1 id={headingId} className="max-w-[720px] type-h1-hero">
            <Rich text={hero.title} />
          </h1>
          <div className="flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:gap-3">
            <ButtonLink href={localePath(locale, "/experience/")} variant="black" arrow="desktop" className={buttonWidth}>
              <ButtonPrefix variant="black">{hero.hiring.prefix}</ButtonPrefix> {hero.hiring.label}
            </ButtonLink>
            <ButtonLink href={contactHref(locale, "project")} variant="cobalt" arrow="desktop" className={buttonWidth}>
              <ButtonPrefix variant="cobalt">{hero.project.prefix}</ButtonPrefix> {hero.project.label}
            </ButtonLink>
          </div>
        </div>
        <MirrorBlock name="portrait">
          <figure className="intro-scale order-first m-0 h-70 overflow-hidden rounded-card-sm bg-tint md:h-100 lg:order-none lg:h-130 lg:rounded-card">
            <Img
              src={portrait}
              alt={hero.portraitAlt}
              sizes="(min-width: 1024px) 600px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="size-full object-cover object-top lg:object-bottom"
            />
          </figure>
        </MirrorBlock>
      </div>
    </section>
  );
}
