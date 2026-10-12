import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectGrid } from "@/components/cards/ProjectGrid";
import { ButtonLink } from "@/components/ui/Button";
import { MB_HEAD, SECTION } from "@/components/ui/layout";
import { TextLink } from "@/components/ui/TextLink";
import { getHomeCopy } from "@/content/home";
import { getProjectCard, MAIN_PROJECT_SLUGS } from "@/content/projects";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { pageId } from "@/lib/ids";

/** The three main projects. "All work" sits beside the title on desktop and under the cards on phones. */
export function SelectedWork({ locale }: { locale: Locale }) {
  const { work } = getHomeCopy(locale);
  const headingId = pageId("home", "work", locale);
  const workPath = localePath(locale, "/work/");

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <div className={`${MB_HEAD} flex items-baseline justify-between gap-6`}>
        <h2 id={headingId} className="type-h2">
          {work.title}
        </h2>
        {/* The link's 44px target is 10px taller than its text above and below; the negative margin keeps it from pushing the cards down (the gap stays 24, measured in both languages). */}
        <div className="hidden lg:-my-2.5 lg:block">
          <TextLink href={workPath} variant="head">
            {work.all}
          </TextLink>
        </div>
      </div>
      <ProjectGrid>
        {MAIN_PROJECT_SLUGS.map((slug) => (
          <ProjectCard key={slug} card={getProjectCard(locale, slug)} />
        ))}
      </ProjectGrid>
      <div className="mt-5 lg:hidden">
        <ButtonLink href={workPath} variant="outline" size="md" block>
          {work.all}
        </ButtonLink>
      </div>
    </section>
  );
}
