import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getExperienceCopy } from "@/content/experience";
import { EDUCATION } from "@/content/experience/data";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { MetaLine } from "./MetaLine";

const COLUMN = "flex flex-col gap-4 md:gap-5";

/** Education and Languages: side by side from md, one after the other (56px apart) on phones. */
export function EducationLanguages({ locale }: { locale: Locale }) {
  const { education, languages } = getExperienceCopy(locale);
  const educationId = pageId("experience", "education", locale);
  const languagesId = pageId("experience", "languages", locale);

  return (
    <div className={`${SECTION} grid gap-14 md:grid-cols-2 md:gap-10`}>
      <section aria-labelledby={educationId} className={COLUMN}>
        <h2 id={educationId} className="type-h2">
          {education.title}
        </h2>
        <div className="flex flex-col gap-1.5 border-t border-line pt-4 md:pt-5">
          <MetaLine when={String(EDUCATION.year)} where={education.location} />
          <h3 className="type-h3-row">
            <Rich text={education.degree} />
          </h3>
          <p className="m-0 type-body text-ink-2">
            <Rich text={education.school} />
          </p>
        </div>
      </section>
      <section aria-labelledby={languagesId} className={COLUMN}>
        <h2 id={languagesId} className="type-h2">
          {languages.title}
        </h2>
        <dl className="m-0 border-b border-line">
          {languages.rows.map((row) => (
            <div
              key={row.term}
              className="flex flex-col gap-0.5 border-t border-line py-3.5 md:flex-row md:items-baseline md:justify-between md:gap-4 md:py-5"
            >
              <dt className="type-h3-label">
                <Rich text={row.term} />
              </dt>
              <dd className="m-0 type-body text-ink-2">
                <Rich text={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
