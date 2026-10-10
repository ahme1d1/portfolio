import { describe, expect, it } from "vitest";
import { emailProblem, validateContact, validateField, type ContactValues } from "./schema";

const VALID: ContactValues = { topic: "project", name: "Sara Ahmed", email: "sara@company.com", message: "A booking app." };

describe("emailProblem", () => {
  it.each([
    ["", "emailMissing"],
    ["   ", "emailMissing"],
    ["sara.company.com", "emailNoAt"],
    ["@company.com", "emailNoLocal"],
    ["sara@", "emailNoDomain"],
    ["sara@company", "emailNoDomain"],
    ["sara@company.", "emailNoDomain"],
    ["sara@@company.com", "emailInvalid"],
    ["sara ahmed@company.com", "emailInvalid"],
  ])("%j → %s", (value, code) => {
    expect(emailProblem(value)).toBe(code);
  });

  it("accepts an ordinary address, with spaces around it", () => {
    expect(emailProblem(" sara@company.com ")).toBeNull();
    expect(emailProblem("sara.ahmed+site@mail.company.co")).toBeNull();
  });
});

describe("validateContact", () => {
  it("returns the trimmed values when everything is filled in", () => {
    expect(validateContact({ ...VALID, name: "  Sara Ahmed " })).toEqual({ ok: true, data: { ...VALID, name: "Sara Ahmed" } });
  });

  it("names every field that needs fixing, in form order", () => {
    const result = validateContact({ topic: "", name: " ", email: "sara@company", message: "" });
    expect(result).toEqual({
      ok: false,
      errors: { topic: "topicMissing", name: "nameMissing", email: "emailNoDomain", message: "messageMissing" },
    });
  });

  it("rejects a topic that is not one of the three", () => {
    expect(validateContact({ ...VALID, topic: "spam" })).toEqual({ ok: false, errors: { topic: "topicMissing" } });
  });
});

describe("validateField", () => {
  it("checks one field on its own", () => {
    expect(validateField("email", "sara@company.com")).toBeNull();
    expect(validateField("email", "sara")).toBe("emailNoAt");
    expect(validateField("name", "")).toBe("nameMissing");
    expect(validateField("topic", "role")).toBeNull();
  });
});
