import { HomeContactBand } from "@/components/contact/HomeContactBand";
import type { Locale } from "@/lib/i18n/locale";
import { ExperiencePreview } from "./ExperiencePreview";
import { HomeHero } from "./HomeHero";
import { SelectedWork } from "./SelectedWork";
import { ServicesPreview } from "./ServicesPreview";

/** The Home board, top to bottom. */
export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <HomeHero locale={locale} />
      <SelectedWork locale={locale} />
      <ExperiencePreview locale={locale} />
      <ServicesPreview locale={locale} />
      <HomeContactBand locale={locale} />
    </>
  );
}
