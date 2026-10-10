import { Rich } from "@/components/ui/Rich";
import { getWorkCopy } from "@/content/work";
import { OTHER_CLIENT_WORK } from "@/content/work/data";
import type { Locale } from "@/lib/i18n/locale";
import { asLatin } from "@/lib/rich/parse";

/** Small client projects without a case study: a divided list, name then what it is. */
export function OtherClientWork({ locale }: { locale: Locale }) {
  const { other } = getWorkCopy(locale);

  return (
    <div className="mt-8 lg:mt-12">
      <h3 className="border-b border-line pb-2.5 type-h3-row lg:pb-3">{other.title}</h3>
      <ul className="m-0 list-none p-0">
        {OTHER_CLIENT_WORK.map(({ id, brand }) => {
          const item = other.items[id];
          const name = item.name ?? asLatin(locale, brand ?? "");
          return (
            <li
              key={id}
              className="flex flex-col gap-0.5 border-b border-line py-3 leading-[1.25] md:grid md:grid-cols-[40%_minmax(0,1fr)] md:gap-0"
            >
              <span className="text-base font-semibold md:pe-4 md:text-[17px] ar:leading-[1.6] md:ar:leading-[1.8]">
                <Rich text={name} />
              </span>
              <span className="text-sm text-ink-2 md:text-base ar:leading-[1.6] md:ar:leading-[1.8]">{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
