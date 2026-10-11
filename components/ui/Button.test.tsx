import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, ButtonLink, ButtonPrefix, buttonClass } from "./Button";

describe("buttonClass", () => {
  it("maps each variant to its colours", () => {
    expect(buttonClass({ variant: "black" })).toContain("bg-inverse text-on-inverse hover:bg-ink-2");
    expect(buttonClass({ variant: "cobalt" })).toContain("bg-accent text-on-accent hover:bg-accent-hover");
    expect(buttonClass({ variant: "outline" })).toContain("border border-line text-ink hover:border-strong hover:bg-surface");
  });

  it("has a large size (52 on mobile, 56 on desktop) and a medium one (48)", () => {
    expect(buttonClass({ variant: "black" }).split(" ")).toEqual(expect.arrayContaining(["h-13", "lg:h-14"]));
    expect(buttonClass({ variant: "black", size: "md" })).toContain("h-12");
  });

  it("fills the row when asked", () => {
    expect(buttonClass({ variant: "black", block: true })).toContain("w-full");
    expect(buttonClass({ variant: "black" })).not.toContain("w-full");
  });

  it("eases hover and press with the shared fast transition and presses to 0.97", () => {
    const classes = buttonClass({ variant: "cobalt" });
    expect(classes).toContain("transition-fast");
    expect(classes).toContain("active:scale-[0.97]");
    expect(classes).not.toContain("transition-all");
  });
});

describe("ButtonLink", () => {
  it("is named by its prefix and label together", () => {
    render(
      <ButtonLink href="/en/experience/" variant="black" arrow="desktop">
        <ButtonPrefix variant="black">Hiring?</ButtonPrefix> See my CV &amp; experience
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "Hiring? See my CV & experience" });
    expect(link).toHaveAttribute("href", "/en/experience/");
    // The arrow shows on desktop only and is decorative.
    expect(link.querySelector("svg")).toHaveClass("hidden", "lg:block");
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses a plain anchor for files and other sites", () => {
    render(
      <>
        <ButtonLink href="/cv/cv.pdf" variant="black" size="md">
          CV
        </ButtonLink>
        <ButtonLink href="mailto:a@b.co" variant="outline">
          Email
        </ButtonLink>
      </>,
    );
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute("href", "/cv/cv.pdf");
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute("href", "mailto:a@b.co");
  });

  it("shows the arrow at every width when asked", () => {
    render(
      <ButtonLink href="/en/contact/" variant="cobalt" arrow="always">
        Start a project
      </ButtonLink>,
    );
    expect(screen.getByRole("link", { name: "Start a project" }).querySelector("svg")).not.toHaveClass("hidden");
  });
});

describe("Button", () => {
  it("stays focusable while busy but says so", () => {
    render(
      <Button variant="cobalt" busy>
        Sending…
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Sending…" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).not.toBeDisabled();
  });

  it("is a submit button only when asked", () => {
    render(<Button variant="outline">Again</Button>);
    expect(screen.getByRole("button", { name: "Again" })).toHaveAttribute("type", "button");
  });
});
