import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE, LOCALES, dirOf, isLocale, otherLocale } from "./locale";

describe("locale", () => {
  it("supports exactly English and Arabic, English first", () => {
    expect(LOCALES).toEqual(["en", "ar"]);
    expect(DEFAULT_LOCALE).toBe("en");
  });

  it("recognises only supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("EN")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("writes Arabic right to left and English left to right", () => {
    expect(dirOf("ar")).toBe("rtl");
    expect(dirOf("en")).toBe("ltr");
  });

  it("names the other language for the switch", () => {
    expect(otherLocale("en")).toBe("ar");
    expect(otherLocale("ar")).toBe("en");
  });
});
