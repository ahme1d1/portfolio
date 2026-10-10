import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QimaArchitecture } from "./QimaArchitecture";

describe("the Qima architecture figure", () => {
  it("shows the two frontends, how each reaches the API, and the services behind it", () => {
    const { container } = render(<QimaArchitecture locale="en" />);
    expect(screen.getByText("The two frontends I worked on")).toBeInTheDocument();
    for (const label of ["Website", "Admin dashboard", "REST API", "PayTabs", "Tabby and Tamara", "S3 storage"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByText("REST, from the server and the browser")).toBeInTheDocument();
    expect(screen.getByText("REST, from the browser")).toBeInTheDocument();
    expect(container.querySelector("figcaption")).toHaveTextContent(/^The API creates each payment/);
  });

  it("translates every label in Arabic and keeps the brands left to right", () => {
    const { container } = render(<QimaArchitecture locale="ar" />);
    expect(screen.getByText("الواجهتان الأماميتان اللتان عملت عليهما")).toBeInTheDocument();
    expect(screen.getByText("الموقع")).toBeInTheDocument();
    expect(screen.getByText("لوحة تحكم الإدارة")).toBeInTheDocument();
    expect(screen.getByText("PayTabs").closest("bdi")).toHaveAttribute("dir", "ltr");
    expect(screen.getByText("Tamara").closest("bdi")).toHaveAttribute("dir", "ltr");
    expect(container.querySelector("figcaption")).toHaveTextContent(/^تُنشئ الواجهة البرمجية كل عملية دفع/);
  });

  it("hides every line from screen readers and uses no ids", () => {
    const { container } = render(<QimaArchitecture locale="en" />);
    const hidden = [...container.querySelectorAll('[aria-hidden="true"]')];
    expect(hidden.length).toBeGreaterThan(0);
    expect(hidden.filter((element) => element.textContent !== "")).toEqual([]);
    expect(container.querySelector("[id]")).toBeNull();
  });
});
