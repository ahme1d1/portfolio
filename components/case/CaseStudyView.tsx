import { LetsTalkBand } from "@/components/contact/LetsTalkBand";
import { PAGE_X } from "@/components/ui/layout";
import { getCaseCopy } from "@/content/cases";
import { CASE_DATA } from "@/content/cases/data";
import { getCaseSharedCopy } from "@/content/cases/shared";
import { nextCaseSlug, type CaseSlug } from "@/content/cases/slugs";
import { getProjectCard } from "@/content/projects";
import { PROJECTS } from "@/content/projects/data";
import { getSiteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { caseScope, pageId } from "@/lib/ids";
import { asLatin } from "@/lib/rich/parse";
import { BuiltSection } from "./BuiltSection";
import { CaseHeader } from "./CaseHeader";
import { CaseSection, Prose } from "./CaseSection";
import { FactsStrip } from "./FactsStrip";
import { HeroFigure } from "./HeroFigure";
import { NextCaseCard } from "./NextCaseCard";
import { DroppedPanel, MetricRows, RowList } from "./Rows";
import { ShotPair } from "./ShotPair";
import { SummaryPanel } from "./SummaryPanel";

/** One case study (the case-study template on the boards), top to bottom. */
export function CaseStudyView({ locale, slug }: { locale: Locale; slug: CaseSlug }) {
  const copy = getCaseCopy(locale, slug);
  const title = copy.title ?? asLatin(locale, PROJECTS[slug].brand);
  const data = CASE_DATA[slug];
  const shared = getCaseSharedCopy(locale);
  const { sections } = shared;
  const scope = caseScope(slug);
  const id = (part: string) => pageId(scope, part, locale);
  const work = getSiteCopy(locale).nav.items.find((item) => item.href === "/work/");
  if (!work) throw new Error("The site navigation has no Work item for the breadcrumb.");

  return (
    <>
      <CaseHeader
        titleId={id("title")}
        title={title}
        copy={copy}
        shared={shared}
        site={data.site}
        status={getProjectCard(locale, slug).status}
        work={{ label: work.label, href: localePath(locale, "/work/") }}
      />
      <HeroFigure slug={slug} hero={data.hero} copy={copy.hero} locale={locale} />
      <div className={`${PAGE_X} flex flex-col gap-7 pt-7 md:gap-14 lg:gap-32 lg:pt-10`}>
        <FactsStrip keys={data.facts} facts={copy.facts} stack={data.stack} labels={shared.facts} label={shared.factsLabel} />
        <SummaryPanel headingId={id("summary")} title={sections.summary} labels={shared.summary} summary={copy.summary} />
      </div>
      <CaseSection headingId={id("problem")} title={sections.problem}>
        {copy.problem.map((paragraph) => (
          <Prose key={paragraph} text={paragraph} />
        ))}
      </CaseSection>
      <CaseSection headingId={id("role")} title={sections.role}>
        <Prose text={copy.role.intro} />
        <RowList blocks={copy.role.items} heading="h3" />
        {data.roleShots && copy.role.shots ? <ShotPair slug={slug} shots={data.roleShots} copy={copy.role.shots} /> : null}
      </CaseSection>
      <BuiltSection headingId={id("built")} title={sections.built} built={copy.built} data={data.built} locale={locale} />
      <CaseSection headingId={id("hard")} title={sections.hard}>
        {copy.hard.intro ? <Prose text={copy.hard.intro} /> : null}
        <RowList blocks={copy.hard.items} heading="h3" />
        {copy.hard.dropped ? <DroppedPanel title={copy.hard.dropped.title} items={copy.hard.dropped.items} /> : null}
      </CaseSection>
      <CaseSection headingId={id("result")} title={sections.result}>
        {copy.result.paragraphs.map((paragraph) => (
          <Prose key={paragraph} text={paragraph} />
        ))}
        {copy.result.blocks ? <RowList blocks={copy.result.blocks} heading="h3" /> : null}
        <MetricRows metrics={copy.result.metrics} />
      </CaseSection>
      {copy.learned ? (
        <CaseSection headingId={id("learned")} title={sections.learned}>
          <RowList blocks={copy.learned} heading="h3" />
        </CaseSection>
      ) : null}
      <NextCaseCard
        card={getProjectCard(locale, nextCaseSlug(slug))}
        label={shared.next}
        labelId={id("next-label")}
        titleId={id("next-title")}
      />
      <LetsTalkBand locale={locale} page={scope} />
    </>
  );
}
