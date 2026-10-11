import { LetsTalkBand } from "@/components/contact/LetsTalkBand";
import { getServicesCopy } from "@/content/services";
import type { Locale } from "@/lib/i18n/locale";
import { ProcessSteps } from "./ProcessSteps";
import { ServiceList } from "./ServiceList";
import { ServicesHero } from "./ServicesHero";
import { WhyList } from "./WhyList";

/** The Services boards, top to bottom: hero, What I do, How a project runs, Why work with me, the band. */
export function ServicesView({ locale }: { locale: Locale }) {
  const copy = getServicesCopy(locale);

  return (
    <>
      <ServicesHero locale={locale} copy={copy.hero} />
      <ServiceList locale={locale} copy={copy.what} />
      <ProcessSteps locale={locale} copy={copy.process} />
      <WhyList locale={locale} copy={copy.why} />
      <LetsTalkBand locale={locale} page="services" lede={copy.bandLede} />
    </>
  );
}
