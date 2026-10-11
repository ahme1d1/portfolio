import type { ComponentType } from "react";
import { GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon, type IconProps } from "@/components/ui/icons";
import { EMAIL, GITHUB_HANDLE, GITHUB_URL, LINKEDIN_HANDLE, LINKEDIN_URL, WHATSAPP_URL } from "@/content/links";
import type { SiteCopy } from "@/content/site";

/**
 * column: Home band on desktop. list: the bands on phones, under a divider. inline: the "Let's
 * talk" band on desktop. rows: Contact on desktop, a label and a muted value on each row.
 * divided: Contact on phones, a line under each link.
 * Every link is labelled; none is an icon on its own.
 */
export type ContactLinksVariant = "column" | "list" | "inline" | "rows" | "divided";

type ContactLinksProps = {
  labels: SiteCopy["social"];
  variant: ContactLinksVariant;
  /** What the WhatsApp row says beside its name ("Message me"); rows only. */
  whatsappValue?: string;
};

type Channel = {
  href: string;
  /** The link's text in the bands; on rows, `name` and `value` sit side by side. */
  label: string;
  name: string;
  value: string;
  Icon: ComponentType<IconProps>;
};

const WRAPPER: Record<ContactLinksVariant, string> = {
  column: "flex flex-col gap-0.5",
  list: "flex flex-col border-t border-line pt-2",
  inline: "flex flex-wrap gap-x-5 gap-y-1",
  rows: "flex flex-col border-b border-line",
  divided: "flex flex-col",
};

const LINK: Record<Exclude<ContactLinksVariant, "rows">, string> = {
  column: "min-h-11 gap-3 rounded-md text-base",
  list: "min-h-12 gap-3 rounded-md text-[15px]",
  inline: "min-h-11 gap-2 rounded-md text-[15px]",
  divided: "min-h-13 w-full gap-3 border-b border-line text-base",
};

const HOVER = "transition-colors duration-150 ease-enter hover:text-accent-ink";

/** Latin text (the address, the handles, the brand names) in an Arabic page reads left to right. */
function Text({ text }: { text: string }) {
  return /[؀-ۿ]/.test(text) ? (
    <>{text}</>
  ) : (
    <bdi dir="ltr" lang="en">
      {text}
    </bdi>
  );
}

function channels(labels: SiteCopy["social"], whatsappValue: string): readonly Channel[] {
  return [
    { href: `mailto:${EMAIL}`, label: EMAIL, name: labels.email, value: EMAIL, Icon: MailIcon },
    { href: WHATSAPP_URL, label: labels.whatsapp, name: labels.whatsapp, value: whatsappValue, Icon: WhatsAppIcon },
    { href: LINKEDIN_URL, label: labels.linkedin, name: labels.linkedin, value: LINKEDIN_HANDLE, Icon: LinkedInIcon },
    { href: GITHUB_URL, label: labels.github, name: labels.github, value: GITHUB_HANDLE, Icon: GitHubIcon },
  ];
}

function Row({ channel }: { channel: Channel }) {
  const { href, name, value, Icon } = channel;
  return (
    <a
      href={href}
      className={`group flex min-h-14 w-full items-center gap-3.5 border-t border-line text-ink decoration-[1.5px] underline-offset-4 ${HOVER}`}
    >
      <Icon size={18} />
      <span className="text-base font-semibold group-hover:underline">
        <Text text={name} />
      </span>{" "}
      <span className="ms-auto text-[15px] text-muted">
        <Text text={value} />
      </span>
    </a>
  );
}

export function ContactLinks({ labels, variant, whatsappValue = "" }: ContactLinksProps) {
  const iconSize = variant === "inline" ? 16 : 18;
  return (
    <ul className={`m-0 list-none p-0 ${WRAPPER[variant]}`}>
      {channels(labels, whatsappValue).map((channel) => (
        <li key={channel.href} className="flex">
          {variant === "rows" ? (
            <Row channel={channel} />
          ) : (
            <a
              href={channel.href}
              className={`inline-flex items-center text-ink decoration-[1.5px] underline-offset-4 hover:underline ${HOVER} ${LINK[variant]}`}
            >
              <channel.Icon size={iconSize} />
              <Text text={channel.label} />
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
