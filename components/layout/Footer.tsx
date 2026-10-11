import { getSiteCopy } from "@/content/site";
import { otherLocale, type Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavLink } from "./NavLink";

const LINK =
  "flex min-h-11 items-center text-[15px] text-muted decoration-1 transition-fast hover:text-ink hover:underline hover:underline-offset-4 active:opacity-80 data-current:text-ink lg:px-3";

export function Footer({ locale }: { locale: Locale }) {
  const copy = getSiteCopy(locale);
  const other = otherLocale(locale);

  return (
    <footer className="mx-auto max-w-page px-4 pt-12 pb-10 lg:px-10 lg:pt-24 lg:pb-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-6 lg:border-t lg:border-line lg:pt-8">
        <nav aria-label={copy.nav.footerLabel} className="grid grid-cols-2 gap-0.5 lg:order-last lg:flex lg:flex-wrap lg:gap-1">
          {copy.nav.items.map((item) => (
            <NavLink key={item.href} href={localePath(locale, item.href)} className={LINK}>
              {item.label}
            </NavLink>
          ))}
          <LanguageSwitch target={other} placement="footer" className={LINK}>
            {getSiteCopy(other).languageName}
          </LanguageSwitch>
        </nav>
        <p className="m-0 text-sm text-muted lg:text-[15px]">{copy.footer.copyright}</p>
      </div>
    </footer>
  );
}
