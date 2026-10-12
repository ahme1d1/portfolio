import { StatusPill } from "@/components/cards/StatusPill";
import { AnyLink } from "@/components/ui/AnyLink";
import { ButtonLink } from "@/components/ui/Button";
import { ExternalArrowIcon, LockIcon } from "@/components/ui/icons";
import { INTRO, PAGE_X } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import type { CaseSharedCopy } from "@/content/cases/shared";
import type { CaseCopy, CaseData } from "@/content/cases/types";
import type { ProjectCardData } from "@/content/projects";

type BreadcrumbProps = { label: string; workLabel: string; workHref: string; current: string };

/** "Work / Fantasy EG": the way back to Work, then this page. */
function Breadcrumb({ label, workLabel, workHref, current }: BreadcrumbProps) {
  return (
    <nav aria-label={label}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-2.5 p-0 text-sm lg:text-[15px]">
        <li>
          <AnyLink
            href={workHref}
            className="inline-flex min-h-11 min-w-11 items-center rounded-md text-muted underline underline-offset-4 transition-fast hover:text-ink ar:underline-offset-6"
          >
            {workLabel}
          </AnyLink>
        </li>
        <li aria-hidden="true" className="text-muted">
          /
        </li>
        <li>
          <span aria-current="page" className="font-medium text-ink">
            <Rich text={current} />
          </span>
        </li>
      </ol>
    </nav>
  );
}

type CaseHeaderProps = {
  titleId: string;
  title: string;
  copy: CaseCopy;
  shared: CaseSharedCopy;
  site: CaseData["site"];
  status: ProjectCardData["status"];
  work: { label: string; href: string };
};

/** Breadcrumb, status and role, the title, what it is, and the live site when there is one. */
export function CaseHeader({ titleId, title, copy, shared, site, status, work }: CaseHeaderProps) {
  return (
    <section aria-labelledby={titleId} className={`${PAGE_X} ${INTRO} flex flex-col gap-4 pt-3 lg:gap-5 lg:pt-8`}>
      <Breadcrumb label={shared.breadcrumbLabel} workLabel={work.label} workHref={work.href} current={title} />
      <div className="flex flex-wrap items-center gap-2.5 lg:gap-3.5">
        {status ? <StatusPill kind={status.kind} label={status.label} className="lg:px-3 lg:text-sm" /> : null}
        <span className="text-sm text-muted tabular-nums lg:text-[15px]">
          <Rich text={copy.meta} />
        </span>
      </div>
      <h1 id={titleId} className="type-h1">
        <Rich text={title} />
      </h1>
      <p className="m-0 max-w-[34em] type-lede text-ink-2">
        <Rich text={copy.lede} />
      </p>
      {copy.notice ? (
        <p className="m-0 flex max-w-[720px] items-start gap-2 text-sm text-muted lg:text-[15px]">
          <LockIcon size={16} className="mt-[calc((1lh-16px)/2)] shrink-0" />
          <span>
            <Rich text={copy.notice} />
          </span>
        </p>
      ) : null}
      {site ? (
        <div className="mt-1">
          <ButtonLink href={site.href} variant="cobalt" className="w-full lg:w-auto">
            <span>
              <Rich
                text={shared.visitSite}
                slots={{
                  site: (
                    <bdi dir="ltr" lang="en">
                      {site.label}
                    </bdi>
                  ),
                }}
              />
            </span>
            <ExternalArrowIcon size={18} />
          </ButtonLink>
        </div>
      ) : null}
    </section>
  );
}
