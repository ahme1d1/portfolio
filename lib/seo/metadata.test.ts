import { describe, expect, it } from "vitest";
import { buildMetadata, notFoundTitle } from "./metadata";

const seo = { title: "Contact me about a role or a project", description: "Write to me." };

describe("buildMetadata", () => {
  it("appends the name in the page's language to the title", () => {
    expect(buildMetadata({ locale: "en", path: "/contact/", seo }).title).toEqual({
      absolute: "Contact me about a role or a project | Ahmed Gabal",
    });
    expect(buildMetadata({ locale: "ar", path: "/contact/", seo }).title).toEqual({
      absolute: "Contact me about a role or a project | أحمد جبل",
    });
  });

  it("links both languages, with English as x-default", () => {
    const { alternates } = buildMetadata({ locale: "ar", path: "/work/qima/", seo });
    expect(alternates).toEqual({
      canonical: "/ar/work/qima/",
      languages: { en: "/en/work/qima/", ar: "/ar/work/qima/", "x-default": "/en/work/qima/" },
    });
  });

  it("describes the page for link previews", () => {
    const { openGraph, description } = buildMetadata({ locale: "ar", path: "/", seo });
    expect(description).toBe("Write to me.");
    expect(openGraph).toMatchObject({
      type: "website",
      url: "/ar/",
      locale: "ar_EG",
      siteName: "أحمد جبل",
      title: "Contact me about a role or a project | أحمد جبل",
      description: "Write to me.",
    });
  });

  it("can keep a page out of search results", () => {
    expect(buildMetadata({ locale: "en", path: "/", seo, noIndex: true }).robots).toEqual({ index: false });
    expect(buildMetadata({ locale: "en", path: "/", seo }).robots).toBeUndefined();
  });
});

describe("notFoundTitle", () => {
  it("names the page in each language", () => {
    expect(notFoundTitle("en")).toBe("Page not found: old or mistyped link | Ahmed Gabal");
    expect(notFoundTitle("ar")).toBe("الصفحة غير موجودة | أحمد جبل");
  });
});
