import { alexandria, bricolage } from "@/app/fonts";
import { getSiteCopy } from "@/content/site";
import { dirOf, type Locale } from "@/lib/i18n/locale";
import { THEME_SCRIPT } from "@/lib/theme/theme";
import { MirrorFade } from "@/components/motion/MirrorBlock";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { KeepTheme } from "./KeepTheme";
import { SkipLink } from "./SkipLink";

/** The document every page shares: language, direction, theme, header, main and footer. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const copy = getSiteCopy(locale);
  // Next keeps the previous language's page in the DOM (hidden), so ids carry the locale.
  const mainId = `main-${locale}`;

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${bricolage.variable} ${alexandria.variable}`}
      suppressHydrationWarning
    >
      {/* App Router root layouts render <head> directly; the rule is written for the Pages Router. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <KeepTheme />
        <SkipLink label={copy.skipLink} targetId={mainId} />
        <Header locale={locale} />
        <MirrorFade name="main">
          <main id={mainId} tabIndex={-1} className="outline-none">
            {children}
          </main>
        </MirrorFade>
        <MirrorFade name="footer">
          <Footer locale={locale} />
        </MirrorFade>
        {/* After the page, so its layout effect runs once Next has scrolled the new page. */}
        <RevealOnScroll />
      </body>
    </html>
  );
}
