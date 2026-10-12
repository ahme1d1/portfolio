import { MB_HEAD, SECTION } from "@/components/ui/layout";
import type { ServicesCopy } from "@/content/services";
import { SERVICE_DATA, SERVICE_KEYS } from "@/content/services/data";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { ServiceItem } from "./ServiceItem";

/** "What I do": the four services as divided rows, each an article named by its title. */
export function ServiceList({ locale, copy }: { locale: Locale; copy: ServicesCopy["what"] }) {
  const headingId = pageId("services", "what", locale);
  const labels = { getTitle: copy.getTitle, stackLabel: copy.stackLabel, seenLabel: copy.seenLabel };

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <h2 id={headingId} className={`${MB_HEAD} type-h2`}>
        {copy.title}
      </h2>
      <div className="border-b border-line">
        {SERVICE_KEYS.map((key) => (
          <ServiceItem
            key={key}
            locale={locale}
            headingId={pageId("services", `service-${key}`, locale)}
            service={copy.items[key]}
            data={SERVICE_DATA[key]}
            labels={labels}
          />
        ))}
      </div>
    </section>
  );
}
