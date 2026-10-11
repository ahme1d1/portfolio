import { LetsTalkBand } from "@/components/contact/LetsTalkBand";
import { getAboutCopy } from "@/content/about";
import type { Locale } from "@/lib/i18n/locale";
import { AboutHero } from "./AboutHero";
import { HowIWork } from "./HowIWork";
import { QuickFacts } from "./QuickFacts";

/** The About page: who Ahmed is, how he works, the quick facts, then the "Let's talk" band. */
export function AboutView({ locale }: { locale: Locale }) {
  const copy = getAboutCopy(locale);
  return (
    <>
      <AboutHero locale={locale} copy={copy} />
      <HowIWork locale={locale} copy={copy.how} />
      <QuickFacts locale={locale} copy={copy} />
      <LetsTalkBand locale={locale} page="about" />
    </>
  );
}
