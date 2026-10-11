import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  THEME_SCRIPT,
  THEME_STORAGE_KEY,
  THEME_SWITCHING_CLASS,
  applyTheme,
  readEffectiveTheme,
  restoreSavedTheme,
  toggledTheme,
} from "./theme";

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
    document.documentElement.classList.remove(THEME_SWITCHING_CLASS);
    mockSystemDark(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("is light when nothing was chosen, even on a dark system", () => {
    mockSystemDark(true);
    expect(readEffectiveTheme()).toBe("light");
  });

  it("reads the choice on <html>", () => {
    document.documentElement.dataset.theme = "dark";
    expect(readEffectiveTheme()).toBe("dark");
    document.documentElement.dataset.theme = "light";
    expect(readEffectiveTheme()).toBe("light");
  });

  it("applies and remembers a choice", () => {
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("swaps the colours at once: transitions stay off until the new theme has been drawn", () => {
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => frames.push(callback));
    const root = document.documentElement;

    applyTheme("dark");
    expect(root.dataset.theme).toBe("dark");
    expect(root.classList.contains(THEME_SWITCHING_CLASS)).toBe(true);

    frames.shift()?.(0);
    expect(root.classList.contains(THEME_SWITCHING_CLASS)).toBe(true);

    frames.shift()?.(16);
    expect(root.classList.contains(THEME_SWITCHING_CLASS)).toBe(false);
  });

  it("keeps transitions off until the last of two quick switches has been drawn", () => {
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => frames.push(callback));
    vi.stubGlobal("cancelAnimationFrame", (handle: number) => {
      frames[handle - 1] = () => undefined;
    });
    const root = document.documentElement;

    applyTheme("dark");
    frames[0]?.(0);
    applyTheme("light");
    // The first switch's second frame would fire now; the class must stay for the second switch.
    frames.slice(1).forEach((frame) => frame(16));
    expect(root.classList.contains(THEME_SWITCHING_CLASS)).toBe(true);

    frames.slice(3).forEach((frame) => frame(32));
    expect(root.classList.contains(THEME_SWITCHING_CLASS)).toBe(false);
  });

  it("still applies the theme when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("puts a saved choice back on <html> after React has cleared it (the language switch)", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    restoreSavedTheme();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("leaves the system theme alone when nothing valid was saved", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");
    restoreSavedTheme();
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it("restores nothing when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => restoreSavedTheme()).not.toThrow();
    expect(document.documentElement.dataset.theme).toBeUndefined();
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
