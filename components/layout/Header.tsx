import Link from "next/link";
import type { Route } from "next";
import { DownloadIcon } from "@/components/ui/icons";
import { CV_PATH } from "@/content/links";
import { getSiteCopy } from "@/content/site";
import { otherLocale, type Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

const PILL =
  "inline-flex h-11 shrink-0 items-center rounded-full font-medium transition-fast active:scale-[0.97]";

export function Header({ locale }: { locale: Locale }) {
  const copy = getSiteCopy(locale);
  const other = otherLocale(locale);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-page [view-transition-name:site-header]">
      <div className="mx-auto flex h-15 max-w-page items-center gap-1.5 ps-[18px] pe-2 lg:h-19 lg:gap-5 lg:px-10">
        <Link
          href={localePath(locale, "/") as Route}
          className="inline-flex min-h-11 flex-1 items-center text-[17px] font-bold tracking-[-0.02em] text-ink lg:flex-none lg:text-lg ar:tracking-normal"
        >
          {copy.name}
        </Link>

        <nav aria-label={copy.nav.mainLabel} className="hidden flex-1 justify-center gap-0.5 lg:flex">
          {copy.nav.items.map((item) => (
            <NavLink
              key={item.href}
              href={localePath(locale, item.href)}
              className="border-b-2 border-transparent px-3.5 pt-3 pb-2.5 text-base font-medium text-ink transition-fast hover:border-strong active:border-ink data-current:border-accent data-current:font-semibold"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <LanguageSwitch
          target={other}
          placement="header"
          className={`${PILL} border border-line px-3.5 text-sm text-ink hover:border-strong hover:bg-surface lg:px-4 lg:text-[15px]`}
        >
          {getSiteCopy(other).languageName}
        </LanguageSwitch>

        <div className="hidden items-center gap-5 lg:flex">
          <ThemeToggle labels={copy.theme} />
          <a
            href={CV_PATH}
            className={`${PILL} gap-2 bg-inverse px-[18px] text-[15px] font-semibold text-on-inverse hover:bg-ink-2`}
          >
            <DownloadIcon size={16} />
            {copy.cv.header}
          </a>
        </div>

        <MobileMenu locale={locale} copy={copy} />
      </div>
    </header>
  );
}
