import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { router } from "@/tests/mocks/next";
import { NavLink } from "./NavLink";

describe("NavLink", () => {
  it("marks the current page", () => {
    router.pathname = "/en/work/";
    render(<NavLink href="/en/work/">Work</NavLink>);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
  });

  it("marks the section while reading a page inside it", () => {
    router.pathname = "/en/work/qima/";
    render(<NavLink href="/en/work/">Work</NavLink>);
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "true");
  });

  it("leaves other links unmarked", () => {
    router.pathname = "/en/work/";
    render(<NavLink href="/en/about/">About</NavLink>);
    const link = screen.getByRole("link", { name: "About" });
    expect(link).not.toHaveAttribute("aria-current");
    expect(link).not.toHaveAttribute("data-current");
  });
});
