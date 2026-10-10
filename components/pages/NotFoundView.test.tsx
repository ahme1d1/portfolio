import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { router } from "@/tests/mocks/next";
import { NotFoundView } from "./NotFoundView";

describe("NotFoundView", () => {
  it("says the page does not exist and offers the way back", () => {
    router.pathname = "/en/nope/";
    render(<NotFoundView locale="en" />);
    expect(screen.getByRole("heading", { level: 1, name: "This page doesn't exist." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/en/");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/en/work/");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/en/contact/");
  });

  it("opens the other language's home page, since a missing page has no translation", () => {
    router.pathname = "/ar/nope/";
    render(<NotFoundView locale="ar" />);
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/");
  });

  it("names the page in its language", () => {
    render(<NotFoundView locale="ar" />);
    expect(document.querySelector("title")?.textContent).toBe("الصفحة غير موجودة | أحمد جبل");
  });
});
