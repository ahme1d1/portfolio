import { describe, expect, it } from "vitest";
import { formatMonthRange, formatYears } from "./years";

describe("formatYears", () => {
  it("joins the years with a spaced en dash", () => {
    expect(formatYears(2022, 2023, "present")).toBe("2022 – 2023");
  });

  it("says present for a role that has not ended", () => {
    expect(formatYears(2024, null, "الآن")).toBe("2024 – الآن");
  });
});

describe("formatMonthRange", () => {
  const EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

  it("names the month before the year on both ends", () => {
    expect(formatMonthRange({ year: 2022, month: 5 }, { year: 2023, month: 12 }, EN, "present")).toBe("May 2022 – Dec 2023");
  });

  it("says present for a role that has not ended", () => {
    expect(formatMonthRange({ year: 2024, month: 1 }, null, EN, "present")).toBe("Jan 2024 – present");
  });

  it("uses the language's month names with Western digits", () => {
    expect(formatMonthRange({ year: 2024, month: 1 }, null, AR, "الآن")).toBe("يناير 2024 – الآن");
  });

  it("refuses a month that does not exist", () => {
    expect(() => formatMonthRange({ year: 2024, month: 13 }, null, EN, "present")).toThrow(/month/);
  });
});
