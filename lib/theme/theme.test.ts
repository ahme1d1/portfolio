import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { THEME_SCRIPT, THEME_STORAGE_KEY, applyTheme, readEffectiveTheme, toggledTheme } from "./theme";

function mockSystemDark(isDark: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({ matches: isDark && query.includes("dark"), media: query })),
  );
}

describe("theme", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    mockSystemDark(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("follows the system when nothing was chosen", () => {
    expect(readEffectiveTheme()).toBe("light");
    mockSystemDark(true);
    expect(readEffectiveTheme()).toBe("dark");
  });

  it("prefers the choice on <html> over the system", () => {
    mockSystemDark(true);
    document.documentElement.dataset.theme = "light";
    expect(readEffectiveTheme()).toBe("light");
  });

  it("applies and remembers a choice", () => {
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("still applies the theme when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("toggles between light and dark", () => {
    expect(toggledTheme("light")).toBe("dark");
    expect(toggledTheme("dark")).toBe("light");
  });

  it("restores a saved choice before first paint with the inline script", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    new Function(THEME_SCRIPT)();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("ignores unknown saved values in the inline script", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");
    new Function(THEME_SCRIPT)();
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});
