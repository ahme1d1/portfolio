import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PORTRAIT_PATH, SHARE_IMAGE_PATHS } from "@/content/links";
import { buildMetadata, notFoundTitle } from "./metadata";

/** A PNG's or JPEG's pixel size, read from the file in public/. */
function imageSize(path: string): { width: number; height: number } {
  const bytes = readFileSync(`public${path}`);
  if (bytes.readUInt32BE(0) === 0x89504e47) return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  // JPEG: walk the segments to the start-of-frame marker.
  let offset = 2;
  while (offset < bytes.length) {
    const marker = bytes.readUInt16BE(offset);
    if (marker >= 0xffc0 && marker <= 0xffc3) return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    offset += 2 + bytes.readUInt16BE(offset + 2);
  }
  throw new Error(`No image size in ${path}`);
}

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

  it("shows the page language's card in link previews, as a large card on X too", () => {
    const { openGraph, twitter } = buildMetadata({ locale: "ar", path: "/work/", seo });
    const image = { url: "/share/ahmed-gabal-ar.png", width: 1200, height: 630, alt: "أحمد جبل، مهندس واجهات أمامية أول" };
    expect(openGraph).toMatchObject({ images: [image], alternateLocale: ["en_US"] });
    expect(twitter).toEqual({
      card: "summary_large_image",
      title: "Contact me about a role or a project | أحمد جبل",
      description: "Write to me.",
      images: [image],
    });
    expect(buildMetadata({ locale: "en", path: "/", seo }).openGraph).toMatchObject({
      images: [{ url: "/share/ahmed-gabal-en.png", alt: "Ahmed Gabal, Senior Frontend Engineer" }],
      alternateLocale: ["ar_EG"],
    });
  });

  it("points at share images that exist, at the size it declares", () => {
    for (const path of Object.values(SHARE_IMAGE_PATHS)) expect(imageSize(path)).toEqual({ width: 1200, height: 630 });
    const portrait = imageSize(PORTRAIT_PATH);
    expect(portrait.width).toBe(portrait.height);
    expect(portrait.width).toBeGreaterThanOrEqual(400);
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
