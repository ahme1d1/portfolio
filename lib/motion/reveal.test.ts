import { afterEach, describe, expect, it } from "vitest";
import {
  MAX_STAGGER_STEP,
  initialRevealState,
  markLocaleSwitch,
  readRevealState,
  resetPageEntry,
  staggerStep,
  takePageEntry,
} from "./reveal";

describe("initialRevealState", () => {
  const SCREEN = 1000;

  it("at load, leaves every block on screen to its CSS load animation and holds back the ones below", () => {
    expect(initialRevealState("load", 100, SCREEN)).toBeNull();
    // Even at the bottom edge: it may already be fading in, and hiding it would flash.
    expect(initialRevealState("load", 980, SCREEN)).toBeNull();
    expect(initialRevealState("load", 1200, SCREEN)).toBe("pending");
  });

  it("plays the whole new page after an ordinary navigation, like a page entrance", () => {
    expect(initialRevealState("navigation", 100, SCREEN)).toBe("pending");
    expect(initialRevealState("navigation", 1200, SCREEN)).toBe("pending");
  });

  it("leaves everything on screen after a language switch, which mirrors the page instead", () => {
    expect(initialRevealState("locale-switch", 100, SCREEN)).toBe("done");
    expect(initialRevealState("locale-switch", 980, SCREEN)).toBe("done");
    expect(initialRevealState("locale-switch", 1200, SCREEN)).toBe("pending");
  });
});

describe("readRevealState", () => {
  it("reads a block's state, and nothing for a missing or unknown value", () => {
    expect(["pending", "play", "done"].map(readRevealState)).toEqual(["pending", "play", "done"]);
    expect(readRevealState(undefined)).toBeNull();
    expect(readRevealState("hidden")).toBeNull();
  });
});

describe("staggerStep", () => {
  it("cascades blocks that come into view together, up to a few steps", () => {
    expect([0, 1, 2, 3, 4, 9].map(staggerStep)).toEqual([0, 1, 2, 3, MAX_STAGGER_STEP, MAX_STAGGER_STEP]);
  });
});

describe("takePageEntry", () => {
  afterEach(() => {
    resetPageEntry();
    delete document.documentElement.dataset.localeSwitch;
  });

  it("is a load the first time, then a navigation", () => {
    expect(takePageEntry("/en/")).toBe("load");
    expect(takePageEntry("/en/work/")).toBe("navigation");
  });

  it("is a language switch once, after the switch was pressed, and marks <html> for the CSS", () => {
    takePageEntry("/en/");
    markLocaleSwitch("ar");
    expect(document.documentElement.dataset.localeSwitch).toBe("");
    expect(takePageEntry("/ar/")).toBe("locale-switch");
    expect(takePageEntry("/ar/work/")).toBe("navigation");
  });

  it("forgets a switch that never landed on the other language", () => {
    takePageEntry("/en/");
    markLocaleSwitch("ar");
    expect(takePageEntry("/en/work/")).toBe("navigation");
  });
});
