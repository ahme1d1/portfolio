import Link from "next/link";
import type { Route } from "next";
import { LOCALE_SWITCH } from "@/components/motion/MirrorBlock";
import { ButtonLink } from "@/components/ui/Button";
import { GlobeIcon, HomeIcon } from "@/components/ui/icons";
import { getSiteCopy } from "@/content/site";
import { otherLocale, type Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { notFoundTitle } from "@/lib/seo/metadata";

export function NotFoundView({ locale }: { locale: Locale }) {
  const copy = getSiteCopy(locale);
  const { notFound } = copy;
  const other = otherLocale(locale);

  return (
    <section
      data-footer="compact"
      className="mx-auto flex min-h-[60vh] max-w-page flex-col items-center justify-center gap-5 px-4 py-14 text-center lg:min-h-[620px] lg:px-10"
    >
      {/* React 19 hoists these into <head>. */}
      <title>{notFoundTitle(locale)}</title>
      <meta name="robots" content="noindex" />
      <h1 className="type-h1">
        {notFound.title}
      </h1>
      <p className="m-0 type-lede text-ink-2">{notFound.lead}</p>
      <nav aria-label={notFound.navLabel} className="mt-3 flex flex-wrap justify-center gap-3">
        <ButtonLink href={localePath(locale, "/")} variant="cobalt">
          <HomeIcon />
          {notFound.home}
        </ButtonLink>
        <ButtonLink href={localePath(locale, "/work/")} variant="outline">
          {notFound.work}
        </ButtonLink>
        <ButtonLink href={localePath(locale, "/contact/")} variant="outline">
          {notFound.contact}
        </ButtonLink>
      </nav>
      {/* A missing page has no translation, so this opens the other language's home page (the text cross-fades). */}
      <Link
        href={localePath(other, "/") as Route}
        lang={other}
        hrefLang={other}
        transitionTypes={[LOCALE_SWITCH]}
        className="inline-flex min-h-11 items-center gap-2 px-2 text-base font-medium text-accent-ink hover:underline hover:underline-offset-4"
      >
        <GlobeIcon size={17} />
        {getSiteCopy(other).languageName}
      </Link>
    </section>
  );
}
