import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import type { AboutCopy } from "@/content/about";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";

/** The title beside four divided rows from lg; stacked on phones. */
export function HowIWork({ locale, copy }: { locale: Locale; copy: AboutCopy["how"] }) {
  const headingId = pageId("about", "how", locale);
  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <h2 id={headingId} className="type-h2">
          {copy.title}
        </h2>
        <ul className="m-0 list-none border-b border-line p-0">
          {copy.items.map((item) => (
            <li key={item.title} className="flex flex-col gap-1.5 border-t border-line py-[18px] lg:gap-2 lg:py-6">
              <h3 className="type-h3-row">
                <Rich text={item.title} />
              </h3>
              <p className="m-0 max-w-[560px] type-body text-ink-2 ar:max-w-[520px]">
                <Rich text={item.body} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
