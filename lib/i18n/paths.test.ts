import { describe, expect, it } from "vitest";
import { currentState, localePath, stripLocale, switchLocalePath } from "./paths";

describe("localePath", () => {
  it("prefixes the locale and keeps the trailing slash", () => {
    expect(localePath("en", "/")).toBe("/en/");
    expect(localePath("ar", "/work/")).toBe("/ar/work/");
    expect(localePath("en", "/work/qima/")).toBe("/en/work/qima/");
  });

  it("adds a missing leading or trailing slash", () => {
    expect(localePath("en", "work")).toBe("/en/work/");
    expect(localePath("ar", "/about")).toBe("/ar/about/");
  });
});

describe("stripLocale", () => {
  it("removes the locale segment", () => {
    expect(stripLocale("/en/work/qima/")).toBe("/work/qima/");
    expect(stripLocale("/ar/")).toBe("/");
    expect(stripLocale("/ar")).toBe("/");
  });

  it("leaves paths without a locale alone, normalised", () => {
    expect(stripLocale("/fr/work")).toBe("/fr/work/");
    expect(stripLocale("/")).toBe("/");
  });
});

describe("switchLocalePath", () => {
  it("points to the same page in the other language", () => {
    expect(switchLocalePath("/en/work/qima/", "ar")).toBe("/ar/work/qima/");
    expect(switchLocalePath("/ar/contact/", "en")).toBe("/en/contact/");
    expect(switchLocalePath("/en/", "ar")).toBe("/ar/");
  });

  it("falls back to the home page of the target language", () => {
    expect(switchLocalePath("/", "ar")).toBe("/ar/");
  });
});

describe("currentState", () => {
  it("marks the exact page as the current page", () => {
    expect(currentState("/en/work/", "/en/work/")).toBe("page");
  });

  it("marks the parent section on a page below it", () => {
    expect(currentState("/en/work/qima/", "/en/work/")).toBe("true");
  });

  it("does not mark unrelated links or Home on every page", () => {
    expect(currentState("/en/work/", "/en/about/")).toBeUndefined();
    expect(currentState("/en/work/", "/en/")).toBeUndefined();
    expect(currentState("/en/", "/en/")).toBe("page");
  });

  it("ignores a missing trailing slash on the current path", () => {
    expect(currentState("/en/work", "/en/work/")).toBe("page");
  });
});
