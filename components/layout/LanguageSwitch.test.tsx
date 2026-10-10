import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { router } from "@/tests/mocks/next";
import { LanguageSwitch } from "./LanguageSwitch";

describe("LanguageSwitch", () => {
  it("opens the same page in the other language, named in its own script", () => {
    router.pathname = "/en/work/qima/";
    render(
      <LanguageSwitch target="ar" placement="header">
        العربية
      </LanguageSwitch>,
    );
    const link = screen.getByRole("link", { name: "العربية" });
    expect(link).toHaveAttribute("href", "/ar/work/qima/");
    expect(link).toHaveAttribute("lang", "ar");
    expect(link).toHaveAttribute("hreflang", "ar");
  });

  it("gives focus to the same switch on the new page", async () => {
    router.pathname = "/en/";
    const { unmount } = render(
      <LanguageSwitch target="ar" placement="header">
        العربية
      </LanguageSwitch>,
    );
    await userEvent.click(screen.getByRole("link", { name: "العربية" }));
    unmount();

    router.pathname = "/ar/";
    render(
      <>
        <LanguageSwitch target="en" placement="footer">
          English (footer)
        </LanguageSwitch>
        <LanguageSwitch target="en" placement="header">
          English
        </LanguageSwitch>
      </>,
    );
    expect(screen.getByRole("link", { name: "English" })).toHaveFocus();
  });

  it("does not steal focus on a normal page load", () => {
    router.pathname = "/en/";
    render(
      <LanguageSwitch target="ar" placement="header">
        العربية
      </LanguageSwitch>,
    );
    expect(screen.getByRole("link", { name: "العربية" })).not.toHaveFocus();
  });
});
