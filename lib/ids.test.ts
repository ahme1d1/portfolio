import { describe, expect, it } from "vitest";
import { caseScope, pageId } from "./ids";

describe("pageId", () => {
  it("scopes an id to its page and language, because Next keeps visited pages in the DOM", () => {
    expect(pageId("home", "work", "en")).toBe("home-work-en");
    expect(pageId("work", "talk", "ar")).not.toBe(pageId("home", "talk", "ar"));
  });

  it("scopes case-study ids to their case, so two kept case pages never share one", () => {
    expect(pageId(caseScope("qima"), "problem", "en")).toBe("case-qima-problem-en");
    expect(pageId(caseScope("qima"), "talk", "en")).not.toBe(pageId(caseScope("tikvideo"), "talk", "en"));
  });
});
