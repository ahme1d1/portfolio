import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Rich } from "./Rich";

describe("Rich", () => {
  it("renders Latin words as LTR English bdi and keeps و with the word after it", () => {
    const { container } = render(
      <p>
        <Rich text="إلى {React} و {TypeScript}." />
      </p>,
    );
    const bdis = container.querySelectorAll("bdi");
    expect([...bdis].map((bdi) => [bdi.textContent, bdi.getAttribute("dir"), bdi.getAttribute("lang")])).toEqual([
      ["React", "ltr", "en"],
      ["TypeScript", "ltr", "en"],
    ]);
    const group = container.querySelector(".whitespace-nowrap");
    expect(group?.textContent).toBe("و TypeScript");
    expect(container.textContent).toBe("إلى React و TypeScript.");
  });

  it("renders emphasis and fills slots", () => {
    const { container } = render(
      <p>
        <Rich text="*Not sent.* Email {$email}." slots={{ email: <a href="mailto:a@b.co">a@b.co</a> }} />
      </p>,
    );
    expect(container.querySelector("strong")?.textContent).toBe("Not sent.");
    expect(container.querySelector("a")).toHaveAttribute("href", "mailto:a@b.co");
    expect(container.textContent).toBe("Not sent. Email a@b.co.");
  });

  it("renders nothing for a slot nobody filled", () => {
    const { container } = render(
      <p>
        <Rich text="Email {$email}." />
      </p>,
    );
    expect(container.textContent).toBe("Email .");
  });
});
