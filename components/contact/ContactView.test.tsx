import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactView } from "./ContactView";

describe("ContactView", () => {
  it("puts the form, titled, beside the ways to reach me directly", () => {
    render(<ContactView locale="en" />);
    expect(screen.getByRole("heading", { level: 1, name: "Contact" })).toBeInTheDocument();
    expect(screen.getByText("Write to me about a role you're hiring for or a product you want built.")).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "Send a message" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub ahme1d1" })).toBeInTheDocument();
    // Desktop rows and the phone list say the same thing; CSS shows one of them.
    expect(screen.getAllByRole("heading", { level: 2, name: "Reach me directly" })).toHaveLength(2);
  });

  it("has no Let's talk band: the page is the contact", () => {
    render(<ContactView locale="en" />);
    expect(screen.queryByRole("heading", { name: "Let's talk." })).not.toBeInTheDocument();
  });

  it("speaks Arabic on the Arabic page", () => {
    render(<ContactView locale="ar" />);
    expect(screen.getByRole("heading", { level: 1, name: "تواصل" })).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "أرسل رسالة" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "واتساب راسلني" })).toBeInTheDocument();
  });
});
