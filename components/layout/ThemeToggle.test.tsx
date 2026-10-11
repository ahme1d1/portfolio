import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { enSite } from "@/content/site/en";
import { THEME_STORAGE_KEY } from "@/lib/theme/theme";
import { ThemeRow, ThemeToggle } from "./ThemeToggle";

describe("theme controls", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
  });

  it("names the header button after what it does in both themes", () => {
    render(<ThemeToggle labels={enSite.theme} />);
    const button = screen.getByRole("button");
    // Both names are in the DOM; CSS shows only the one for the current theme.
    expect(button).toHaveTextContent("Switch to dark theme");
    expect(button).toHaveTextContent("Switch to light theme");
  });

  it("switches to dark and back, and remembers the choice", async () => {
    render(<ThemeToggle labels={enSite.theme} />);
    await userEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    await userEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("starts from light when nothing was chosen, even on a dark system", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    render(<ThemeRow labels={enSite.theme} />);
    await userEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
