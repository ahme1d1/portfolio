import { describe, expect, it } from "vitest";
import { COMPANIES } from "@/content/companies/data";
import { LOCALES } from "@/lib/i18n/locale";
import { arExperience } from "./ar";
import { EDUCATION, ROLE_KEYS, ROLES, SKILL_KEYS } from "./data";
import { enExperience } from "./en";
import { getExperienceCopy } from "./index";

describe("experience data", () => {
  it.each(ROLE_KEYS)("dates %s in the same years as the company list", (key) => {
    const role = ROLES[key];
    const company = COMPANIES[key];
    expect(role.start.year).toBe(company.start);
    expect(role.end?.year ?? null).toBe(company.end);
  });

  it("lists the roles newest first, with one current role at the top", () => {
    const starts = ROLE_KEYS.map((key) => ROLES[key].start.year * 12 + ROLES[key].start.month);
    expect(starts).toEqual([...starts].sort((a, b) => b - a));
    expect(ROLE_KEYS.filter((key) => ROLES[key].end === null)).toEqual(["vois"]);
  });

  it("gives every role a different anchor", () => {
    const anchors = ROLE_KEYS.map((key) => ROLES[key].anchor);
    expect(new Set(anchors).size).toBe(anchors.length);
    expect(ROLES.evaPharma.anchor).toBe("eva-pharma");
  });

  it("graduated before the first role", () => {
    expect(EDUCATION.year).toBeLessThanOrEqual(ROLES.baianat.start.year);
  });
});

describe.each(LOCALES)("experience copy (%s)", (locale) => {
  const copy = getExperienceCopy(locale);

  it("names all twelve months", () => {
    expect(copy.months).toHaveLength(12);
    expect(new Set(copy.months).size).toBe(12);
  });

  it.each(ROLE_KEYS)("has a sub-role for %s exactly when the data has its stack", (key) => {
    expect(copy.roles.items[key].subRole === null).toBe(ROLES[key].subRole === null);
  });

  it("has a row for every skill, in the data's order", () => {
    expect(Object.keys(copy.skills.rows)).toEqual([...SKILL_KEYS]);
  });

  it("keeps the bold lead-in on every bullet of the current role", () => {
    const bullets = copy.roles.items.vois.bullets;
    expect(bullets.filter((bullet) => !bullet.startsWith("*"))).toEqual([]);
  });
});

describe("experience copy, Arabic", () => {
  it("follows the English where the boards disagree", () => {
    const { vois, evaPharma } = arExperience.roles.items;
    expect(vois.bullets[0]).toContain("ناقل استدعاءات محدد الأنواع");
    expect(vois.bullets[0]).not.toContain("مخزن");
    expect(evaPharma.bullets[2]).not.toContain("أيامهم الأولى");
    expect(arExperience.skills.rows.fullStack.term).toBe("تطوير متكامل ({Fantasy EG} و {Educoursez})");
  });

  it("has as many bullets as the English for every role", () => {
    for (const key of ROLE_KEYS) {
      const en = enExperience.roles.items[key];
      const ar = arExperience.roles.items[key];
      expect(ar.bullets).toHaveLength(en.bullets.length);
      expect(ar.subRole?.bullets.length).toBe(en.subRole?.bullets.length);
      expect(ar.projects).toHaveLength(en.projects.length);
    }
  });
});
