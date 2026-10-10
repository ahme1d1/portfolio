import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getProjectCard } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { StatusPill } from "./StatusPill";

describe("ProjectCard", () => {
  it("has one link, named after the project, to its case study", () => {
    render(<ProjectCard card={getProjectCard("en", "fantasy-eg")} />);
    const card = screen.getByRole("article");
    const links = within(card).getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("Read the case study: Fantasy EG");
    expect(links[0]).toHaveAttribute("href", "/en/work/fantasy-eg/");
  });

  it("is named in Arabic on Arabic pages", () => {
    render(<ProjectCard card={getProjectCard("ar", "qima")} />);
    expect(screen.getByRole("link")).toHaveAccessibleName("اقرأ دراسة الحالة لمشروع قيمة (Qima)");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("قيمة (Qima)");
  });

  it("shows the status of a main project and none on a client project", () => {
    render(
      <>
        <ProjectCard card={getProjectCard("en", "educoursez")} />
        <ProjectCard card={getProjectCard("en", "tikvideo")} />
      </>,
    );
    const [educoursez, tikvideo] = screen.getAllByRole("article");
    expect(educoursez).toHaveTextContent("In development");
    expect(tikvideo?.querySelector("[data-status]")).toBeNull();
  });

  it("keeps the stack in one left-to-right run, also in Arabic", () => {
    render(<ProjectCard card={getProjectCard("ar", "fantasy-eg")} />);
    const stack = screen.getByText("Nuxt 4, React Native, NestJS, PostgreSQL");
    expect(stack.tagName).toBe("BDI");
    expect(stack).toHaveAttribute("dir", "ltr");
  });

  it("describes screenshots and hides the drawn mockups from screen readers", () => {
    render(
      <>
        <ProjectCard card={getProjectCard("en", "educoursez")} />
        <ProjectCard card={getProjectCard("en", "vodafone-modernization")} />
        <ProjectCard card={getProjectCard("en", "lean-academy")} />
      </>,
    );
    expect(screen.getByRole("img", { name: "Educoursez app home in Arabic" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Educoursez course lessons in Arabic" })).toBeInTheDocument();
    expect(screen.getByText("Now, still live").closest("[aria-hidden]")).not.toBeNull();
    expect(screen.getByText("Website builder").closest("[aria-hidden]")).not.toBeNull();
  });
});

describe("StatusPill", () => {
  it("adds a live dot only to Live", () => {
    const { container } = render(
      <>
        <StatusPill kind="live" label="Live" />
        <StatusPill kind="ongoing" label="Ongoing" />
      </>,
    );
    const [live, ongoing] = container.querySelectorAll("[data-status]");
    expect(live?.querySelector("[data-dot]")).not.toBeNull();
    expect(ongoing?.querySelector("[data-dot]")).toBeNull();
  });
});
