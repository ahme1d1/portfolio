import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/i18n/locale";
import { TikVideoArchitecture } from "./TikVideoArchitecture";

describe("TikVideoArchitecture", () => {
  it("draws both frontends on the Laravel API and the services it calls, once each", () => {
    render(<TikVideoArchitecture locale="en" />);
    const figure = screen.getByRole("figure");

    expect(within(figure).getAllByText("I built")).toHaveLength(2);
    const labels = [
      "Website",
      "Admin dashboard",
      "REST on /api/v1",
      "Bearer token",
      "The backend team",
      "Laravel API",
      "Called by",
      "the API",
      "Suno, MusicAPI, ElevenLabs",
    ];
    labels.forEach((label) => expect(within(figure).getByText(label)).toBeInTheDocument());
  });

  it("captions the figure", () => {
    render(<TikVideoArchitecture locale="en" />);
    const caption = screen.getByText(/^The API and its services are the backend team's work\./);
    expect(caption.closest("figcaption")).not.toBeNull();
  });

  it("translates every label in Arabic and keeps Latin names in a bdi", () => {
    render(<TikVideoArchitecture locale="ar" />);
    const figure = screen.getByRole("figure");

    expect(within(figure).getAllByText("من بنائي")).toHaveLength(2);
    expect(within(figure).getByText("الموقع")).toBeInTheDocument();
    expect(within(figure).getByText("Laravel").tagName).toBe("BDI");
    expect(figure).toHaveTextContent("واجهة Laravel البرمجية");
    expect(figure).toHaveTextContent("REST على /api/v1");
    expect(within(figure).queryByText("Website")).toBeNull();
  });

  it.each(LOCALES)("hides its lines from assistive technology and holds no ids (%s)", (locale) => {
    const { container } = render(<TikVideoArchitecture locale={locale} />);
    const marks = [...container.querySelectorAll("span, svg")].filter((element) => element.textContent === "");

    expect(marks.length).toBeGreaterThan(0);
    expect(marks.filter((element) => !element.closest('[aria-hidden="true"]'))).toEqual([]);
    expect(container.querySelectorAll("[id]")).toHaveLength(0);
  });
});
