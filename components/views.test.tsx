import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutView } from "@/components/about/AboutView";
import { CaseStudyView } from "@/components/case/CaseStudyView";
import { ContactView } from "@/components/contact/ContactView";
import { ExperienceView } from "@/components/experience/ExperienceView";
import { HomeView } from "@/components/home/HomeView";
import { ServicesView } from "@/components/services/ServicesView";
import { EarlierWork } from "@/components/work/EarlierWork";
import { WorkView } from "@/components/work/WorkView";
import { CASE_SLUGS } from "@/content/cases/slugs";
import { LOCALES, type Locale } from "@/lib/i18n/locale";
import { router } from "@/tests/mocks/next";

function headingLevels(container: HTMLElement): number[] {
  return [...container.querySelectorAll("h1, h2, h3, h4")].map((h) => Number(h.tagName[1]));
}

const caseView = (slug: (typeof CASE_SLUGS)[number]) =>
  function CaseView({ locale }: { locale: Locale }) {
    return <CaseStudyView locale={locale} slug={slug} />;
  };

type View = (props: { locale: Locale }) => React.ReactNode;

const VIEWS: readonly (readonly [string, View])[] = [
  ["Home", HomeView],
  ["Work", WorkView],
  ...CASE_SLUGS.map((slug) => [slug, caseView(slug)] as const),
  ["Contact", ContactView],
  ["About", AboutView],
  ["Services", ServicesView],
  ["Experience", ExperienceView],
];

describe.each(LOCALES)("pages in %s", (locale) => {
  it.each(VIEWS)("%s has one h1 and never skips a heading level", (_, View) => {
    router.pathname = `/${locale}/`;
    const { container } = render(<View locale={locale} />);
    const levels = headingLevels(container);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    levels.forEach((level, index) => {
      if (index > 0) expect(level - (levels[index - 1] ?? 1)).toBeLessThanOrEqual(1);
    });
  });
});

describe("page ids", () => {
  it("never repeat, even with every page mounted in both languages at once", () => {
    // Next keeps up to three visited pages in the DOM, hidden, so ids must not collide across them.
    const { container } = render(
      <>
        {LOCALES.map((locale) => (
          <div key={locale}>
            {VIEWS.map(([name, View]) => (
              <View key={name} locale={locale} />
            ))}
          </div>
        ))}
      </>,
    );
    const ids = [...container.querySelectorAll("[id]")].map((element) => element.id);
    expect(ids.length).toBeGreaterThan(10);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });
});

describe("Work", () => {
  it("shows the three main projects and the four client projects", () => {
    render(<WorkView locale="en" />);
    expect(screen.getAllByRole("article")).toHaveLength(7);
    // No "client project" pill: pills show a status only.
    expect(screen.queryByText("Client project")).not.toBeInTheDocument();
  });

  it("lists earlier work as a table with row headers, and grouped by company with the years", () => {
    render(<EarlierWork locale="en" />);
    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("rowheader")).toHaveLength(13);
    expect(within(table).getByRole("rowheader", { name: "Curium corporate website" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "EVA Pharma 2022 – 2023" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Baianat 2021 – 2022" })).toBeInTheDocument();
  });
});

describe("Home", () => {
  it("opens with the hero sentence and the two doors", () => {
    render(<HomeView locale="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "I build and modernize large web apps in React and TypeScript, in English and Arabic.",
    );
    expect(screen.getByRole("link", { name: "Hiring? See my CV & experience" })).toHaveAttribute("href", "/en/experience/");
    expect(screen.getByRole("link", { name: "Have a project? Let's build it" })).toHaveAttribute("href", "/en/contact/?topic=project");
    expect(screen.getByRole("img", { name: "Ahmed Gabal" })).toHaveAttribute("fetchpriority", "high");
  });

  it("links each employer from its role", () => {
    render(<HomeView locale="ar" />);
    expect(screen.getByRole("link", { name: "إيفا فارما" })).toHaveAttribute("href", "https://evapharma.com/");
    expect(screen.getByRole("heading", { level: 3, name: /مهندس واجهات أمامية أول، VOIS \(فودافون\)/ })).toBeInTheDocument();
  });
});
