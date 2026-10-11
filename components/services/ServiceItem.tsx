import { CheckIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";
import type { ServicesCopy } from "@/content/services";
import type { ServiceData, ServiceKey } from "@/content/services/data";
import type { Locale } from "@/lib/i18n/locale";
import { pairLinks } from "./href";
import { SeenIn } from "./SeenIn";

type ServiceLabels = Pick<ServicesCopy["what"], "getTitle" | "stackLabel" | "seenLabel">;

type ServiceItemProps = {
  locale: Locale;
  headingId: string;
  service: ServicesCopy["what"]["items"][ServiceKey];
  data: ServiceData;
  labels: ServiceLabels;
};

/** Running text in a row: 560px, 520px in Arabic. */
const TEXT_WIDTH = "max-w-[560px] ar:max-w-[520px]";

/** "What you get": a check before each item, centred on its first line. */
function GetList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0 lg:gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 type-body">
          <CheckIcon size={18} className="mt-[calc((1lh-18px)/2)] shrink-0 text-accent-ink" />
          <span>
            <Rich text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * One service as a divided row: what it is and its stack on the start side, what you get and where
 * it can be seen on the end side. On phones the two wrappers dissolve (`contents`) into one column
 * and CSS order moves the stack line below the list, as the mobile board has it.
 */
export function ServiceItem({ locale, headingId, service, data, labels }: ServiceItemProps) {
  const links = pairLinks(locale, service.seen, data.seen);

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-2.5 border-t border-line py-6 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:py-10"
    >
      <div className="contents lg:flex lg:flex-col lg:gap-3">
        <h3 id={headingId} className="type-h3-row">
          <Rich text={service.title} />
        </h3>
        <p className={`m-0 type-body text-ink-2 ${TEXT_WIDTH}`}>
          <Rich text={service.description} />
        </p>
        <p className="order-1 m-0 mt-1 type-small text-muted lg:order-none lg:mt-0">
          {labels.stackLabel}{" "}
          <bdi dir="ltr" lang="en">
            {data.stack.join(", ")}
          </bdi>
        </p>
      </div>
      <div className={`contents lg:flex lg:flex-col lg:gap-3 ${TEXT_WIDTH}`}>
        <h4 className="mt-1.5 type-h3-label lg:mt-0">{labels.getTitle}</h4>
        <GetList items={service.get} />
        <SeenIn label={labels.seenLabel} links={links} className="order-2 lg:order-none" />
      </div>
    </article>
  );
}
