import { describe, expect, it } from "vitest";
import { formatYears } from "./years";

describe("formatYears", () => {
  it("joins the years with a spaced en dash", () => {
    expect(formatYears(2022, 2023, "present")).toBe("2022 – 2023");
  });

  it("says present for a role that has not ended", () => {
    expect(formatYears(2024, null, "الآن")).toBe("2024 – الآن");
  });
});
