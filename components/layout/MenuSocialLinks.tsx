import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from "@/content/links";
import type { SiteCopy } from "@/content/site";

/** The icon row at the bottom of the mobile menu; each link is named in the page's language. */
export function MenuSocialLinks({ labels }: { labels: SiteCopy["social"] }) {
  const links = [
    { href: GITHUB_URL, label: labels.github, Icon: GitHubIcon },
    { href: LINKEDIN_URL, label: labels.linkedin, Icon: LinkedInIcon },
    { href: WHATSAPP_URL, label: labels.whatsapp, Icon: WhatsAppIcon },
    { href: `mailto:${EMAIL}`, label: labels.email, Icon: MailIcon },
  ];

  return (
    <div className="flex justify-center gap-1 border-t border-line px-2.5 pt-4 pb-7">
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          aria-label={label}
          className="grid size-12 place-items-center rounded-control text-muted transition-colors duration-150 hover:text-ink"
        >
          <Icon size={22} />
        </a>
      ))}
    </div>
  );
}
