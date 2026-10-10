import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { caseModules } from "@/content/cases";
import { CASE_DATA } from "@/content/cases/data";
import { MORE_PROJECT_SLUGS, nextCaseSlug } from "@/content/cases/slugs";
import { PROJECTS } from "@/content/projects/data";
import { LOCALES } from "@/lib/i18n/locale";
import { CaseStudyView } from "./CaseStudyView";

/** The mirror names a page gives its moving blocks, made visible to the tests. */
vi.mock("@/components/motion/MirrorBlock", () => ({
  MirrorBlock: ({ name, children }: { name: string; children: React.ReactNode }) => <div data-mirror={name}>{children}</div>,
}));

function mirrorNames(container: HTMLElement): string[] {
  return [...container.querySelectorAll("[data-mirror]")].map((element) => element.getAttribute("data-mirror") ?? "");
}

const CASES = caseModules().map(([slug]) => slug);

describe.each(CASES)("the %s case study", (slug) => {
  const data = CASE_DATA[slug];

  it.each(LOCALES)("shows no placeholder or unfilled number (%s)", (locale) => {
    const { container } = render(<CaseStudyView locale={locale} slug={slug} />);
    expect(container.textContent).not.toMatch(/\[|add the real|أضف الرقم/);
  });

  it.each(LOCALES)("loads only the hero's main image first (%s)", (locale) => {
    const { container } = render(<CaseStudyView locale={locale} slug={slug} />);
    const eager = container.querySelectorAll('img[fetchpriority="high"]');
    expect(eager).toHaveLength(data.hero.kind === "diagram" ? 0 : 1);
  });

  it("names its moving blocks once each, the same in both languages", () => {
    const names = LOCALES.map((locale) => {
      const { container, unmount } = render(<CaseStudyView locale={locale} slug={slug} />);
      const found = mirrorNames(container);
      unmount();
      return found;
    });
    const [english = [], arabic = []] = names;
    expect(new Set(english).size).toBe(english.length);
    expect(arabic).toEqual(english);
  });

  it("ends with the next case study, as one link named by its label and title", () => {
    render(<CaseStudyView locale="en" slug={slug} />);
    const next = nextCaseSlug(slug);
    const link = screen.getByRole("link", { name: new RegExp(`^Next case study ${PROJECTS[next].brand}`) });
    expect(link).toHaveAttribute("href", `/en/work/${next}/`);
  });

  it("goes back to Work from the breadcrumb", () => {
    render(<CaseStudyView locale="en" slug={slug} />);
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "Work" })).toHaveAttribute("href", "/en/work/");
    expect(within(breadcrumb).getByText((_, element) => element?.getAttribute("aria-current") === "page")).toBeInTheDocument();
  });

  it("lists the stack left to right, from the data", () => {
    render(<CaseStudyView locale="ar" slug={slug} />);
    const stack = screen.getByText(data.stack.join(", "));
    expect(stack.closest("bdi")).toHaveAttribute("dir", "ltr");
  });
});

describe.each(CASES.filter((slug) => MORE_PROJECT_SLUGS.includes(slug)))("the %s client project", (slug) => {
  it.each(LOCALES)("shows no status pill and no year (%s)", (locale) => {
    const { container } = render(<CaseStudyView locale={locale} slug={slug} />);
    expect(container.querySelector("[data-status]")).toBeNull();
    expect(container.textContent).not.toMatch(/\b(19|20)\d{2}\b/);
  });
});

describe("the Fantasy EG case study", () => {
  it("links to the live site with the domain kept left to right", () => {
    render(<CaseStudyView locale="ar" slug="fantasy-eg" />);
    const link = screen.getByRole("link", { name: "زيارة fantasyeg.com" });
    expect(link).toHaveAttribute("href", "https://fantasyeg.com");
    expect(within(link).getByText("fantasyeg.com")).toHaveAttribute("dir", "ltr");
  });

  it("shows its status and the live dot on each platform that is live", () => {
    const { container } = render(<CaseStudyView locale="en" slug="fantasy-eg" />);
    expect(container.querySelector('[data-status="live"]')).toHaveTextContent("Live");
    const facts = screen.getByRole("region", { name: "Project facts" });
    expect(within(facts).getAllByRole("listitem")).toHaveLength(5);
    expect(facts.querySelectorAll("[data-dot]")).toHaveLength(4);
  });

  it("leaves out the result numbers Ahmed has not given yet", () => {
    render(<CaseStudyView locale="en" slug="fantasy-eg" />);
    const result = screen.getByRole("region", { name: "Result" });
    expect(within(result).queryByRole("term")).toBeNull();
    expect(result).not.toHaveTextContent("Managers signed up");
  });

  it("puts the decisions under the section heading and the lessons in their own section", () => {
    render(<CaseStudyView locale="en" slug="fantasy-eg" />);
    expect(screen.getByRole("heading", { level: 3, name: "Design before code" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "What I learned" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Ideas I dropped" })).toBeInTheDocument();
  });
});
