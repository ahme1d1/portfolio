import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getContactCopy } from "@/content/contact";
import { getSiteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { ContactForm } from "./ContactForm";
import { ContactLinks } from "./ContactLinks";

/** Home's last section: the "Let's talk" band with the contact form in it. */
export function HomeContactBand({ locale }: { locale: Locale }) {
  const { band, form, reply } = getContactCopy(locale);
  const { social } = getSiteCopy(locale);
  const headingId = pageId("home", "contact", locale);

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <div data-reveal-style="scale" className="flex flex-col gap-4 rounded-panel-sm bg-surface px-4 py-6 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:rounded-panel lg:p-12">
        <div className="flex flex-col gap-4">
          <h2 id={headingId} className="type-h2">
            {band.title}
          </h2>
          <p className="m-0 type-body-lg text-ink-2">
            <Rich text={band.lede} />
          </p>
          <div className="mt-2 hidden lg:block">
            <ContactLinks labels={social} variant="column" />
          </div>
        </div>
        <ContactForm copy={form} reply={reply} label={form.label} />
        <div className="lg:hidden">
          <ContactLinks labels={social} variant="list" />
        </div>
      </div>
    </section>
  );
}
