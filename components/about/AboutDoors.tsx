import { GAP_ROW, ROW_Y } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { TextLink } from "@/components/ui/TextLink";
import type { AboutCopy } from "@/content/about";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";

type DoorLink = { href: string; label: string };
type Door = { title: string; body: string; links: readonly DoorLink[] };

/**
 * One door per audience, as divided rows: what a hiring manager needs, then what a client needs,
 * each with its own links (no CV link: the CV lives in the header and on Experience).
 */
export function AboutDoors({ locale, doors }: { locale: Locale; doors: AboutCopy["doors"] }) {
  const path = (href: string) => localePath(locale, href);
  const list: readonly Door[] = [
    {
      ...doors.hiring,
      links: [
        { href: path("/experience/"), label: doors.hiring.links.experience },
        { href: path("/work/vodafone-modernization/"), label: doors.hiring.links.vodafone },
      ],
    },
    {
      ...doors.project,
      links: [
        { href: path("/services/"), label: doors.project.links.services },
        { href: path("/work/fantasy-eg/"), label: doors.project.links.fantasy },
      ],
    },
  ];

  return (
    <div className="border-b border-line">
      {list.map((door) => (
        <div key={door.title} className={`flex flex-col ${GAP_ROW} border-t border-line ${ROW_Y}`}>
          <h2 className="type-h3-row">{door.title}</h2>
          <p className="m-0 max-w-[600px] type-body text-ink-2 ar:max-w-[640px]">
            <Rich text={door.body} />
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-x-7 p-0">
            {door.links.map((link) => (
              <li key={link.href} className="flex">
                <TextLink href={link.href} className="text-base lg:text-[17px]">
                  <Rich text={link.label} />
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
