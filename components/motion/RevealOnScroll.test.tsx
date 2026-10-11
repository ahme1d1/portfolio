import { StrictMode } from "react";
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SETTLE_MS, markLocaleSwitch, resetPageEntry } from "@/lib/motion/reveal";
import { router } from "@/tests/mocks/next";
import { RevealOnScroll } from "./RevealOnScroll";

type Entry = { isIntersecting: boolean; target: Element };
type Callback = (entries: Entry[], observer: FakeObserver) => void;

let intersect: (entries: Entry[]) => void = () => undefined;
const observed = new Set<Element>();

class FakeObserver {
  constructor(callback: Callback) {
    intersect = (entries) => callback(entries, this);
  }
  observe(target: Element) {
    observed.add(target);
  }
  unobserve(target: Element) {
    observed.delete(target);
  }
  disconnect() {
    observed.clear();
  }
}

function allowMotion(isAllowed: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: isAllowed && query.includes("no-preference"), media: query }));
}

/** A section whose blocks sit at the given distances from the top of the screen. */
function page(tops: readonly number[]) {
  const section = document.createElement("section");
  section.className = "reveal-children";
  const blocks = tops.map((top) => {
    const block = document.createElement("div");
    block.getBoundingClientRect = () => ({ top }) as DOMRect;
    section.append(block);
    return block;
  });
  document.body.append(section);
  return blocks;
}

const ON_SCREEN = 100;
const BELOW = 2000;

describe("RevealOnScroll", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", FakeObserver);
    allowMotion(true);
    // jsdom lays nothing out: every block counts as rendered.
    vi.spyOn(Element.prototype, "getClientRects").mockReturnValue([{}] as unknown as DOMRectList);
    router.pathname = "/en/";
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    resetPageEntry();
    observed.clear();
    document.body.innerHTML = "";
    delete document.documentElement.dataset.localeSwitch;
    delete document.documentElement.dataset.browsing;
  });

  it("at load, leaves what is on screen to its load animation and holds back what is below", () => {
    const [onScreen, below] = page([ON_SCREEN, BELOW]);
    render(<RevealOnScroll />);
    expect(onScreen?.dataset.reveal).toBeUndefined();
    expect(below?.dataset.reveal).toBe("pending");
    expect([...observed]).toEqual([below]);
  });

  it("plays a block once it comes into view, then takes its styles off", () => {
    const [, below] = page([ON_SCREEN, BELOW]);
    render(<RevealOnScroll />);
    act(() => intersect([{ isIntersecting: true, target: below as Element }]));
    expect(below?.dataset.reveal).toBe("play");
    expect(below?.dataset.revealOrder).toBe("0");
    expect(observed.has(below as Element)).toBe(false);

    act(() => vi.advanceTimersByTime(SETTLE_MS));
    expect(below?.dataset.reveal).toBe("done");
    expect(below?.dataset.revealOrder).toBeUndefined();
  });

  it("cascades blocks that come into view together, in page order", () => {
    const [first, second, third] = page([BELOW, BELOW, BELOW]);
    render(<RevealOnScroll />);
    act(() =>
      intersect([
        { isIntersecting: true, target: third as Element },
        { isIntersecting: true, target: first as Element },
        { isIntersecting: false, target: second as Element },
      ]),
    );
    expect([first?.dataset.revealOrder, third?.dataset.revealOrder]).toEqual(["0", "1"]);
    expect(second?.dataset.reveal).toBe("pending");
  });

  it("plays the whole new page after a link, but not after the language switch", () => {
    const { rerender } = render(<RevealOnScroll />);

    const [linked] = page([ON_SCREEN]);
    router.pathname = "/en/work/";
    rerender(<RevealOnScroll />);
    expect(linked?.dataset.reveal).toBe("pending");

    markLocaleSwitch("ar");
    // The switch mounts a new root layout, and React clears the attributes it didn't set on <html>.
    delete document.documentElement.dataset.localeSwitch;
    const [mirrored] = page([ON_SCREEN]);
    router.pathname = "/ar/work/";
    rerender(<RevealOnScroll />);
    expect(mirrored?.dataset.reveal).toBe("done");
    expect(document.documentElement.dataset.localeSwitch).toBe("");

    router.pathname = "/ar/about/";
    rerender(<RevealOnScroll />);
    expect(document.documentElement.dataset.localeSwitch).toBeUndefined();
  });

  it("keeps watching held-back blocks when React runs its effects twice (development)", () => {
    const [, below] = page([ON_SCREEN, BELOW]);
    render(
      <StrictMode>
        <RevealOnScroll />
      </StrictMode>,
    );
    expect(below?.dataset.reveal).toBe("pending");
    expect(observed.has(below as Element)).toBe(true);
  });

  it("keeps the hero still after a switch even when effects run twice", () => {
    const { rerender } = render(
      <StrictMode>
        <RevealOnScroll />
      </StrictMode>,
    );
    markLocaleSwitch("ar");
    delete document.documentElement.dataset.localeSwitch;
    router.pathname = "/ar/";
    rerender(
      <StrictMode>
        <RevealOnScroll />
      </StrictMode>,
    );
    expect(document.documentElement.dataset.localeSwitch).toBe("");
  });

  it("watches a kept page's held-back blocks again when the page is shown again", () => {
    const { rerender } = render(<RevealOnScroll />);
    const [below] = page([BELOW]);
    router.pathname = "/en/work/";
    rerender(<RevealOnScroll />);
    router.pathname = "/en/about/";
    rerender(<RevealOnScroll />);
    expect(observed.has(below as Element)).toBe(true);
  });

  it("plays quicker once the person is browsing: after the first page, not on it", () => {
    const { rerender } = render(<RevealOnScroll />);
    expect(document.documentElement.dataset.browsing).toBeUndefined();
    router.pathname = "/en/work/";
    rerender(<RevealOnScroll />);
    expect(document.documentElement.dataset.browsing).toBe("");
  });

  it("does nothing when the person asks for reduced motion", () => {
    allowMotion(false);
    const [below] = page([BELOW]);
    render(<RevealOnScroll />);
    expect(below?.dataset.reveal).toBeUndefined();
    expect(observed.size).toBe(0);
  });
});
