import { SECTION } from "@/components/ui/layout";
import { Rich } from "@/components/ui/Rich";
import { TextLink } from "@/components/ui/TextLink";
import type { ServicesCopy } from "@/content/services";
import { WHY_KEYS, WHY_LINKS, type LinkTarget, type WhyKey } from "@/content/services/data";
import type { Locale } from "@/lib/i18n/locale";
import { pageId } from "@/lib/ids";
import { pairLinks } from "./href";

type WhyCopy = ServicesCopy["why"];

/** Read after the visible label only by screen readers, so "Read the case study" has its own name. */
function HiddenSuffix({ text }: { text: string }) {
  return (
    <>
      {/* A leading space has to be its own text node, or the accessible name drops it. */}
      {text.startsWith(" ") ? " " : null}
      <span className="sr-only">
        <Rich text={text.trimStart()} />
      </span>
    </>
  );
}

type WhyRowProps = { locale: Locale; item: WhyCopy["items"][WhyKey]; targets: readonly LinkTarget[] };

/** A reason: its title on the start side, the text and its links beside it; stacked on phones. */
function WhyRow({ locale, item, targets }: WhyRowProps) {
  const links = pairLinks(locale, item.links, targets);

  return (
    <li className="flex flex-col gap-2 border-t border-line pt-5 pb-2.5 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:py-7">
      <h3 className="type-h3-row">
        <Rich text={item.title} />
      </h3>
      <div className="flex max-w-[560px] flex-col gap-2 lg:gap-1.5 ar:max-w-[520px]">
        <p className="m-0 type-body text-ink-2">
          <Rich text={item.body} />
        </p>
        <div className="flex flex-wrap gap-x-5">
          {links.map((link) => (
            <TextLink key={link.href} href={link.href} className="text-[15px]">
              <Rich text={link.label} />
              {item.linkSuffix ? <HiddenSuffix text={item.linkSuffix} /> : null}
            </TextLink>
          ))}
        </div>
      </div>
    </li>
  );
}

/** "Pricing" and the one sentence about it, between two lines. */
function Pricing({ pricing }: { pricing: WhyCopy["pricing"] }) {
  return (
    <p className="m-0 mt-7 flex flex-col gap-1.5 border-y border-line py-5 type-body-lg text-ink lg:mt-12 lg:flex-row lg:flex-wrap lg:items-baseline lg:gap-5 lg:py-6">
      <span className="text-[15px] font-semibold text-muted lg:text-base">{pricing.label}</span>
      <span>
        <Rich text={pricing.text} />
      </span>
    </p>
  );
}

/** "Why work with me": three reasons as divided rows, then how pricing works. */
export function WhyList({ locale, copy }: { locale: Locale; copy: WhyCopy }) {
  const headingId = pageId("services", "why", locale);

  return (
    <section aria-labelledby={headingId} className={SECTION}>
      <h2 id={headingId} className="mb-4 type-h2 lg:mb-6">
        {copy.title}
      </h2>
      <ul className="m-0 list-none border-b border-line p-0">
        {WHY_KEYS.map((key) => (
          <WhyRow key={key} locale={locale} item={copy.items[key]} targets={WHY_LINKS[key]} />
        ))}
      </ul>
      <Pricing pricing={copy.pricing} />
    </section>
  );
}
