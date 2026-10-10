import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectGrid } from "@/components/cards/ProjectGrid";
import { LetsTalkBand } from "@/components/contact/LetsTalkBand";
import { PAGE_X, SECTION } from "@/components/ui/layout";
import { getProjectCard, MAIN_PROJECT_SLUGS } from "@/content/projects";
import { getWorkCopy } from "@/content/work";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { EarlierWork } from "./EarlierWork";
import { MoreProjects } from "./MoreProjects";

/** The Work board (named "Projects" on the canvas), top to bottom. */
export function WorkView({ locale }: { locale: Locale }) {
  const copy = getWorkCopy(locale);
  const titleId = pageId("work", "title", locale);
  const mainId = pageId("work", "main", locale);

  return (
    <>
      <section aria-labelledby={titleId} className={`${PAGE_X} flex flex-col gap-3 pt-8 lg:gap-4 lg:pt-18`}>
        <h1 id={titleId} className="type-h1">
          {copy.title}
        </h1>
        <p className="m-0 max-w-[720px] type-lede text-ink-2">{copy.lede}</p>
      </section>
      <section aria-labelledby={mainId} className={SECTION}>
        <h2 id={mainId} className="mb-[18px] type-h2 lg:mb-6">
          {copy.main.title}
        </h2>
        <ProjectGrid>
          {MAIN_PROJECT_SLUGS.map((slug) => (
            <ProjectCard key={slug} card={getProjectCard(locale, slug)} />
          ))}
        </ProjectGrid>
      </section>
      <MoreProjects locale={locale} />
      <EarlierWork locale={locale} />
      <LetsTalkBand locale={locale} page="work" />
    </>
  );
}
