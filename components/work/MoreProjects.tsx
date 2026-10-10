import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectGrid } from "@/components/cards/ProjectGrid";
import { SECTION } from "@/components/ui/layout";
import { MORE_PROJECT_SLUGS } from "@/content/cases/slugs";
import { getProjectCard } from "@/content/projects";
import { getWorkCopy } from "@/content/work";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { OtherClientWork } from "./OtherClientWork";

/** Client projects with their own case study, then the small ones without. No dates, no agency names. */
export function MoreProjects({ locale }: { locale: Locale }) {
  const { more } = getWorkCopy(locale);
  const headingId = pageId("work", "more", locale);

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <div className="mb-[18px] flex flex-col gap-1.5 lg:mb-6 lg:gap-2">
        <h2 id={headingId} className="type-h2">
          {more.title}
        </h2>
        <p className="m-0 max-w-[600px] type-body-lg text-ink-2">{more.lede}</p>
      </div>
      <ProjectGrid loose>
        {MORE_PROJECT_SLUGS.map((slug) => (
          <ProjectCard key={slug} card={getProjectCard(locale, slug)} />
        ))}
      </ProjectGrid>
      <OtherClientWork locale={locale} />
    </section>
  );
}
