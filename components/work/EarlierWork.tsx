import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getCompany } from "@/content/companies";
import { getWorkCopy, type WorkCopy } from "@/content/work";
import { EARLIER_COMPANIES, EARLIER_WORK, type EarlierRow } from "@/content/work/data";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { asLatin } from "@/lib/rich/parse";

function projectName(locale: Locale, copy: WorkCopy["earlier"], row: EarlierRow): string {
  return "brand" in row ? asLatin(locale, row.brand) : copy.names[row.nameKey];
}

/** The CV's earlier projects: a table from 768px, lists grouped by company (with the years) on phones. */
export function EarlierWork({ locale }: { locale: Locale }) {
  const { earlier } = getWorkCopy(locale);
  const headingId = pageId("work", "earlier", locale);
  const cell = "py-3 pe-4 text-start align-top";

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <h2 id={headingId} className="type-h2">
        {earlier.title}
      </h2>
      <p className="m-0 mt-3 mb-4 type-body-lg text-ink-2 lg:mb-6">{earlier.lede}</p>

      <table className="hidden w-full border-collapse md:table">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="w-[46%] pe-4 pb-3 text-start text-[15px] font-medium text-muted">
              {earlier.headers.project}
            </th>
            <th scope="col" className="w-[30%] pe-4 pb-3 text-start text-[15px] font-medium text-muted ar:w-[27%]">
              {earlier.headers.type}
            </th>
            <th scope="col" className="pb-3 text-start text-[15px] font-medium text-muted">
              {earlier.headers.company}
            </th>
          </tr>
        </thead>
        <tbody>
          {EARLIER_WORK.map((row, index) => (
            <tr key={index} className="border-b border-line leading-[1.25] ar:leading-[1.8]">
              <th scope="row" className={`${cell} text-[17px] font-semibold`}>
                <Rich text={projectName(locale, earlier, row)} />
              </th>
              <td className={`${cell} text-base text-ink-2`}>{earlier.types[row.type]}</td>
              <td className="py-3 text-start align-top text-base text-ink-2">
                <Rich text={getCompany(locale, row.company).name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden">
        {EARLIER_COMPANIES.map((company, groupIndex) => {
          const { name, years } = getCompany(locale, company);
          return (
            <div key={company} className={groupIndex === 0 ? "mt-2" : "mt-7"}>
              <h3 className="flex items-baseline justify-between gap-3 border-b border-line pb-2.5 type-h3-row">
                <span>
                  <Rich text={name} />
                </span>{" "}
                <span className="text-sm font-normal text-muted tabular-nums">{years}</span>
              </h3>
              <ul className="m-0 list-none p-0">
                {EARLIER_WORK.filter((row) => row.company === company).map((row, index) => (
                  <li key={index} className="flex flex-col gap-0.5 border-b border-line py-3 leading-[1.25] ar:leading-[1.6]">
                    <span className="text-base font-semibold">
                      <Rich text={projectName(locale, earlier, row)} />
                    </span>
                    <span className="text-sm text-muted">{earlier.types[row.type]}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
