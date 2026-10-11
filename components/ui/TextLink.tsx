import { AnyLink, type AnyLinkProps } from "./AnyLink";

export type TextLinkVariant = "standalone" | "head" | "inline";

/**
 * standalone: an accent link on its own line ("Read the case study"), underline on hover.
 * head: the ink, underlined link beside a section title ("All work"); it turns accent on hover.
 * inline: a link inside a sentence or heading, always underlined.
 */
const VARIANTS: Record<TextLinkVariant, string> = {
  standalone:
    "inline-flex min-h-11 items-center font-semibold text-accent-ink decoration-[1.5px] underline-offset-4 hover:underline active:text-accent-pressed",
  head: "inline-flex min-h-11 items-center font-semibold text-ink underline decoration-1 underline-offset-4 hover:text-accent-ink active:text-accent-pressed ar:underline-offset-6",
  inline: "text-accent-ink underline decoration-1 underline-offset-3",
};

export function TextLink({ variant = "standalone", className = "", ...props }: AnyLinkProps & { variant?: TextLinkVariant }) {
  return <AnyLink {...props} className={`rounded-md transition-fast ${VARIANTS[variant]} ${className}`} />;
}
