import { ButtonLink } from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/icons";
import { GAP_ROW, MB_HEAD, ROW_Y, SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { TextLink } from "@/components/ui/TextLink";
import { getCompany, type CompanyKey } from "@/content/companies";
import { getHomeCopy, type HomeCopy } from "@/content/home";
import { CV_PATH } from "@/content/links";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { pageId } from "@/lib/ids";

const ROWS: readonly CompanyKey[] = ["vois", "evaPharma", "baianat"];

function Row({ locale, company, copy }: { locale: Locale; company: CompanyKey; copy: HomeCopy["experience"] }) {
  const { name, url, years } = getCompany(locale, company);
  const row = copy.rows[company];
  return (
    <li className={`flex flex-col gap-1.5 border-t border-line ${ROW_Y} md:grid md:grid-cols-[200px_minmax(0,1fr)] md:items-baseline md:gap-8`}>
      <p className="m-0 text-sm text-muted tabular-nums md:text-base">{years}</p>
      <div className={`flex flex-col ${GAP_ROW}`}>
        <h3 className="type-h3-row">
          {row.role}
          {copy.separator}
          <TextLink href={url} variant="inline">
            <Rich text={name} />
          </TextLink>
        </h3>
        <p className="m-0 max-w-[560px] type-body text-ink-2 ar:max-w-[520px]">
          <Rich text={row.summary} />
        </p>
      </div>
    </li>
  );
}

/** Three roles as a divided list, with the full page and the CV beside the title (under it on phones). */
export function ExperiencePreview({ locale }: { locale: Locale }) {
  const { experience } = getHomeCopy(locale);
  const headingId = pageId("home", "experience", locale);
  const experiencePath = localePath(locale, "/experience/");
  const cvLabel = (
    <span>
      <Rich text={experience.cv} />
    </span>
  );

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <div className={`${MB_HEAD} flex items-end justify-between gap-6`}>
        <h2 id={headingId} className="type-h2">
          {experience.title}
        </h2>
        <div className="hidden items-center gap-3 lg:flex">
          <TextLink href={experiencePath} variant="head" className="px-1.5">
            {experience.all}
          </TextLink>
          <ButtonLink href={CV_PATH} variant="black" size="md">
            <DownloadIcon size={16} />
            {cvLabel}
          </ButtonLink>
        </div>
      </div>
      <ul className="m-0 list-none border-b border-line p-0">
        {ROWS.map((company) => (
          <Row key={company} locale={locale} company={company} copy={experience} />
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-1.5 lg:hidden">
        <ButtonLink href={CV_PATH} variant="black" block>
          <DownloadIcon size={18} />
          {cvLabel}
        </ButtonLink>
        <TextLink href={experiencePath} variant="head" className="h-[50px] justify-center">
          {experience.all}
        </TextLink>
      </div>
    </section>
  );
}
