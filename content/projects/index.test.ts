import { describe, expect, it } from "vitest";
import { CASE_SLUGS, MORE_PROJECT_SLUGS } from "@/content/cases/slugs";
import { getProjectCard } from "./index";

describe("getProjectCard", () => {
  it("uses the brand as the title when the copy has none, marked Latin in Arabic", () => {
    expect(getProjectCard("en", "fantasy-eg").title).toBe("Fantasy EG");
    expect(getProjectCard("ar", "fantasy-eg").title).toBe("{Fantasy EG}");
    expect(getProjectCard("ar", "fantasy-eg").hasTitleNote).toBe(false);
    expect(getProjectCard("ar", "tikvideo").hasTitleNote).toBe(true);
  });

  it("names each card link after its project", () => {
    expect(getProjectCard("en", "qima").linkSuffix).toBe(": Qima");
    expect(getProjectCard("ar", "vodafone-modernization").linkSuffix).toBe(" لمشروع تحديث نظام فودافون");
  });

  it("links to the case study in the page's language", () => {
    expect(getProjectCard("ar", "lean-academy").href).toBe("/ar/work/lean-academy/");
  });

  it("gives the three main projects a status and the client projects none", () => {
    expect(getProjectCard("en", "fantasy-eg").status).toEqual({ kind: "live", label: "Live" });
    expect(getProjectCard("ar", "educoursez").status).toEqual({ kind: "inDevelopment", label: "قيد التطوير" });
    for (const slug of MORE_PROJECT_SLUGS) expect(getProjectCard("en", slug).status).toBeNull();
  });

  it("joins the stack into one Latin line", () => {
    expect(getProjectCard("ar", "qima").stack).toBe("Angular 20, Tailwind CSS, PrimeNG");
  });

  it("gives every screenshot plain alt text", () => {
    for (const locale of ["en", "ar"] as const) {
      for (const slug of CASE_SLUGS) {
        const { media } = getProjectCard(locale, slug);
        const alts = media.kind === "image" ? [media.alt] : media.kind === "phones" ? media.images.map((i) => i.alt) : [];
        for (const alt of alts) expect(alt).toMatch(/^[^{}*]+$/);
      }
    }
    expect(getProjectCard("ar", "fantasy-eg").media).toMatchObject({ alt: "موقع Fantasy EG بالعربية" });
  });

  it("labels the drawn mockups", () => {
    expect(getProjectCard("en", "vodafone-modernization").media).toMatchObject({
      kind: "vodafone",
      labels: { before: "Before", after: "Now, still live" },
    });
    expect(getProjectCard("en", "lean-academy").media).toMatchObject({
      kind: "lean",
      labels: { sections: ["Hero", "Courses", "Footer"], result: "Website builder" },
    });
  });
});
