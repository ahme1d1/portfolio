import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { router } from "@/tests/mocks/next";
import { LanguageSwitch, resetLanguageSwitchFocus } from "./LanguageSwitch";

describe("LanguageSwitch", () => {
  afterEach(() => resetLanguageSwitchFocus());

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
    expect(link).toHaveAttribute("data-transition-types", "locale-switch");
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

  it("leaves focus alone when the switch never had it (Safari does not focus a clicked link)", () => {
    router.pathname = "/en/";
    const { unmount } = render(
      <LanguageSwitch target="ar" placement="header">
        العربية
      </LanguageSwitch>,
    );
    // A click without focus: the new page must not draw a focus ring the person never asked for.
    fireEvent.click(screen.getByRole("link", { name: "العربية" }));
    unmount();

    router.pathname = "/ar/";
    render(
      <LanguageSwitch target="en" placement="header">
        English
      </LanguageSwitch>,
    );
    expect(screen.getByRole("link", { name: "English" })).not.toHaveFocus();
  });

  it("forgets the refocus when another link wins before the switch's page opens", async () => {
    router.pathname = "/en/work/";
    const { unmount } = render(
      <LanguageSwitch target="ar" placement="header">
        العربية
      </LanguageSwitch>,
    );
    await userEvent.click(screen.getByRole("link", { name: "العربية" }));
    unmount();

    // A quicker click on an English link opened Contact instead: its switch must not take focus.
    router.pathname = "/en/contact/";
    render(
      <LanguageSwitch target="ar" placement="header">
        العربية
      </LanguageSwitch>,
    );
    expect(screen.getByRole("link", { name: "العربية" })).not.toHaveFocus();
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

  it("leaves focus alone after a click that opens a new tab", async () => {
    router.pathname = "/en/";
    const { unmount } = render(
      <LanguageSwitch target="ar" placement="header">
        العربية
      </LanguageSwitch>,
    );
    const user = userEvent.setup();
    await user.keyboard("{Control>}");
    await user.click(screen.getByRole("link", { name: "العربية" }));
    await user.keyboard("{/Control}");
    unmount();

    render(
      <LanguageSwitch target="en" placement="header">
        English
      </LanguageSwitch>,
    );
    expect(screen.getByRole("link", { name: "English" })).not.toHaveFocus();
  });
});
