import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { THEME_STORAGE_KEY } from "@/lib/theme/theme";
import { KeepTheme } from "./KeepTheme";

describe("KeepTheme", () => {
  afterEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it("puts the saved theme back when the root layout mounts", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    render(<KeepTheme />);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
