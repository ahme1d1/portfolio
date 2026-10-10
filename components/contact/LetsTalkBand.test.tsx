import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getSiteCopy } from "@/content/site";
import { ContactLinks } from "./ContactLinks";
import { HomeContactBand } from "./HomeContactBand";
import { LetsTalkBand } from "./LetsTalkBand";

describe("LetsTalkBand", () => {
  it("opens the contact form with the topic of the door that was pressed", () => {
    render(<LetsTalkBand locale="en" page="work" />);
    const band = screen.getByRole("region", { name: "Let's talk." });
    // Desktop and phone doors: CSS shows one pair at each width.
    const role = within(band).getAllByRole("link", { name: "Hiring? Tell me about the role" });
    const project = within(band).getAllByRole("link", { name: "Have a project? Let's build it" });
    expect(role.map((link) => link.getAttribute("href"))).toEqual(["/en/contact/?topic=role", "/en/contact/?topic=role"]);
    expect(project.map((link) => link.getAttribute("href"))).toEqual(["/en/contact/?topic=project", "/en/contact/?topic=project"]);
    expect(within(band).getAllByText("I reply within 24 hours.")).not.toHaveLength(0);
  });

  it("takes another lede and an id scoped to its page", () => {
    render(<LetsTalkBand locale="ar" page="services" lede="لوحة تحكم أم موقع؟" />);
    expect(screen.getByText("لوحة تحكم أم موقع؟")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "لنتحدث." })).toHaveAttribute("id", "services-talk-ar");
    expect(screen.getAllByRole("link", { name: "تبحث عن مهندس؟ حدّثني عن الوظيفة" })[0]).toHaveAttribute(
      "href",
      "/ar/contact/?topic=role",
    );
  });
});

describe("HomeContactBand", () => {
  it("holds the contact form under the band's heading", () => {
    render(<HomeContactBand locale="en" />);
    const band = screen.getByRole("region", { name: "Let's talk." });
    expect(within(band).getByRole("form", { name: "Contact form" })).toBeInTheDocument();
  });
});

describe("ContactLinks", () => {
  it("labels every way to reach Ahmed, with Latin labels kept left to right", () => {
    render(<ContactLinks labels={getSiteCopy("ar").social} variant="list" />);
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["ahmedadel8045@gmail.com", "واتساب", "LinkedIn", "GitHub"]);
    expect(links[0]).toHaveAttribute("href", "mailto:ahmedadel8045@gmail.com");
    expect(links[0]?.querySelector("bdi")).toHaveAttribute("dir", "ltr");
    expect(links[1]?.querySelector("bdi")).toBeNull();
  });
});
