import { DefinitionRows, type DefinitionRow } from "@/components/ui/DefinitionRows";
import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getExperienceCopy } from "@/content/experience";
import { EMPHASIS_SKILL, SKILL_KEYS } from "@/content/experience/data";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";

/** Eight rows of skills, term beside value from md; "Core" reads in the text colour. */
export function SkillsSection({ locale }: { locale: Locale }) {
  const { skills } = getExperienceCopy(locale);
  const headingId = pageId("experience", "skills", locale);
  const rows: DefinitionRow[] = SKILL_KEYS.map((key) => ({
    term: skills.rows[key].term,
    value: <Rich text={skills.rows[key].value} />,
    isEmphasis: key === EMPHASIS_SKILL,
  }));

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <h2 id={headingId} className="mb-4 type-h2 md:mb-7">
        {skills.title}
      </h2>
      <DefinitionRows rows={rows} term="label" termWidth="wide" />
    </section>
  );
}
