import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { router } from "@/tests/mocks/next";
import { Footer } from "./Footer";
import { Header } from "./Header";

describe("Header", () => {
  it("links home, the five sections, the other language and the CV", () => {
    router.pathname = "/en/about/";
    render(<Header locale="en" />);
    // The closed mobile menu has a second "Main" nav; CSS hides one of them at every width.
    const [nav] = screen.getAllByRole("navigation", { name: "Main" });
    if (!nav) throw new Error("no main navigation");
    expect(within(nav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      "Home",
      "Work",
      "Experience",
      "Services",
      "About",
      "Contact",
    ]);
    expect(within(nav).getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "العربية" })).toHaveAttribute("href", "/ar/about/");
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute("href", "/cv/Ahmed_Gabal_Senior_Frontend_Engineer.pdf");
  });

  it("is fully Arabic on Arabic pages", () => {
    router.pathname = "/ar/";
    render(<Header locale="ar" />);
    expect(screen.getByRole("link", { name: "أحمد جبل" })).toHaveAttribute("href", "/ar/");
    const [nav] = screen.getAllByRole("navigation", { name: "القائمة الرئيسية" });
    if (!nav) throw new Error("no main navigation");
    expect(within(nav).getByRole("link", { name: "الرئيسية" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "الرئيسية" })).toHaveAttribute("href", "/ar/");
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/");
  });
});

describe("Footer", () => {
  it("repeats home and the sections under the copyright, without a language link", () => {
    router.pathname = "/en/";
    render(<Footer locale="en" />);
    const nav = screen.getByRole("navigation", { name: "Footer" });
    expect(within(nav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      "Home",
      "Work",
      "Experience",
      "Services",
      "About",
      "Contact",
    ]);
    expect(screen.getByText("© 2026 Ahmed Gabal. Designed and built by me.")).toBeInTheDocument();
  });
});
