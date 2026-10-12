import { LetsTalkBand } from "@/components/contact/LetsTalkBand";
import { getAboutCopy } from "@/content/about";
import type { Locale } from "@/lib/i18n/locale";
import { AboutHero } from "./AboutHero";
import { QuickFacts } from "./QuickFacts";

/** The About page: who Ahmed is and the two doors, the quick facts, then the "Let's talk" band. */
export function AboutView({ locale }: { locale: Locale }) {
  const copy = getAboutCopy(locale);
  return (
    <>
      <AboutHero locale={locale} copy={copy} />
      <QuickFacts locale={locale} copy={copy} />
      <LetsTalkBand locale={locale} page="about" />
    </>
  );
}
