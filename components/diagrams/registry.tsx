import type { ComponentType } from "react";
import type { FigureId } from "@/content/cases/types";
import type { Locale } from "@/lib/i18n/locale";
import { FantasyArchitecture } from "./fantasy/FantasyArchitecture";

export type FigureProps = { locale: Locale };

/**
 * Every case-study diagram, by id. Hero drawings ("vodafone-hero", "lean-hero") render only the
 * drawing: the hero adds its caption from the case copy. The others render a whole <figure>.
 */
const FIGURES: Partial<Record<FigureId, ComponentType<FigureProps>>> = {
  "fantasy-architecture": FantasyArchitecture,
};

export function CaseDiagram({ id, locale }: { id: FigureId; locale: Locale }) {
  const Figure = FIGURES[id];
  return Figure ? <Figure locale={locale} /> : null;
}
