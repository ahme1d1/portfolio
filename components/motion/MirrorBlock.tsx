import { ViewTransition } from "react";

/** The transition type carried by the language switch. Only it plays the mirror. */
export const LOCALE_SWITCH = "locale-switch";

type MirrorBlockProps = {
  /** Same name on the English and Arabic page: the block moves to its mirrored place. */
  name: string;
  children: React.ReactNode;
};

/**
 * A block that exists in both languages (portrait, project image, case hero, figure screen).
 * On the language switch it moves from its place on the old page to its place on the new one;
 * on every other navigation it does nothing.
 */
export function MirrorBlock({ name, children }: MirrorBlockProps) {
  return (
    <ViewTransition name={`mirror-${name}`} share={{ [LOCALE_SWITCH]: "mirror", default: "none" }} default="none">
      {children}
    </ViewTransition>
  );
}

/**
 * Page content around the moving blocks (main, footer). On the language switch the old text fades
 * out and the new text fades in at its place; it never travels. A shared name pairs the two pages:
 * enter and exit do not fire here, because Next keeps the previous page mounted (hidden).
 */
export function MirrorFade({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={`fade-${name}`} share={{ [LOCALE_SWITCH]: "page-fade", default: "none" }} default="none">
      {children}
    </ViewTransition>
  );
}
