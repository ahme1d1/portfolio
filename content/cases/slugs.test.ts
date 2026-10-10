import { describe, expect, it } from "vitest";
import { CASE_SLUGS, MORE_PROJECT_SLUGS, isCaseSlug, nextCaseSlug } from "./slugs";

describe("case-study slugs", () => {
  it("lists the seven case studies in reading order", () => {
    expect(CASE_SLUGS).toEqual([
      "fantasy-eg",
      "educoursez",
      "vodafone-modernization",
      "tikvideo",
      "cultural-bridge",
      "qima",
      "lean-academy",
    ]);
  });

  it("marks the four agency projects as More projects", () => {
    expect(MORE_PROJECT_SLUGS).toEqual(["tikvideo", "cultural-bridge", "qima", "lean-academy"]);
  });

  it("recognises only known slugs", () => {
    expect(isCaseSlug("qima")).toBe(true);
    expect(isCaseSlug("unknown")).toBe(false);
  });

  it("loops the next case study back to the first", () => {
    expect(nextCaseSlug("fantasy-eg")).toBe("educoursez");
    expect(nextCaseSlug("vodafone-modernization")).toBe("tikvideo");
    expect(nextCaseSlug("lean-academy")).toBe("fantasy-eg");
  });
});
