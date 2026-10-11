import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DefinitionRows } from "./DefinitionRows";

const ROWS = [
  { term: "Core", value: "React, TypeScript", isEmphasis: true },
  { term: "Testing", value: "Vitest, Playwright" },
];

describe("DefinitionRows", () => {
  it("pairs each term with its value in one description list", () => {
    const { container } = render(<DefinitionRows rows={ROWS} term="label" termWidth="wide" />);
    const list = container.querySelector("dl");
    expect(list).not.toBeNull();
    expect(within(list as HTMLElement).getAllByRole("term").map((dt) => dt.textContent)).toEqual(["Core", "Testing"]);
    expect(screen.getByText("Vitest, Playwright").tagName).toBe("DD");
  });

  it("sets the emphasised value in the text colour and the others in the secondary one", () => {
    render(<DefinitionRows rows={ROWS} term="label" termWidth="wide" />);
    expect(screen.getByText("React, TypeScript")).toHaveClass("text-ink");
    expect(screen.getByText("Vitest, Playwright")).toHaveClass("text-ink-2");
  });

  it("renders rich values such as a status dot", () => {
    render(
      <DefinitionRows
        rows={[{ term: "Availability", value: <span data-testid="dot">Open</span> }]}
        term="muted"
        termWidth="narrow"
        value="large"
      />,
    );
    expect(screen.getByTestId("dot")).toBeInTheDocument();
    expect(screen.getByRole("term")).toHaveClass("text-muted");
  });
});
