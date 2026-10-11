import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/i18n/locale";
import { SERVICE_DATA, SERVICE_KEYS, WHY_KEYS, WHY_LINKS } from "./data";
import { getServicesCopy } from "./index";

describe.each(LOCALES)("services copy (%s)", (locale) => {
  const copy = getServicesCopy(locale);

  it("has copy for exactly the four services, in the data's order", () => {
    expect(Object.keys(copy.what.items)).toEqual([...SERVICE_KEYS]);
  });

  it.each(SERVICE_KEYS)("names every 'Seen in' link of %s", (key) => {
    expect(copy.what.items[key].seen).toHaveLength(SERVICE_DATA[key].seen.length);
  });

  it("has copy for exactly the three reasons, in the data's order", () => {
    expect(Object.keys(copy.why.items)).toEqual([...WHY_KEYS]);
  });

  it.each(WHY_KEYS)("names every link of the %s reason", (key) => {
    expect(copy.why.items[key].links).toHaveLength(WHY_LINKS[key].length);
  });

  it("lists what you get for every service, two items for mobile apps", () => {
    const counts = SERVICE_KEYS.map((key) => copy.what.items[key].get.length);
    expect(counts).toEqual([3, 3, 2, 3]);
  });

  it("has the four steps of a project", () => {
    expect(copy.process.steps).toHaveLength(4);
  });
});

describe("services data", () => {
  it("keeps every stack Latin and non-empty", () => {
    for (const key of SERVICE_KEYS) {
      expect(SERVICE_DATA[key].stack.length).toBeGreaterThan(0);
      expect(SERVICE_DATA[key].stack.join(", ")).toMatch(/^[\x20-\x7E]+$/);
    }
  });
});
