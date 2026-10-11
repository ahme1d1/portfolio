import { describe, expect, it } from "vitest";
import { CASE_DATA } from "./data";
import { getCaseCopy } from "./index";
import { CASE_SLUGS } from "./slugs";
import type { HeroData } from "./types";

/** How many screenshots a hero shows, each needing an alt text. */
function heroImageCount(hero: HeroData): number {
  switch (hero.kind) {
    case "browser":
      return 2;
    case "phones":
      return hero.images.length;
    case "diagram":
      return 0;
  }
}

// The copy pairs with the language-neutral data by position, so the types alone can't catch a
// screenshot without its alt text or a "How I built it" group without its heading.
describe.each(CASE_SLUGS)("%s: copy lines up with the data", (slug) => {
  const data = CASE_DATA[slug];

  it.each(["en", "ar"] as const)("in %s", (locale) => {
    const copy = getCaseCopy(locale, slug);
    expect(copy.hero.alts).toHaveLength(heroImageCount(data.hero));
    expect(copy.role.shots?.alts.length ?? null).toBe(data.roleShots?.shots.length ?? null);
    expect(copy.built.groups).toHaveLength(data.built.groups.length);
    for (const key of data.facts) {
      if (key !== "stack") expect(copy.facts[key], `the ${key} fact`).toBeDefined();
    }
  });
});
