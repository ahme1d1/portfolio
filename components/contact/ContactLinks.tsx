import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from "@/content/links";
import type { SiteCopy } from "@/content/site";

/**
 * column: Home band on desktop. list: the bands on phones, under a divider. inline: the
 * "Let's talk" band on desktop. Every link is labelled; none is an icon on its own.
 */
export type ContactLinksVariant = "column" | "list" | "inline";

const WRAPPER: Record<ContactLinksVariant, string> = {
  column: "flex flex-col gap-0.5",
  list: "flex flex-col border-t border-line pt-2",
  inline: "flex flex-wrap gap-x-5 gap-y-1",
};

const LINK: Record<ContactLinksVariant, string> = {
  column: "min-h-11 gap-3 text-base",
  list: "min-h-12 gap-3 text-[15px]",
  inline: "min-h-11 gap-2 text-[15px]",
};

export function ContactLinks({ labels, variant }: { labels: SiteCopy["social"]; variant: ContactLinksVariant }) {
  const iconSize = variant === "inline" ? 16 : 18;
  const links = [
    { href: `mailto:${EMAIL}`, label: EMAIL, isLatin: true, Icon: MailIcon },
    { href: WHATSAPP_URL, label: labels.whatsapp, isLatin: false, Icon: WhatsAppIcon },
    { href: LINKEDIN_URL, label: labels.linkedin, isLatin: true, Icon: LinkedInIcon },
    { href: GITHUB_URL, label: labels.github, isLatin: true, Icon: GitHubIcon },
  ];

  return (
    <ul className={`m-0 list-none p-0 ${WRAPPER[variant]}`}>
      {links.map(({ href, label, isLatin, Icon }) => (
        <li key={href} className="flex">
          <a
            href={href}
            className={`inline-flex items-center rounded-md text-ink decoration-[1.5px] underline-offset-4 transition-colors duration-150 ease-enter hover:text-accent-ink hover:underline ${LINK[variant]}`}
          >
            <Icon size={iconSize} />
            {isLatin ? (
              <bdi dir="ltr" lang="en">
                {label}
              </bdi>
            ) : (
              label
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
