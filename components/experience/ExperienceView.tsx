import { LetsTalkBand } from "@/components/contact/LetsTalkBand";
import type { Locale } from "@/lib/i18n/locale";
import { EducationLanguages } from "./EducationLanguages";
import { ExperienceHero } from "./ExperienceHero";
import { RoleTimeline } from "./RoleTimeline";
import { SkillsSection } from "./SkillsSection";

/** The Experience board, top to bottom (phones: ExperienceMobile, with the desktop copy). */
export function ExperienceView({ locale }: { locale: Locale }) {
  return (
    <>
      <ExperienceHero locale={locale} />
      <RoleTimeline locale={locale} />
      <SkillsSection locale={locale} />
      <EducationLanguages locale={locale} />
      <LetsTalkBand locale={locale} page="experience" />
    </>
  );
}
