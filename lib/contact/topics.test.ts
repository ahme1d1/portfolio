import { describe, expect, it } from "vitest";
import { contactHref, isTopic, TOPICS } from "./topics";

describe("topics", () => {
  it("are a role, a project or something else", () => {
    expect(TOPICS).toEqual(["role", "project", "other"]);
    expect(isTopic("project")).toBe(true);
    expect(isTopic("job")).toBe(false);
    expect(isTopic(null)).toBe(false);
  });

  it("build the contact link that pre-selects a topic", () => {
    expect(contactHref("en", "role")).toBe("/en/contact/?topic=role");
    expect(contactHref("ar", "project")).toBe("/ar/contact/?topic=project");
    expect(contactHref("en")).toBe("/en/contact/");
  });
});
