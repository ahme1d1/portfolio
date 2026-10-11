import { ButtonLink, ButtonPrefix } from "@/components/ui/Button";
import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { getContactCopy } from "@/content/contact";
import { getSiteCopy } from "@/content/site";
import { contactHref } from "@/lib/contact/topics";
import type { Locale } from "@/lib/i18n/locale";
import { pageId, type PageKey } from "@/lib/ids";
import { ContactLinks } from "./ContactLinks";
import { ReplyNote } from "./ReplyNote";

type Door = { href: string; variant: "black" | "cobalt"; prefix: string; label: string };

/** Desktop doors: label start, arrow end. Phones: centred, no arrow, as the mobile boards draw them. */
function Doors({ doors, isMobile }: { doors: readonly Door[]; isMobile: boolean }) {
  return (
    <div className={isMobile ? "mt-1 flex flex-col gap-2.5 lg:hidden" : "hidden min-w-[340px] flex-col gap-3 lg:flex"}>
      {doors.map((door) =>
        isMobile ? (
          <ButtonLink key={door.href} href={door.href} variant={door.variant} block>
            <ButtonPrefix variant={door.variant}>{door.prefix}</ButtonPrefix> {door.label}
          </ButtonLink>
        ) : (
          <ButtonLink key={door.href} href={door.href} variant={door.variant} spread arrow="always">
            <span>
              <ButtonPrefix variant={door.variant}>{door.prefix}</ButtonPrefix> {door.label}
            </span>
          </ButtonLink>
        ),
      )}
    </div>
  );
}

type LetsTalkBandProps = {
  locale: Locale;
  page: PageKey;
  /** Services asks about the product instead of the role. */
  lede?: string;
};

/** The "Let's talk" band at the end of every page except Home (form) and Contact. */
export function LetsTalkBand({ locale, page, lede }: LetsTalkBandProps) {
  const { band, reply } = getContactCopy(locale);
  const { social } = getSiteCopy(locale);
  const headingId = pageId(page, "talk", locale);
  const doors: Door[] = [
    { href: contactHref(locale, "role"), variant: "black", ...band.hiring },
    { href: contactHref(locale, "project"), variant: "cobalt", ...band.project },
  ];

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <div data-reveal-style="scale" className="flex flex-col gap-3.5 rounded-panel-sm bg-surface px-4 py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:rounded-panel lg:p-10">
        <div className="flex flex-col gap-3.5 lg:gap-3">
          <h2 id={headingId} className="type-h2">
            {band.title}
          </h2>
          <p className="m-0 type-body-lg text-ink-2">
            <Rich text={lede ?? band.lede} />
          </p>
          <div className="hidden flex-col gap-1 lg:flex">
            <ReplyNote text={reply} className="text-[15px]" />
            <ContactLinks labels={social} variant="inline" />
          </div>
        </div>
        <Doors doors={doors} isMobile={false} />
        <Doors doors={doors} isMobile />
        <div className="flex flex-col gap-3.5 lg:hidden">
          <ReplyNote text={reply} className="justify-center text-sm" />
          <ContactLinks labels={social} variant="list" />
        </div>
      </div>
    </section>
  );
}
