import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/i18n/locale";
import { ServicesView } from "./ServicesView";

function headingLevels(container: HTMLElement): number[] {
  return [...container.querySelectorAll("h1, h2, h3, h4")].map((heading) => Number(heading.tagName[1]));
}

describe.each(LOCALES)("ServicesView (%s)", (locale) => {
  it("has one h1 and never skips a heading level", () => {
    const { container } = render(<ServicesView locale={locale} />);
    const levels = headingLevels(container);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    levels.forEach((level, index) => {
      if (index > 0) expect(level - (levels[index - 1] ?? 1)).toBeLessThanOrEqual(1);
    });
  });

  it("shows no placeholder and no note to Ahmed", () => {
    const { container } = render(<ServicesView locale={locale} />);
    expect(container.textContent).not.toMatch(/\[|\]|Ahmed:|أحمد:/);
  });

  it("names every section by its heading", () => {
    const { container } = render(<ServicesView locale={locale} />);
    const sections = [...container.querySelectorAll("section")];
    expect(sections.length).toBeGreaterThanOrEqual(5);
    for (const section of sections) {
      const labelledBy = section.getAttribute("aria-labelledby") ?? "";
      expect(container.querySelector(`[id="${labelledBy}"]`)?.tagName).toMatch(/^H[12]$/);
    }
  });

  it("names every service by its h3, with a check list of what you get", () => {
    render(<ServicesView locale={locale} />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(4);
    for (const article of articles) {
      const labelledBy = article.getAttribute("aria-labelledby") ?? "";
      expect(article.querySelector(`[id="${labelledBy}"]`)?.tagName).toBe("H3");
      expect(within(article).getByRole("heading", { level: 4 })).toBeInTheDocument();
      const items = within(article).getAllByRole("listitem");
      expect(items.every((item) => item.querySelector('svg[aria-hidden="true"]') !== null)).toBe(true);
    }
  });

  it("runs a project in four numbered steps, the numbers hidden from screen readers", () => {
    render(<ServicesView locale={locale} />);
    const steps = screen.getAllByRole("list").find((list) => list.tagName === "OL");
    expect(steps).toBeDefined();
    const items = within(steps as HTMLElement).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    items.forEach((item, index) => {
      expect(within(item).getByRole("heading", { level: 3 })).toBeInTheDocument();
      expect(item.querySelector('[aria-hidden="true"]')?.textContent).toBe(String(index + 1));
    });
  });

  it("links the EVA Pharma sites to their row on Experience, with this language's id", () => {
    const { container } = render(<ServicesView locale={locale} />);
    const href = `/${locale}/experience/#experience-eva-pharma-${locale}`;
    expect(container.querySelectorAll(`a[href="${href}"]`)).toHaveLength(1);
  });

  it("keeps the stack left to right, after its label", () => {
    const { container } = render(<ServicesView locale={locale} />);
    const stack = [...container.querySelectorAll('bdi[dir="ltr"]')].map((bdi) => bdi.textContent);
    expect(stack).toContain("React, Next.js, Vue, Nuxt, TypeScript, Tailwind CSS");
    expect(stack).toContain("Expo, React Native, TypeScript");
  });
});

describe("ServicesView in English", () => {
  it("opens with the title, the lede and two doors", () => {
    render(<ServicesView locale="en" />);
    expect(screen.getByRole("heading", { level: 1, name: "Services" })).toBeInTheDocument();
    expect(
      screen.getByText("Freelance web and mobile work in Arabic and English, with right-to-left built in from the first screen."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start a project" })).toHaveAttribute("href", "/en/contact/?topic=project");
    expect(screen.getByRole("link", { name: "See my work" })).toHaveAttribute("href", "/en/work/");
  });

  it("links each service to where it can be seen", () => {
    render(<ServicesView locale="en" />);
    const sites = screen.getByRole("article", { name: "Landing & marketing sites" });
    expect(within(sites).getByRole("link", { name: "fantasyeg.com" })).toHaveAttribute("href", "https://fantasyeg.com");
    expect(within(sites).getByRole("link", { name: "EVA Pharma & Curium sites" })).toHaveAttribute(
      "href",
      "/en/experience/#experience-eva-pharma-en",
    );
    const web = screen.getByRole("article", { name: "Web apps & dashboards" });
    expect(within(web).getByRole("link", { name: "Fantasy EG dashboard" })).toHaveAttribute("href", "/en/work/fantasy-eg/");
    expect(within(web).getByRole("link", { name: "Educoursez dashboard" })).toHaveAttribute("href", "/en/work/educoursez/");
  });

  it("lists two things you get with a mobile app", () => {
    render(<ServicesView locale="en" />);
    const mobile = screen.getByRole("article", { name: "Mobile apps" });
    expect(within(mobile).getAllByRole("listitem")).toHaveLength(2);
  });

  it("names the case study link after its project", () => {
    render(<ServicesView locale="en" />);
    expect(screen.getByRole("link", { name: "Read the case study: Fantasy EG" })).toHaveAttribute("href", "/en/work/fantasy-eg/");
  });

  it("links the enterprise years to Experience", () => {
    render(<ServicesView locale="en" />);
    const why = screen.getByRole("region", { name: "Why work with me" });
    expect(within(why).getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/en/experience/");
  });

  it("says how pricing works, then hands over to the band with its own lede", () => {
    render(<ServicesView locale="en" />);
    expect(screen.getByText("Every project is quoted after a short call. Tell me what you need.")).toBeInTheDocument();
    const band = screen.getByRole("region", { name: "Let's talk." });
    expect(within(band).getByText("Write to me about the dashboard, site, app or full product you need.")).toBeInTheDocument();
  });
});

describe("ServicesView in Arabic", () => {
  it("opens with the Arabic title and doors", () => {
    render(<ServicesView locale="ar" />);
    expect(screen.getByRole("heading", { level: 1, name: "الخدمات" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ابدأ مشروعًا" })).toHaveAttribute("href", "/ar/contact/?topic=project");
    expect(screen.getByRole("link", { name: "اطّلع على أعمالي" })).toHaveAttribute("href", "/ar/work/");
  });

  it("follows the English: two things you get with a mobile app", () => {
    render(<ServicesView locale="ar" />);
    const mobile = screen.getByRole("article", { name: "تطبيقات موبايل" });
    expect(within(mobile).getAllByRole("listitem")).toHaveLength(2);
  });

  it("names the case study link after its project", () => {
    render(<ServicesView locale="ar" />);
    expect(screen.getByRole("link", { name: "اقرأ دراسة الحالة لمشروع Fantasy EG" })).toHaveAttribute(
      "href",
      "/ar/work/fantasy-eg/",
    );
  });

  it("keeps the domain left to right", () => {
    render(<ServicesView locale="ar" />);
    const link = screen.getByRole("link", { name: "fantasyeg.com" });
    expect(link).toHaveAttribute("href", "https://fantasyeg.com");
    expect(link.querySelector("bdi")).toHaveAttribute("dir", "ltr");
  });

  it("names what to build in the band", () => {
    render(<ServicesView locale="ar" />);
    expect(screen.getByText("اكتب لي عن لوحة التحكم أو الموقع أو التطبيق أو المنتج الكامل الذي تحتاجه.")).toBeInTheDocument();
  });
});

describe("ServicesView ids", () => {
  it("never repeat with both languages mounted at once", () => {
    const { container } = render(
      <>
        {LOCALES.map((locale) => (
          <ServicesView key={locale} locale={locale} />
        ))}
      </>,
    );
    const ids = [...container.querySelectorAll("[id]")].map((element) => element.id);
    expect(ids.length).toBeGreaterThan(10);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });
});
