import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import shot from "@/assets/images/portrait.png";
import { Img } from "./Img";

describe("Img", () => {
  it("renders next/image's responsive <img> without an inline style, which the CSP would block", () => {
    const { container } = render(<Img src={shot} alt="Ahmed Gabal" sizes="100vw" className="size-full" />);
    const img = screen.getByRole("img", { name: "Ahmed Gabal" });
    expect(container.querySelector("[style]")).toBeNull();
    expect(img).toHaveAttribute("srcset", expect.stringContaining("/_next/image?url="));
    expect(img).toHaveAttribute("sizes", "100vw");
    expect(img).toHaveAttribute("width", String(shot.width));
    expect(img).toHaveAttribute("height", String(shot.height));
    expect(img).toHaveAttribute("decoding", "async");
  });

  it("keeps the alt text invisible while the image loads, as next/image's style did, and adds the caller's classes", () => {
    render(<Img src={shot} alt="Ahmed Gabal" sizes="100vw" className="size-full" />);
    expect(screen.getByRole("img").className.split(" ")).toEqual(expect.arrayContaining(["text-transparent", "size-full"]));
  });

  it("loads lazily by default and first with high priority when it is the page's largest image", () => {
    const { rerender } = render(<Img src={shot} alt="" sizes="100vw" />);
    expect(screen.getByRole("presentation")).toHaveAttribute("loading", "lazy");
    rerender(<Img src={shot} alt="" sizes="100vw" loading="eager" fetchPriority="high" />);
    expect(screen.getByRole("presentation")).toHaveAttribute("loading", "eager");
    expect(screen.getByRole("presentation")).toHaveAttribute("fetchpriority", "high");
  });
});
