import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getAboutCopy } from "@/content/about";
import { AboutView } from "./AboutView";
import { QuickFacts } from "./QuickFacts";

describe("AboutView", () => {
  it("introduces Ahmed beside his portrait, which loads first", () => {
    const { container } = render(<AboutView locale="en" />);
    expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Ahmed Gabal" })).toHaveAttribute("fetchpriority", "high");
    expect(container.querySelectorAll('[fetchpriority="high"]')).toHaveLength(1);
    expect(screen.getByText(/^Features move one at a time/)).toBeInTheDocument();
  });

  it("links to the full experience and the Fantasy EG case study, and nowhere to the CV", () => {
    render(<AboutView locale="en" />);
    expect(screen.getByRole("link", { name: "Full experience" })).toHaveAttribute("href", "/en/experience/");
    expect(screen.getByRole("link", { name: "Fantasy EG case study" })).toHaveAttribute("href", "/en/work/fantasy-eg/");
    expect(screen.queryByRole("link", { name: /CV/ })).not.toBeInTheDocument();
  });

  it("lists how I work as four headed rows", () => {
    render(<AboutView locale="en" />);
    const section = screen.getByRole("region", { name: "How I work" });
    expect(within(section).getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });

  it("gives the quick facts with the availability line from Home, and no empty outside-work panel", () => {
    render(<AboutView locale="en" />);
    const section = screen.getByRole("region", { name: "Quick facts" });
    expect(within(section).getAllByRole("term").map((dt) => dt.textContent)).toEqual([
      "Based in",
      "Experience",
      "Languages",
      "Education",
      "Availability",
    ]);
    expect(within(section).getByText("Open to new opportunities and freelance projects")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Outside work" })).not.toBeInTheDocument();
    expect(document.body.textContent).not.toContain("[");
  });

  it("ends with the Let's talk band", () => {
    render(<AboutView locale="en" />);
    expect(screen.getByRole("heading", { level: 2, name: "Let's talk." })).toBeInTheDocument();
  });

  it("speaks Arabic, saying what the English says", () => {
    render(<AboutView locale="ar" />);
    expect(screen.getByRole("heading", { level: 1, name: "نبذة عني" })).toBeInTheDocument();
    expect(screen.getByText(/^إلى جانب عملي في/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "دراسة حالة Fantasy EG" })).toHaveAttribute("href", "/ar/work/fantasy-eg/");
  });
});

describe("QuickFacts", () => {
  it("shows the outside-work panel once Ahmed writes it", () => {
    const copy = getAboutCopy("en");
    render(<QuickFacts locale="en" copy={{ ...copy, outside: { ...copy.outside, text: "Football on Fridays." } }} />);
    const panel = screen.getByRole("complementary", { name: "Outside work" });
    expect(within(panel).getByText("Football on Fridays.")).toBeInTheDocument();
  });
});
