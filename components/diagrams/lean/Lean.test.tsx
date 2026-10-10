import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getLeanDiagrams } from "@/content/cases/lean-academy";
import { LOCALES } from "@/lib/i18n/locale";
import { plainText } from "@/lib/rich/parse";
import { LeanArchitecture } from "./LeanArchitecture";
import { LeanBuilder } from "./LeanBuilder";
import { LeanHero } from "./LeanHero";

const words = (text: string) => plainText(text);

describe.each(LOCALES)("the Lean Academy drawings (%s)", (locale) => {
  const copy = getLeanDiagrams(locale);

  describe("the hero drawing", () => {
    const { hero } = copy;

    it("draws only the picture: the hero adds the figure and its caption", () => {
      const { container } = render(<LeanHero locale={locale} />);
      expect(container.querySelector("figure, figcaption")).toBeNull();
    });

    it("names the platform and lists what it offers", () => {
      const { container } = render(<LeanHero locale={locale} />);
      expect(container.textContent).toContain(words(hero.platform.name));
      const offers = screen.getByRole("list", { name: hero.offersLabel });
      expect(within(offers).getAllByRole("listitem").map((item) => item.textContent)).toEqual(hero.offers.map(words));
    });

    it("shows each organization with what it gets, the website first", () => {
      const { container } = render(<LeanHero locale={locale} />);
      for (const organization of hero.organizations) expect(container.textContent).toContain(words(organization));
      const lists = screen.getAllByRole("list", { name: hero.getsLabel });
      expect(lists).toHaveLength(hero.organizations.length);
      for (const list of lists) {
        expect(within(list).getAllByRole("listitem").map((item) => item.textContent)).toEqual(hero.gets.map((get) => words(get.name)));
      }
    });

    it("hides the mini websites from screen readers", () => {
      const { container } = render(<LeanHero locale={locale} />);
      expect(container.querySelectorAll("[data-mockup][aria-hidden='true']")).toHaveLength(hero.organizations.length);
    });
  });

  describe("the architecture figure", () => {
    const { architecture } = copy;

    it("is a figure with its caption", () => {
      render(<LeanArchitecture locale={locale} />);
      const figure = screen.getByRole("figure");
      expect(within(figure).getByText((_, element) => element?.tagName === "FIGCAPTION")).toHaveTextContent(words(architecture.caption));
    });

    it("shows my part and the three things behind it", () => {
      const { container } = render(<LeanArchitecture locale={locale} />);
      const text = container.textContent ?? "";
      for (const label of [architecture.app.eyebrow, architecture.app.title, architecture.app.detail, ...architecture.parts.map((part) => part.title)]) {
        expect(text).toContain(words(label));
      }
      for (const box of [architecture.gateway, architecture.hub, architecture.identity]) expect(text).toContain(words(box.title));
    });

    it("lists the services behind the gateway", () => {
      render(<LeanArchitecture locale={locale} />);
      const services = screen.getByRole("list", { name: architecture.servicesLabel });
      expect(within(services).getAllByRole("listitem").map((item) => item.textContent)).toEqual(architecture.services.map((service) => words(service.name)));
    });
  });

  describe("the website builder figure", () => {
    const { builder } = copy;

    it("is a figure with its caption", () => {
      render(<LeanBuilder locale={locale} />);
      const figure = screen.getByRole("figure");
      expect(within(figure).getByText((_, element) => element?.tagName === "FIGCAPTION")).toHaveTextContent(words(builder.caption));
    });

    it("lists the blocks on the page in order, marking the fixed ones and the one being edited", () => {
      render(<LeanBuilder locale={locale} />);
      const blocks = within(screen.getByRole("list", { name: builder.blocksLabel })).getAllByRole("listitem");
      expect(blocks).toHaveLength(builder.blocks.length);
      builder.blocks.forEach((block, index) => {
        const item = blocks[index];
        expect(item).toHaveTextContent(words(block.name));
        if (block.fixed) expect(item).toHaveTextContent(words(builder.fixed));
        if (block.editing) expect(item).toHaveTextContent(words(builder.editing));
      });
    });

    it("lists the blocks not used", () => {
      render(<LeanBuilder locale={locale} />);
      const unused = screen.getByRole("list", { name: builder.unusedLabel });
      expect(within(unused).getAllByRole("listitem").map((item) => item.textContent)).toEqual(builder.unused.map(words));
    });

    it("shows the edit panel's fields and actions as text", () => {
      const { container } = render(<LeanBuilder locale={locale} />);
      const text = container.textContent ?? "";
      const { edit } = builder;
      for (const label of [edit.title, edit.heading.label, edit.heading.value, edit.paragraph.label, edit.background, edit.button.label, edit.button.value, edit.actions.preview, edit.actions.save, builder.sameOrder]) {
        expect(text).toContain(words(label));
      }
    });

    it("draws the interface without real controls", () => {
      const { container } = render(<LeanBuilder locale={locale} />);
      expect(container.querySelectorAll("input, button, textarea, select, a")).toHaveLength(0);
    });
  });

  it.each([
    ["hero", LeanHero],
    ["architecture", LeanArchitecture],
    ["builder", LeanBuilder],
  ] as const)("puts no ids in the %s drawing", (_, Figure) => {
    const { container } = render(<Figure locale={locale} />);
    expect(container.querySelectorAll("[id]")).toHaveLength(0);
  });
});
