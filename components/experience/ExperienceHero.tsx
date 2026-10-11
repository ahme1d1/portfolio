import { ButtonLink } from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/icons";
import { PAGE_X } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getExperienceCopy } from "@/content/experience";
import { CV_PATH } from "@/content/links";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { pageId } from "@/lib/ids";

/** Full width on phones, their own width beside the title from lg. */
const BUTTON = "w-full lg:w-auto";

/**
 * Title, lede, then the CV and Contact buttons. One DOM order: on phones they stack, from lg a grid
 * puts the buttons beside the title and a divider 40px under the lede.
 */
export function ExperienceHero({ locale }: { locale: Locale }) {
  const copy = getExperienceCopy(locale);
  const titleId = pageId("experience", "title", locale);

  return (
    <section aria-labelledby={titleId} className={`${PAGE_X} pt-8 lg:pt-18`}>
      <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-8 lg:gap-y-4 lg:border-b lg:border-line lg:pb-10">
        <h1 id={titleId} className="type-h1">
          {copy.title}
        </h1>
        <p className="m-0 max-w-[720px] type-lede text-ink-2 lg:col-span-2 lg:row-start-2">
          <Rich text={copy.lede} />
        </p>
        <div className="mt-1.5 flex flex-col gap-2.5 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:flex-row lg:gap-3">
          <ButtonLink href={CV_PATH} variant="black" size="lg" className={BUTTON}>
            <DownloadIcon size={18} />
            <span>
              <Rich text={copy.cv} />
            </span>
          </ButtonLink>
          <ButtonLink href={localePath(locale, "/contact/")} variant="outline" size="lg" className={BUTTON}>
            {copy.contact}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
