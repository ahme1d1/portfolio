import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnyLink, isPagePath } from "./AnyLink";
import { TextLink } from "./TextLink";

describe("isPagePath", () => {
  it("is true for site pages only", () => {
    expect(isPagePath("/en/work/")).toBe(true);
    expect(isPagePath("/en/contact/?topic=role")).toBe(true);
    expect(isPagePath("/cv/Ahmed.pdf")).toBe(false);
    expect(isPagePath("https://evapharma.com/")).toBe(false);
    expect(isPagePath("mailto:a@b.co")).toBe(false);
    expect(isPagePath("//evil.example/x")).toBe(false);
  });
});

describe("AnyLink", () => {
  it("renders site pages and other links with their href", () => {
    render(
      <>
        <AnyLink href="/en/work/">Work</AnyLink>
        <AnyLink href="https://evapharma.com/">EVA Pharma</AnyLink>
      </>,
    );
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/en/work/");
    expect(screen.getByRole("link", { name: "EVA Pharma" })).toHaveAttribute("href", "https://evapharma.com/");
  });
});

describe("TextLink", () => {
  it("styles each kind of link", () => {
    render(
      <>
        <TextLink href="/en/work/fantasy-eg/">Read</TextLink>
        <TextLink href="/en/work/" variant="head">
          All work
        </TextLink>
        <TextLink href="https://evapharma.com/" variant="inline">
          EVA Pharma
        </TextLink>
      </>,
    );
    expect(screen.getByRole("link", { name: "Read" })).toHaveClass("text-accent-ink", "min-h-11");
    expect(screen.getByRole("link", { name: "All work" })).toHaveClass("text-ink", "underline");
    expect(screen.getByRole("link", { name: "EVA Pharma" })).toHaveClass("text-accent-ink", "underline");
  });
});
