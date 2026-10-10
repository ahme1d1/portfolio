import { CaseDiagram } from "@/components/diagrams/registry";
import { Rich } from "@/components/ui/Rich";
import type { CaseCopy, CaseData } from "@/content/cases/types";
import type { Locale } from "@/lib/i18n/locale";
import { CaseSection, Prose } from "./CaseSection";
import { BlockGrid, RowList } from "./Rows";

type BuiltSectionProps = {
  headingId: string;
  title: string;
  built: CaseCopy["built"];
  data: CaseData["built"];
  locale: Locale;
};

/**
 * "How I built it": the lead-in, the architecture figure, then each group. A group without a heading
 * shows its decisions in two columns (Fantasy EG); a titled group lists them as rows under an h3.
 */
export function BuiltSection({ headingId, title, built, data, locale }: BuiltSectionProps) {
  return (
    <CaseSection headingId={headingId} title={title}>
      <Prose text={built.intro} />
      <CaseDiagram id={data.figure} locale={locale} />
      {built.groups.map((group, index) => {
        const figure = data.groups[index]?.figure ?? null;
        return (
          <div key={group.title ?? index} className="contents">
            {group.title ? (
              <h3 className="mt-2 type-h3-card lg:mt-4">
                <Rich text={group.title} />
              </h3>
            ) : null}
            {group.intro ? <Prose text={group.intro} /> : null}
            {figure ? <CaseDiagram id={figure} locale={locale} /> : null}
            {group.blocks ? (
              group.title ? (
                <RowList blocks={group.blocks} heading="h4" />
              ) : (
                <BlockGrid blocks={group.blocks} heading="h3" />
              )
            ) : null}
          </div>
        );
      })}
    </CaseSection>
  );
}
