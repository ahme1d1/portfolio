import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { COMPANIES } from "@/content/companies/data";
import { CV_PATH } from "@/content/links";
import { LOCALES } from "@/lib/i18n/locale";
import { ExperienceView } from "./ExperienceView";

function headingLevels(container: HTMLElement): number[] {
  return [...container.querySelectorAll("h1, h2, h3, h4")].map((heading) => Number(heading.tagName[1]));
}

/** The timeline's own items: the bullets inside them are lists too. */
function roleItems(): HTMLElement[] {
  const roles = screen.getByRole("region", { name: /^(Roles|الوظائف)$/ });
  const timeline = roles.querySelector("ol");
  if (timeline === null) throw new Error("The roles have no ordered list.");
  return [...timeline.children] as HTMLElement[];
}

describe.each(LOCALES)("ExperienceView (%s)", (locale) => {
  it("has one h1 and never skips a heading level", () => {
    const { container } = render(<ExperienceView locale={locale} />);
    const levels = headingLevels(container);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    levels.forEach((level, index) => {
      if (index > 0) expect(level - (levels[index - 1] ?? 1)).toBeLessThanOrEqual(1);
    });
  });

  it("lists the three roles, newest first, each linking to its company", () => {
    render(<ExperienceView locale={locale} />);
    const items = roleItems();
    expect(items.map((item) => item.tagName)).toEqual(["LI", "LI", "LI"]);
    const urls = [COMPANIES.vois.url, COMPANIES.evaPharma.url, COMPANIES.baianat.url];
    items.forEach((item, index) => {
      const heading = within(item).getAllByRole("heading", { level: 3 })[0];
      expect(heading).toBeDefined();
      expect(within(heading as HTMLElement).getByRole("link")).toHaveAttribute("href", urls[index]);
    });
  });

  it("gives the EVA Pharma row the id the Services page links to", () => {
    render(<ExperienceView locale={locale} />);
    expect(roleItems()[1]).toHaveAttribute("id", `experience-eva-pharma-${locale}`);
  });

  it("draws the timeline's dots and line for sighted readers only", () => {
    render(<ExperienceView locale={locale} />);
    const [current, past, first] = roleItems();
    expect(current?.querySelectorAll(':scope > [aria-hidden="true"]')).toHaveLength(2);
    expect(past?.querySelectorAll(':scope > [aria-hidden="true"]')).toHaveLength(2);
    // The oldest role has a dot but no line running on below it.
    expect(first?.querySelectorAll(':scope > [aria-hidden="true"]')).toHaveLength(1);
    expect(current?.querySelector("[data-dot]")).toHaveAttribute("data-dot", "current");
    expect(past?.querySelector("[data-dot]")).toHaveAttribute("data-dot", "past");
  });

  it("shows no placeholder brackets and no em dash", () => {
    const { container } = render(<ExperienceView locale={locale} />);
    expect(container.textContent).not.toMatch(/[[\]—]/);
  });

  it("ends with the Let's talk band", () => {
    render(<ExperienceView locale={locale} />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.at(-1)).toHaveAttribute("id", `experience-talk-${locale}`);
  });
});

describe("ExperienceView in English", () => {
  it("offers the CV and the contact page beside the title", () => {
    render(<ExperienceView locale="en" />);
    expect(screen.getByRole("heading", { level: 1, name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download CV (PDF)" })).toHaveAttribute("href", CV_PATH);
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/en/contact/");
  });

  it("formats each role's dates from the data", () => {
    render(<ExperienceView locale="en" />);
    const [vois, eva, baianat] = roleItems();
    expect(vois).toHaveTextContent("Jan 2024 – present");
    expect(eva).toHaveTextContent("May 2022 – Dec 2023");
    expect(baianat).toHaveTextContent("May 2021 – May 2022");
  });

  it("names the company in the role title with one link", () => {
    render(<ExperienceView locale="en" />);
    const title = screen.getByRole("heading", { level: 3, name: "Senior Frontend Engineer, VOIS (Vodafone Intelligent Solutions)" });
    expect(within(title).getAllByRole("link")).toHaveLength(1);
  });

  it("keeps the Vodafone Italy role inside VOIS, under its own h4", () => {
    render(<ExperienceView locale="en" />);
    const [vois] = roleItems();
    const italy = within(vois as HTMLElement).getByRole("heading", { level: 4, name: "Vodafone Italy: Angular Developer" });
    expect(italy).toBeInTheDocument();
    expect(within(vois as HTMLElement).getByText("Angular, RxJS, NgRx, Angular Signals")).toBeInTheDocument();
  });

  it("writes the bullets as plain sentences, with no bold lead-in", () => {
    render(<ExperienceView locale="en" />);
    const [vois] = roleItems();
    expect((vois as HTMLElement).querySelector("li strong")).toBeNull();
  });

  it("lists selected projects and dashboards as chips", () => {
    render(<ExperienceView locale="en" />);
    const [, eva, baianat] = roleItems();
    const evaChips = within(eva as HTMLElement).getByText("Selected projects").nextElementSibling;
    expect(evaChips?.tagName).toBe("UL");
    expect(within(evaChips as HTMLElement).getAllByRole("listitem")).toHaveLength(4);
    const dashboards = within(baianat as HTMLElement).getByText("Admin dashboards").nextElementSibling;
    expect(within(dashboards as HTMLElement).getAllByRole("listitem")).toHaveLength(6);
    expect(dashboards).toHaveAttribute("data-chips", "outline");
    expect(evaChips).toHaveAttribute("data-chips", "filled");
  });

  it("lists eight skills, Core first", () => {
    render(<ExperienceView locale="en" />);
    const skills = screen.getByRole("region", { name: "Skills" });
    const terms = within(skills).getAllByRole("term");
    expect(terms).toHaveLength(8);
    expect(terms[0]).toHaveTextContent("Core");
    expect(terms[7]).toHaveTextContent("Full-stack (Fantasy EG and Educoursez)");
  });

  it("shows the degree and both languages", () => {
    render(<ExperienceView locale="en" />);
    const education = screen.getByRole("region", { name: "Education" });
    expect(within(education).getByRole("heading", { level: 3, name: "Bachelor of Computer and Information Sciences" })).toBeInTheDocument();
    expect(education).toHaveTextContent("2021");
    const languages = screen.getByRole("region", { name: "Languages" });
    expect(within(languages).getAllByRole("term").map((term) => term.textContent)).toEqual(["Arabic", "English"]);
  });
});

describe("ExperienceView in Arabic", () => {
  it("speaks Arabic, with the CV label's file type kept left to right", () => {
    render(<ExperienceView locale="ar" />);
    expect(screen.getByRole("heading", { level: 1, name: "الخبرات" })).toBeInTheDocument();
    const cv = screen.getByRole("link", { name: "تنزيل السيرة الذاتية (PDF)" });
    expect(cv).toHaveAttribute("href", CV_PATH);
    expect(screen.getByRole("link", { name: "تواصل" })).toHaveAttribute("href", "/ar/contact/");
  });

  it("formats dates with Arabic month names and Western digits", () => {
    render(<ExperienceView locale="ar" />);
    const [vois, eva] = roleItems();
    expect(vois).toHaveTextContent("يناير 2024 – الآن");
    expect(eva).toHaveTextContent("مايو 2022 – ديسمبر 2023");
  });

  it("sets Latin words in left-to-right English runs", () => {
    render(<ExperienceView locale="ar" />);
    const stack = screen.getByText("React, TypeScript, Vite, Vitest");
    expect(stack.tagName).toBe("BDI");
    expect(stack).toHaveAttribute("dir", "ltr");
    expect(stack).toHaveAttribute("lang", "en");
    const dashboard = screen.getByText("Printiro Super Admin");
    expect(dashboard.tagName).toBe("BDI");
  });

  it("links the companies by their Arabic names", () => {
    render(<ExperienceView locale="ar" />);
    expect(screen.getByRole("link", { name: "إيفا فارما" })).toHaveAttribute("href", COMPANIES.evaPharma.url);
    expect(screen.getByRole("link", { name: "بيانات" })).toHaveAttribute("href", COMPANIES.baianat.url);
  });
});

describe("ExperienceView ids", () => {
  it("never repeat with both languages mounted together", () => {
    const { container } = render(
      <>
        {LOCALES.map((locale) => (
          <ExperienceView key={locale} locale={locale} />
        ))}
      </>,
    );
    const ids = [...container.querySelectorAll("[id]")].map((element) => element.id);
    expect(ids.length).toBeGreaterThan(10);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
    expect(ids.every((id) => id.startsWith("experience-"))).toBe(true);
  });

  it("names every section by its heading", () => {
    render(<ExperienceView locale="en" />);
    const names = screen.getAllByRole("region").map((region) => region.getAttribute("aria-labelledby"));
    expect(names).toEqual([
      "experience-title-en",
      "experience-roles-en",
      "experience-skills-en",
      "experience-education-en",
      "experience-languages-en",
      "experience-talk-en",
    ]);
  });
});
