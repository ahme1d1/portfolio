import type { ComponentType } from "react";
import type { FigureId } from "@/content/cases/types";
import type { Locale } from "@/lib/i18n/locale";
import { CulturalBridgeArchitecture } from "./cultural-bridge/CulturalBridgeArchitecture";
import { EducoursezArchitecture } from "./educoursez/EducoursezArchitecture";
import { EducoursezPhases } from "./educoursez/EducoursezPhases";
import { FantasyArchitecture } from "./fantasy/FantasyArchitecture";
import { LeanArchitecture } from "./lean/LeanArchitecture";
import { LeanBuilder } from "./lean/LeanBuilder";
import { LeanHero } from "./lean/LeanHero";
import { QimaArchitecture } from "./qima/QimaArchitecture";
import { TikVideoArchitecture } from "./tikvideo/TikVideoArchitecture";
import { VodafoneArchitecture } from "./vodafone/VodafoneArchitecture";
import { VodafoneHero } from "./vodafone/VodafoneHero";
import { VodafoneSteps } from "./vodafone/VodafoneSteps";
import { VodafoneTable } from "./vodafone/VodafoneTable";
import { VodafoneTools } from "./vodafone/VodafoneTools";

export type FigureProps = { locale: Locale };

/**
 * Every case-study diagram, by id. Hero drawings ("vodafone-hero", "lean-hero") render only the
 * drawing: the hero adds its caption from the case copy. The others render a whole <figure>.
 */
const FIGURES: Readonly<Record<FigureId, ComponentType<FigureProps>>> = {
  "fantasy-architecture": FantasyArchitecture,
  "educoursez-architecture": EducoursezArchitecture,
  "educoursez-phases": EducoursezPhases,
  "vodafone-hero": VodafoneHero,
  "vodafone-architecture": VodafoneArchitecture,
  "vodafone-table": VodafoneTable,
  "vodafone-tools": VodafoneTools,
  "vodafone-steps": VodafoneSteps,
  "tikvideo-architecture": TikVideoArchitecture,
  "cultural-bridge-architecture": CulturalBridgeArchitecture,
  "lean-hero": LeanHero,
  "lean-architecture": LeanArchitecture,
  "lean-builder": LeanBuilder,
  "qima-architecture": QimaArchitecture,
};

export function CaseDiagram({ id, locale }: { id: FigureId; locale: Locale }) {
  const Figure = FIGURES[id];
  return <Figure locale={locale} />;
}
