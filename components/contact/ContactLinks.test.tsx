import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getSiteCopy } from "@/content/site";
import { ContactLinks } from "./ContactLinks";

describe("ContactLinks", () => {
  it("names each link by what it opens, the email by its address", () => {
    render(<ContactLinks labels={getSiteCopy("en").social} variant="list" />);
    expect(screen.getByRole("link", { name: "ahmedadel8045@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:ahmedadel8045@gmail.com",
    );
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/201092829213");
  });

  it("shows a label and a value on each row of the Contact page", () => {
    render(<ContactLinks labels={getSiteCopy("en").social} variant="rows" whatsappValue="Message me" />);
    expect(screen.getByRole("link", { name: "Email ahmedadel8045@gmail.com" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "WhatsApp Message me" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn in/ahmedadelgabal" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ahmedadelgabal",
    );
    expect(screen.getByRole("link", { name: "GitHub ahme1d1" })).toHaveAttribute("href", "https://github.com/ahme1d1");
  });

  it("keeps Latin values left to right on Arabic rows", () => {
    render(<ContactLinks labels={getSiteCopy("ar").social} variant="rows" whatsappValue="راسلني" />);
    const email = screen.getByRole("link", { name: "البريد الإلكتروني ahmedadel8045@gmail.com" });
    expect(email.querySelector('bdi[dir="ltr"]')).toHaveTextContent("ahmedadel8045@gmail.com");
  });
});
