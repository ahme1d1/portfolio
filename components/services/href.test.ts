import { describe, expect, it } from "vitest";
import { pairLinks, targetHref } from "./href";

describe("pairLinks", () => {
  it("gives each label the href of its target, in order", () => {
    const links = pairLinks("en", ["Fantasy EG", "fantasyeg.com"], [{ path: "/work/fantasy-eg/" }, { url: "https://fantasyeg.com" }]);
    expect(links).toEqual([
      { label: "Fantasy EG", href: "/en/work/fantasy-eg/" },
      { label: "fantasyeg.com", href: "https://fantasyeg.com" },
    ]);
  });

  it("fails loudly when the copy and the data disagree, instead of showing an empty link", () => {
    expect(() => pairLinks("ar", ["{Fantasy EG}"], [])).toThrow(/1 label.*0 target/);
  });
});

describe("targetHref", () => {
  it("puts a page of this site under the locale", () => {
    expect(targetHref("en", { path: "/work/fantasy-eg/" })).toBe("/en/work/fantasy-eg/");
    expect(targetHref("ar", { path: "/experience/" })).toBe("/ar/experience/");
  });

  it("points at a row with the id that page gives it, unique per page and language", () => {
    expect(targetHref("en", { path: "/experience/", anchor: "eva-pharma" })).toBe("/en/experience/#experience-eva-pharma-en");
    expect(targetHref("ar", { path: "/experience/", anchor: "eva-pharma" })).toBe("/ar/experience/#experience-eva-pharma-ar");
  });

  it("keeps another site's address as it is, in both languages", () => {
    expect(targetHref("en", { url: "https://fantasyeg.com" })).toBe("https://fantasyeg.com");
    expect(targetHref("ar", { url: "https://fantasyeg.com" })).toBe("https://fantasyeg.com");
  });
});
