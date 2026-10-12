import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Locale } from "@/lib/i18n/locale";
import { VodafoneArchitecture } from "./VodafoneArchitecture";
import { VodafoneHero } from "./VodafoneHero";
import { VodafoneSteps } from "./VodafoneSteps";
import { VodafoneTable } from "./VodafoneTable";
import { VodafoneTools } from "./VodafoneTools";

const FIGURES = [
  ["VodafoneHero", VodafoneHero],
  ["VodafoneArchitecture", VodafoneArchitecture],
  ["VodafoneTable", VodafoneTable],
  ["VodafoneTools", VodafoneTools],
  ["VodafoneSteps", VodafoneSteps],
] as const;

const LOCALES = ["en", "ar"] as const satisfies readonly Locale[];

/** Text split across <bdi> runs, read as one string with single spaces. */
const textOf = (element: Element) => (element.textContent ?? "").replace(/\s+/g, " ").trim();

describe.each(FIGURES)("%s", (_name, Figure) => {
  it.each(LOCALES)("has no ids, so two languages can share the DOM during a page change (%s)", (locale) => {
    const { container } = render(<Figure locale={locale} />);
    expect(container.querySelector("[id]")).toBeNull();
  });

  it("sets every Latin word of the Arabic labels in an English <bdi>", () => {
    const { container } = render(<Figure locale="ar" />);
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const unmarked: string[] = [];
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const isLatin = /[A-Za-z]/.test(node.textContent ?? "");
      if (isLatin && !node.parentElement?.closest('bdi[lang="en"]')) unmarked.push(node.textContent ?? "");
    }
    expect(unmarked).toEqual([]);
  });
});

describe("VodafoneHero", () => {
  it("draws the page before and during the migration, with its tiles as text", () => {
    const { container } = render(<VodafoneHero locale="en" />);
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("During the migration")).toBeInTheDocument();
    expect(screen.getByText("A legacy jQuery page in the OpenText CMS")).toBeInTheDocument();
    expect(screen.getAllByText("jQuery widget")).toHaveLength(6);
    expect(screen.getAllByText("React module")).toHaveLength(2);
    expect(screen.getByText("jQuery DataTables")).toBeInTheDocument();
    expect(screen.getByText("React data table")).toBeInTheDocument();
    expect(screen.getByText("One module at a time")).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"] svg, svg[aria-hidden="true"]')).not.toBeNull();
  });

  it("renders only the drawing: the hero adds the figure and its caption", () => {
    const { container } = render(<VodafoneHero locale="en" />);
    expect(container.querySelector("figure, figcaption")).toBeNull();
  });

  it("draws the Arabic labels", () => {
    const { container } = render(<VodafoneHero locale="ar" />);
    expect(screen.getByText("قبل")).toBeInTheDocument();
    expect(screen.getByText("أثناء الانتقال")).toBeInTheDocument();
    expect(textOf(container)).toContain("وحدة React");
    expect(textOf(container)).toContain("وحدة في كل مرة");
  });
});

describe("VodafoneArchitecture", () => {
  it("shows the API layer, the modules behind their flags and the callback bus, with the caption", () => {
    const { container } = render(<VodafoneArchitecture locale="en" />);
    const figure = container.querySelector("figure");
    expect(figure).not.toBeNull();
    expect(screen.getByText("Typed API layer")).toBeInTheDocument();
    expect(screen.getByText("Cancels superseded requests")).toBeInTheDocument();
    expect(screen.getByText("Request 1 canceled").closest("s")).not.toBeNull();
    expect(screen.getByText("Request 2 is used")).toBeInTheDocument();
    expect(screen.getAllByText("React module")).toHaveLength(2);
    expect(screen.getAllByText("Flag on")).toHaveLength(2);
    expect(screen.getByText("Switched off")).toBeInTheDocument();
    expect(screen.getByText("and the legacy widget is back")).toBeInTheDocument();
    expect(screen.getByText("Kill switch")).toBeInTheDocument();
    expect(screen.getByText("Typed callback bus")).toBeInTheDocument();
    expect(container.querySelector("figcaption")).toHaveTextContent(/^Each module ships behind its own flag, per environment\./);
  });

  it("keeps the toggles and connecting lines away from screen readers", () => {
    const { container } = render(<VodafoneArchitecture locale="en" />);
    expect(container.querySelectorAll('[data-toggle][aria-hidden="true"]')).toHaveLength(3);
    expect(container.querySelectorAll("[data-toggle]:not([aria-hidden])")).toHaveLength(0);
  });

  it("draws the Arabic labels", () => {
    const { container } = render(<VodafoneArchitecture locale="ar" />);
    expect(screen.getByText("طبقة واجهة برمجية محددة الأنواع")).toBeInTheDocument();
    expect(screen.getByText("الطلب 1 مُلغى").closest("s")).not.toBeNull();
    expect(screen.getAllByText("المفتاح مفعّل")).toHaveLength(2);
    expect(screen.getByText("مفتاح الإيقاف")).toBeInTheDocument();
    expect(container.querySelector("figcaption")).toHaveTextContent(/^لكل وحدة مفتاح إطلاق خاص بها/);
  });
});

describe("VodafoneTable", () => {
  it("joins the two legacy tables into one component with its features listed", () => {
    const { container } = render(<VodafoneTable locale="en" />);
    expect(screen.getAllByText("Legacy")).toHaveLength(2);
    expect(screen.getByText("JSON-driven table path")).toBeInTheDocument();
    expect(screen.getByText("React and TypeScript data table")).toBeInTheDocument();
    const features = screen.getByRole("list", { name: "Table features" });
    expect(within(features).getAllByRole("listitem")).toHaveLength(6);
    expect(within(features).getByText("Merged-cell sorting")).toBeInTheDocument();
    expect(container.querySelector("figcaption")).toBeNull();
  });

  it("names the feature list in Arabic", () => {
    render(<VodafoneTable locale="ar" />);
    const features = screen.getByRole("list", { name: "ميزات الجدول" });
    expect(within(features).getAllByRole("listitem")).toHaveLength(6);
  });
});

describe("VodafoneTools", () => {
  it.each([
    ["en", "Customer number lookup"],
    ["ar", "البحث برقم العميل"],
  ] as const)("lists the three internal tools (%s)", (locale, first) => {
    render(<VodafoneTools locale={locale} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent(first);
  });
});

describe("VodafoneSteps", () => {
  it.each([
    ["en", "How a rule moves across", "Read the legacy code", "Ship the module"],
    ["ar", "كيف تنتقل القاعدة", "قراءة الكود القديم", "إطلاق الوحدة"],
  ] as const)("numbers the four steps in order (%s)", (locale, label, first, last) => {
    render(<VodafoneSteps locale={locale} />);
    const steps = within(screen.getByRole("list", { name: label })).getAllByRole("listitem");
    expect(steps).toHaveLength(4);
    expect(steps[0]).toHaveTextContent(`1${first}`);
    expect(steps[3]).toHaveTextContent(`4${last}`);
  });

  it("marks the last step as the one that ships", () => {
    render(<VodafoneSteps locale="en" />);
    const steps = screen.getAllByRole("listitem");
    expect(steps.map((step) => step.hasAttribute("data-last"))).toEqual([false, false, false, true]);
  });
});
