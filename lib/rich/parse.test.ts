import { describe, expect, it } from "vitest";
import { asLatin, outsideLatin, parseRich, plainText, validateRich } from "./parse";

describe("parseRich", () => {
  it("returns plain text as one text node", () => {
    expect(parseRich("Hello there.")).toEqual([{ type: "text", value: "Hello there." }]);
  });

  it("returns nothing for an empty string", () => {
    expect(parseRich("")).toEqual([]);
  });

  it("marks {…} as Latin text", () => {
    expect(parseRich("تطبيقات {Angular} للعملاء")).toEqual([
      { type: "text", value: "تطبيقات " },
      { type: "latin", value: "Angular" },
      { type: "text", value: " للعملاء" },
    ]);
  });

  it("marks *…* as emphasis, which may hold Latin text", () => {
    expect(parseRich("apps for *Vodafone Italy* (payments)")).toEqual([
      { type: "text", value: "apps for " },
      { type: "strong", children: [{ type: "text", value: "Vodafone Italy" }] },
      { type: "text", value: " (payments)" },
    ]);
    expect(parseRich("في *{Vodafone Italy}*")).toEqual([
      { type: "text", value: "في " },
      { type: "strong", children: [{ type: "latin", value: "Vodafone Italy" }] },
    ]);
  });

  it("turns {$name} into a slot", () => {
    expect(parseRich("email me at {$email}.")).toEqual([
      { type: "text", value: "email me at " },
      { type: "slot", name: "email" },
      { type: "text", value: "." },
    ]);
  });

  it("keeps و, بـ and لـ on the same line as the Latin word after them", () => {
    expect(parseRich("{React} و {TypeScript}، تمام")).toEqual([
      { type: "latin", value: "React" },
      { type: "text", value: " " },
      {
        type: "nowrap",
        children: [
          { type: "text", value: "و " },
          { type: "latin", value: "TypeScript" },
        ],
      },
      { type: "text", value: "، تمام" },
    ]);
    expect(parseRich("لوحات بـ {Angular}")[1]).toEqual({
      type: "nowrap",
      children: [
        { type: "text", value: "بـ " },
        { type: "latin", value: "Angular" },
      ],
    });
    expect(parseRich("لـ {Curium}")).toEqual([
      {
        type: "nowrap",
        children: [
          { type: "text", value: "لـ " },
          { type: "latin", value: "Curium" },
        ],
      },
    ]);
  });

  it("does not glue a word that only ends in و", () => {
    expect(parseRich("نحو {React}")).toEqual([
      { type: "text", value: "نحو " },
      { type: "latin", value: "React" },
    ]);
  });

  it("glues inside emphasis too", () => {
    expect(parseRich("*و {Vue}*")).toEqual([
      {
        type: "strong",
        children: [
          {
            type: "nowrap",
            children: [
              { type: "text", value: "و " },
              { type: "latin", value: "Vue" },
            ],
          },
        ],
      },
    ]);
  });

  it("falls back to plain text when the markup is broken", () => {
    expect(parseRich("an {open brace")).toEqual([{ type: "text", value: "an open brace" }]);
    expect(parseRich("one *star")).toEqual([{ type: "text", value: "one star" }]);
  });
});

describe("validateRich", () => {
  it("accepts well-formed markup", () => {
    expect(validateRich("a {React} *b {Vue}* {$email}", ["email"])).toEqual([]);
  });

  it("reports every kind of broken markup", () => {
    expect(validateRich("an {open")).toEqual(["unclosed {"]);
    expect(validateRich("a stray }")).toEqual(["stray }"]);
    expect(validateRich("{a {b}}")).toEqual(["nested {", "stray }"]);
    expect(validateRich("empty {}")).toEqual(["empty {}"]);
    expect(validateRich("one *star")).toEqual(["unclosed *"]);
    expect(validateRich("{$phone}", ["email"])).toEqual(["unknown slot $phone"]);
  });
});

describe("plainText", () => {
  it("drops the markup and fills slots", () => {
    expect(plainText("موقع {Fantasy EG} بالعربية")).toBe("موقع Fantasy EG بالعربية");
    expect(plainText("*Sent.* Write to {$email}.", { email: "a@b.co" })).toBe("Sent. Write to a@b.co.");
    expect(plainText("Write to {$email}.")).toBe("Write to .");
  });
});

describe("outsideLatin", () => {
  it("removes Latin tokens and slots, so Arabic copy can be checked for stray Latin", () => {
    expect(outsideLatin("تطبيق {React} على {$email}")).toBe("تطبيق  على ");
  });
});

describe("asLatin", () => {
  it("marks a brand as Latin on Arabic pages only", () => {
    expect(asLatin("ar", "Fantasy EG")).toBe("{Fantasy EG}");
    expect(asLatin("en", "Fantasy EG")).toBe("Fantasy EG");
  });
});
