import { PAGE_X } from "@/components/ui/layout";
import { getExperienceCopy } from "@/content/experience";
import { ROLE_KEYS } from "@/content/experience/data";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { RoleItem } from "./RoleItem";

/** Roles, newest first, on a timeline. The first section: 56px below the hero in both languages. */
export function RoleTimeline({ locale }: { locale: Locale }) {
  const { roles } = getExperienceCopy(locale);
  const headingId = pageId("experience", "roles", locale);

  return (
    <section aria-labelledby={headingId} className={`${PAGE_X} pt-14`}>
      <h2 id={headingId} className="mb-6 type-h2 md:mb-7">
        {roles.title}
      </h2>
      <ol className="m-0 max-w-[796px] list-none p-0">
        {ROLE_KEYS.map((key, index) => (
          <RoleItem key={key} locale={locale} roleKey={key} isLast={index === ROLE_KEYS.length - 1} />
        ))}
      </ol>
    </section>
  );
}
