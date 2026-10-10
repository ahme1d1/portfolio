import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EducoursezArchitecture } from "./EducoursezArchitecture";
import { EducoursezPhases } from "./EducoursezPhases";

describe("the Educoursez architecture figure", () => {
  it("shows both clients on the API that owns every rule, with how each one talks to it", () => {
    const { container } = render(<EducoursezArchitecture locale="en" />);
    for (const label of ["For students", "Mobile app", "The authority", "API", "For staff", "Dashboard"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByText("REST on /app")).toBeInTheDocument();
    expect(screen.getByText("REST on /admin")).toBeInTheDocument();
    expect(screen.getAllByText("Socket.IO")).toHaveLength(2);
    expect(container.querySelector("figcaption")).toHaveTextContent(/^Realtime runs on the API's own server/);
  });

  it("translates every label in Arabic and keeps the paths left to right", () => {
    const { container } = render(<EducoursezArchitecture locale="ar" />);
    expect(screen.getByText("تطبيق الموبايل")).toBeInTheDocument();
    expect(screen.getByText("الواجهة البرمجية")).toBeInTheDocument();
    expect(screen.getByText("لوحة التحكم")).toBeInTheDocument();
    expect(screen.getByText("/app").closest("bdi")).toHaveAttribute("dir", "ltr");
    expect(screen.getByText("/admin").closest("bdi")).toHaveAttribute("dir", "ltr");
    expect(container.querySelector("figcaption")).toHaveTextContent(/^يعمل الاتصال اللحظي/);
  });

  it("hides the lines from screen readers and uses no ids", () => {
    const { container } = render(<EducoursezArchitecture locale="en" />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(container.querySelector("[id]")).toBeNull();
  });
});

describe("the Educoursez phases list", () => {
  it("lists the eight phases in order, seven done and the last one next", () => {
    render(<EducoursezPhases locale="en" />);
    const list = screen.getByRole("list", { name: "Phases" });
    const phases = within(list).getAllByRole("listitem");
    expect(phases).toHaveLength(8);
    expect(phases[0]).toHaveTextContent("Phase 0SetupDone");
    expect(phases[7]).toHaveTextContent("Phase 7Profile, settings, blockingNext");
    expect(within(list).getAllByText("Done")).toHaveLength(7);
    expect(list.tagName).toBe("OL");
  });

  it("marks each finished phase with a hidden check icon", () => {
    const { container } = render(<EducoursezPhases locale="en" />);
    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(7);
  });

  it("names the list and its phases in Arabic", () => {
    render(<EducoursezPhases locale="ar" />);
    const list = screen.getByRole("list", { name: "المراحل" });
    const phases = within(list).getAllByRole("listitem");
    expect(phases[0]).toHaveTextContent("المرحلة 0التجهيزاكتملت");
    expect(phases[7]).toHaveTextContent("المرحلة 7الملف الشخصي والإعدادات والحظرالتالية");
  });
});
