import { describe, expect, it } from "vitest";
import { CASE_SLUGS } from "../cases/slugs";
import { arSeo } from "./ar";
import { enSeo } from "./en";
import type { SeoCopy, SeoEntry } from "./types";

function allEntries(seo: SeoCopy): [string, SeoEntry][] {
  const { cases, ...pages } = seo;
  return [...Object.entries(pages), ...Object.entries(cases)];
}

describe("English search titles and descriptions", () => {
  it.each(allEntries(enSeo))("%s: title 50 to 60 characters with the name", (_, entry) => {
    const length = `${entry.title} | Ahmed Gabal`.length;
    expect(length).toBeGreaterThanOrEqual(50);
    expect(length).toBeLessThanOrEqual(60);
  });

  it.each(allEntries(enSeo))("%s: description 120 to 160 characters", (_, entry) => {
    expect(entry.description.length).toBeGreaterThanOrEqual(120);
    expect(entry.description.length).toBeLessThanOrEqual(160);
  });
});

describe("Arabic search titles and descriptions", () => {
  // The approved Arabic copy runs a little longer than the English limits.
  it.each(allEntries(arSeo))("%s: title at most 70 characters with the name", (_, entry) => {
    expect(`${entry.title} | أحمد جبل`.length).toBeLessThanOrEqual(70);
  });

  // Ahmed 2026-10-11: the case titles drop «، دراسة حالة» so Google shows them whole.
  it.each(Object.entries(arSeo.cases))("%s: case title fits in 60 characters with the name", (_, entry) => {
    expect(`${entry.title} | أحمد جبل`.length).toBeLessThanOrEqual(60);
    expect(entry.title).not.toContain("دراسة حالة");
  });

  it.each(allEntries(arSeo))("%s: description 120 to 165 characters", (_, entry) => {
    expect(entry.description.length).toBeGreaterThanOrEqual(120);
    expect(entry.description.length).toBeLessThanOrEqual(165);
  });
});

describe("coverage", () => {
  it("has an entry for every case study", () => {
    expect(Object.keys(enSeo.cases).sort()).toEqual([...CASE_SLUGS].sort());
  });
});
