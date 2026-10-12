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
    expect(screen.getByText(/^I'm a senior frontend engineer based in Egypt/)).toBeInTheDocument();
  });

  it("opens one door for hiring and one for a project, each with its own links and no CV link", () => {
    render(<AboutView locale="en" />);
    const hiring = screen.getByRole("heading", { level: 2, name: "If you're hiring" }).closest("div")!;
    expect(within(hiring).getByRole("link", { name: "Full experience" })).toHaveAttribute("href", "/en/experience/");
    expect(within(hiring).getByRole("link", { name: "Vodafone case study" })).toHaveAttribute(
      "href",
      "/en/work/vodafone-modernization/",
    );
    const project = screen.getByRole("heading", { level: 2, name: "If you have a project" }).closest("div")!;
    expect(within(project).getByRole("link", { name: "Service details" })).toHaveAttribute("href", "/en/services/");
    expect(within(project).getByRole("link", { name: "Fantasy EG case study" })).toHaveAttribute("href", "/en/work/fantasy-eg/");
    expect(screen.queryByRole("link", { name: /CV/ })).not.toBeInTheDocument();
  });

  it("leaves the migration's method to Experience and the Vodafone case study", () => {
    render(<AboutView locale="en" />);
    expect(screen.queryByRole("region", { name: "How I work" })).not.toBeInTheDocument();
    const main = document.body.textContent ?? "";
    for (const detail of ["jQuery", "kill switch", "rollout", "legacy"]) expect(main).not.toContain(detail);
  });

  it("gives the quick facts, the availability line from Home, and no empty outside-work panel or placeholder", () => {
    render(<AboutView locale="en" />);
    const section = screen.getByRole("region", { name: "Quick facts" });
    expect(within(section).getAllByRole("term").map((dt) => dt.textContent)).toEqual([
      "Based in",
      "Work",
      "Experience",
      "Languages",
      "Education",
      "Availability",
    ]);
    expect(within(section).getByText("Remote, open to relocating to the GCC")).toBeInTheDocument();
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
    expect(screen.getByRole("heading", { level: 2, name: "إذا كنت توظّف" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "إذا كان لديك مشروع" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "دراسة حالة Fantasy EG" })).toHaveAttribute("href", "/ar/work/fantasy-eg/");
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
