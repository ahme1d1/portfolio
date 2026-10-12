import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LOCALES } from "@/lib/i18n/locale";
import { CulturalBridgeArchitecture } from "./CulturalBridgeArchitecture";

describe("CulturalBridgeArchitecture", () => {
  it("draws the three apps, the two links between them and the shared API, once each", () => {
    render(<CulturalBridgeArchitecture locale="en" />);
    const figure = screen.getByRole("figure");

    const labels = [
      "For the public",
      "Website",
      "Ticket QR code",
      "Scanned to record attendance",
      "Organizer dashboard",
      "Login as organizer",
      "with an API token",
      "Admin dashboard",
      "Shared by every app",
      "REST API",
      "At /api/v1, answers in Arabic",
    ];
    labels.forEach((label) => expect(within(figure).getByText(label)).toBeInTheDocument());
  });

  it("captions the figure", () => {
    render(<CulturalBridgeArchitecture locale="en" />);
    const caption = screen.getByText(/^An Android app for the public uses the same API/);
    expect(caption.closest("figcaption")).not.toBeNull();
  });

  it("translates every label in Arabic and keeps Latin names in a bdi", () => {
    render(<CulturalBridgeArchitecture locale="ar" />);
    const figure = screen.getByRole("figure");

    expect(within(figure).getByText("لوحة تحكم المنظّمين")).toBeInTheDocument();
    expect(within(figure).getByText("الدخول باسم المنظّم")).toBeInTheDocument();
    expect(within(figure).getByText("/api/v1").tagName).toBe("BDI");
    expect(figure).toHaveTextContent("رمز QR في التذكرة");
    expect(figure).toHaveTextContent("الواجهة البرمجية REST");
    expect(within(figure).queryByText("Organizer dashboard")).toBeNull();
  });

  it("points the side arrows along the reading direction and the rail arrows up or down", () => {
    const { container } = render(<CulturalBridgeArchitecture locale="ar" />);
    const flipped = container.querySelectorAll("svg.rtl\\:-scale-x-100");
    const vertical = container.querySelectorAll("svg[data-arrow='down'], svg[data-arrow='up']");

    expect(flipped).toHaveLength(2);
    expect([...vertical].map((arrow) => arrow.getAttribute("data-arrow"))).toEqual(["down", "up"]);
  });

  it.each(LOCALES)("hides its lines from assistive technology and holds no ids (%s)", (locale) => {
    const { container } = render(<CulturalBridgeArchitecture locale={locale} />);
    const marks = [...container.querySelectorAll("span, svg")].filter((element) => element.textContent === "");

    expect(marks.length).toBeGreaterThan(0);
    expect(marks.filter((element) => !element.closest('[aria-hidden="true"]'))).toEqual([]);
    expect(container.querySelectorAll("[id]")).toHaveLength(0);
  });
});
