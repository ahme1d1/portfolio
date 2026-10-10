import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { arSite } from "@/content/site/ar";
import { enSite } from "@/content/site/en";
import { router } from "@/tests/mocks/next";
import { MobileMenu } from "./MobileMenu";

function renderMenu() {
  render(<MobileMenu locale="en" copy={enSite} />);
  return screen.getByRole("button", { name: "Menu" });
}

describe("MobileMenu", () => {
  let mediaListener: (() => void) | null = null;
  const media = { matches: false };

  beforeEach(() => {
    router.pathname = "/en/";
    document.documentElement.style.overflow = "";
    media.matches = false;
    vi.stubGlobal("matchMedia", () => ({
      get matches() {
        return media.matches;
      },
      addEventListener: (_: string, listener: () => void) => {
        mediaListener = listener;
      },
      removeEventListener: () => {
        mediaListener = null;
      },
    }));
  });

  afterEach(() => vi.unstubAllGlobals());

  it("keeps its name and reports whether it is open", async () => {
    const button = renderMenu();
    expect(button).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(button);
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "true");
  });

  it("moves focus to the first link and locks the page behind", async () => {
    await userEvent.click(renderMenu());
    expect(screen.getByRole("link", { name: "Work" })).toHaveFocus();
    expect(document.documentElement.style.overflow).toBe("hidden");
  });

  it("closes on Escape and returns focus to the button", async () => {
    const button = renderMenu();
    await userEvent.click(button);
    await userEvent.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("keeps Tab inside the menu", async () => {
    const button = renderMenu();
    await userEvent.click(button);
    // Shift+Tab from the first link goes to the button, then wraps to the last control.
    await userEvent.tab({ shift: true });
    expect(button).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(screen.getByRole("link", { name: "Email" })).toHaveFocus();
    await userEvent.tab();
    expect(button).toHaveFocus();
  });

  it("closes when a link is picked", async () => {
    const button = renderMenu();
    await userEvent.click(button);
    await userEvent.click(screen.getByRole("link", { name: "About" }));
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("offers the CV, the theme and the contact links", async () => {
    await userEvent.click(renderMenu());
    expect(screen.getByRole("link", { name: "Download CV (PDF)" })).toHaveAttribute(
      "href",
      "/cv/Ahmed_Gabal_Senior_Frontend_Engineer.pdf",
    );
    expect(screen.getByRole("button", { name: /Dark theme/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/201092829213");
  });

  it("is named in Arabic on Arabic pages", () => {
    router.pathname = "/ar/";
    render(<MobileMenu locale="ar" copy={arSite} />);
    expect(screen.getByRole("button", { name: "القائمة" })).toBeInTheDocument();
  });

  it("makes the page behind unreachable while open", async () => {
    render(
      <>
        <MobileMenu locale="en" copy={enSite} />
        <main>content</main>
        <footer>footer</footer>
      </>,
      { container: document.body },
    );
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(document.querySelector("main")?.inert).toBe(true);
    await userEvent.keyboard("{Escape}");
    expect(document.querySelector("main")?.inert).toBe(false);
  });

  it("closes after a navigation it did not start, such as Back", async () => {
    const { rerender } = render(<MobileMenu locale="en" copy={enSite} />);
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    router.pathname = "/en/work/";
    rerender(<MobileMenu locale="en" copy={enSite} />);
    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when the window grows past the menu breakpoint", async () => {
    const button = renderMenu();
    await userEvent.click(button);
    media.matches = true;
    act(() => mediaListener?.());
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(document.documentElement.style.overflow).toBe("");
  });
});
