import { describe, expect, it } from "vitest";
import { pageId } from "./ids";

describe("pageId", () => {
  it("scopes an id to its page and language, because Next keeps visited pages in the DOM", () => {
    expect(pageId("home", "work", "en")).toBe("home-work-en");
    expect(pageId("work", "talk", "ar")).not.toBe(pageId("home", "talk", "ar"));
  });
});
