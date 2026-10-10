import { ButtonLink } from "@/components/ui/Button";
import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getHomeCopy } from "@/content/home";
import { contactHref } from "@/lib/contact/topics";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { pageId } from "@/lib/ids";

/**
 * Title, lede and buttons on the start side, the four services on the end side. On phones the
 * buttons follow the list; only the buttons can take focus, so the order stays the same for keys.
 */
export function ServicesPreview({ locale }: { locale: Locale }) {
  const { services } = getHomeCopy(locale);
  const headingId = pageId("home", "services", locale);

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <div className="grid [grid-template-areas:'intro'_'items'_'cta'] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-6 lg:[grid-template-areas:'intro_items'_'cta_items']">
        <div className="flex flex-col gap-3 [grid-area:intro] lg:gap-4">
          <h2 id={headingId} className="type-h2">
            {services.title}
          </h2>
          <p className="m-0 max-w-[720px] type-body-lg text-ink-2 ar:max-w-[600px]">
            <Rich text={services.lede} />
          </p>
        </div>
        <ul className="m-0 mt-4 list-none border-b border-line p-0 [grid-area:items] lg:mt-0">
          {services.items.map((item) => (
            <li key={item.title} className="flex flex-col gap-1 border-t border-line py-[18px] lg:gap-1.5 lg:py-6">
              <h3 className="type-h3-row">{item.title}</h3>
              <p className="m-0 max-w-[560px] type-body text-muted ar:max-w-[520px]">
                <Rich text={item.text} />
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-2.5 [grid-area:cta] lg:mt-0 lg:flex-row lg:flex-wrap lg:items-start lg:gap-3">
          <ButtonLink href={contactHref(locale, "project")} variant="cobalt" arrow="always" className="w-full lg:w-auto">
            {services.start}
          </ButtonLink>
          <ButtonLink href={localePath(locale, "/services/")} variant="outline" className="w-full lg:w-auto">
            {services.details}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
