import { INTRO, PAGE_X } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getContactCopy } from "@/content/contact";
import { getSiteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { ContactForm } from "./ContactForm";
import { ContactLinks } from "./ContactLinks";

/**
 * The Contact page: the form in a panel, and the direct links beside it on desktop (rows with
 * their values) or under it on phones (the band's list). The two link groups are responsive
 * variants of one block, so only the desktop one carries an id.
 */
export function ContactView({ locale }: { locale: Locale }) {
  const { page, band, form, reply } = getContactCopy(locale);
  const { social } = getSiteCopy(locale);
  const headingId = pageId("contact", "title", locale);
  const directId = pageId("contact", "direct", locale);

  return (
    <section aria-labelledby={headingId} className={`${PAGE_X} pt-8 lg:pt-18`}>
      <div className={`${INTRO} flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-18`}>
        <div className="flex flex-col gap-3.5 lg:gap-6">
          <h1 id={headingId} className="type-h1">
            {page.title}
          </h1>
          <p className="m-0 max-w-[720px] type-lede text-ink-2">
            <Rich text={band.lede} />
          </p>
          <section aria-labelledby={directId} className="mt-6 hidden lg:block">
            <h2 id={directId} className="mb-3 type-h2-panel">
              {page.directTitle}
            </h2>
            <ContactLinks labels={social} variant="rows" whatsappValue={page.whatsappValue} />
          </section>
        </div>
        <div className="flex min-w-0 flex-col gap-14">
          <div className="rounded-panel-sm bg-surface px-4 py-6 lg:rounded-panel lg:p-10">
            <ContactForm
              copy={form}
              reply={reply}
              label={form.label}
              title={form.title}
              linkTopic
              sentHeadingLevel={2}
            />
          </div>
          <div className="flex flex-col gap-3 lg:hidden">
            <h2 className="type-h2-panel">{page.directTitle}</h2>
            <ContactLinks labels={social} variant="divided" />
          </div>
        </div>
      </div>
    </section>
  );
}
