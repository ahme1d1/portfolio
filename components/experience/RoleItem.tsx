import { Rich } from "@/components/ui/Rich";
import { TextLink } from "@/components/ui/TextLink";
import { getCompany } from "@/content/companies";
import { getExperienceCopy } from "@/content/experience";
import { ROLES, type RoleKey } from "@/content/experience/data";
import { formatMonthRange } from "@/lib/format/years";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { asLatin } from "@/lib/rich/parse";
import { MetaLine } from "./MetaLine";
import { RoleChips } from "./RoleChips";
import { RoleBullets, StackLine, TimelineDot, TimelineRule } from "./RoleParts";

type RoleItemProps = {
  locale: Locale;
  roleKey: RoleKey;
  /** The oldest role: no line runs on below its dot. */
  isLast: boolean;
};

/** One company on the timeline: dates, title with the company link, stack, bullets, then any sub-role and chips. */
export function RoleItem({ locale, roleKey, isLast }: RoleItemProps) {
  const copy = getExperienceCopy(locale);
  const role = copy.roles.items[roleKey];
  const data = ROLES[roleKey];
  const { url } = getCompany(locale, roleKey);
  const when = formatMonthRange(data.start, data.end, copy.months, copy.present);
  const subRole = role.subRole !== null && data.subRole !== null ? { ...role.subRole, stack: data.subRole.stack } : null;

  return (
    <li id={pageId("experience", data.anchor, locale)} className={`relative ps-6 md:ps-10 ${isLast ? "" : "pb-7 md:pb-8"}`}>
      {isLast ? null : <TimelineRule />}
      <TimelineDot isCurrent={data.end === null} />
      <MetaLine when={when} where={role.location} />
      <h3 className="mt-1.5 type-h3-row md:mt-2">
        <Rich text={role.title} />
        {copy.roles.separator}
        <TextLink href={url} variant="inline">
          <Rich text={role.company} />
        </TextLink>
      </h3>
      <StackLine locale={locale} stack={data.stack} />
      {role.lead === null ? null : (
        <p className="m-0 mt-2.5 max-w-[600px] type-body-lg text-ink md:mt-3">
          <Rich text={role.lead} />
        </p>
      )}
      <RoleBullets items={role.bullets} />
      {subRole === null ? null : (
        <>
          <h4 className="mt-5 type-h3-label md:mt-7">
            <Rich text={subRole.title} />
          </h4>
          <StackLine locale={locale} stack={subRole.stack} />
          <RoleBullets items={subRole.bullets} />
        </>
      )}
      <RoleChips
        groups={[
          { key: "projects", label: copy.roles.chips.projects, items: role.projects },
          { key: "dashboards", label: copy.roles.chips.dashboards, items: data.dashboards.map((name) => asLatin(locale, name)) },
        ]}
      />
    </li>
  );
}
