import { ButtonLink } from "@/components/ui/Button";
import { INTRO, PAGE_X } from "@/components/ui/layout";
import type { ServicesCopy } from "@/content/services";
import { contactHref } from "@/lib/contact/topics";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { pageId } from "@/lib/ids";

type ServicesHeroProps = { locale: Locale; copy: ServicesCopy["hero"] };

/** Title, lede and two doors: a project (cobalt, with the arrow) and the work. Full width on phones. */
export function ServicesHero({ locale, copy }: ServicesHeroProps) {
  const titleId = pageId("services", "title", locale);
  const buttonWidth = "w-full lg:w-auto";

  return (
    <section aria-labelledby={titleId} className={`${PAGE_X} ${INTRO} flex flex-col gap-4 pt-8 lg:gap-6 lg:pt-18`}>
      <h1 id={titleId} className="type-h1">
        {copy.title}
      </h1>
      <p className="m-0 max-w-[34em] type-lede text-ink-2">{copy.lede}</p>
      <div className="flex flex-col gap-2.5 lg:mt-2 lg:flex-row lg:flex-wrap lg:gap-3">
        <ButtonLink href={contactHref(locale, "project")} variant="cobalt" arrow="always" className={buttonWidth}>
          {copy.start}
        </ButtonLink>
        <ButtonLink href={localePath(locale, "/work/")} variant="outline" className={buttonWidth}>
          {copy.work}
        </ButtonLink>
      </div>
    </section>
  );
}
