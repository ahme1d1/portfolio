import type { ButtonHTMLAttributes, ReactNode } from "react";
import { AnyLink, type AnyLinkProps } from "./AnyLink";
import { ArrowIcon } from "./icons";

export type ButtonVariant = "black" | "cobalt" | "outline";
export type ButtonSize = "lg" | "md";

type ButtonStyle = {
  variant: ButtonVariant;
  size?: ButtonSize;
  /** Fills the row (the phone layouts). */
  block?: boolean;
  /** Label at the start, arrow at the end (the band's doors). */
  spread?: boolean;
};

const BASE =
  "inline-flex shrink-0 items-center font-semibold whitespace-nowrap transition-[background-color,border-color,transform] duration-150 ease-enter active:scale-[0.97] aria-busy:cursor-progress";

/** Large: hero doors, bands, submit (52 / 16 on mobile, 56 / 17 on desktop). Medium: the CV button. */
const SIZES: Record<ButtonSize, string> = {
  lg: "h-13 gap-2 rounded-button px-6 text-base lg:h-14 lg:gap-3 lg:text-[17px]",
  md: "h-12 gap-2.5 rounded-control px-5 text-[15px]",
};

const VARIANTS: Record<ButtonVariant, string> = {
  black: "bg-inverse text-on-inverse hover:bg-ink-2",
  cobalt: "bg-accent text-on-accent hover:bg-accent-hover",
  outline: "border border-line text-ink hover:border-strong hover:bg-surface",
};

const PREFIX: Record<ButtonVariant, string> = {
  black: "text-on-inverse-muted",
  cobalt: "text-on-accent-muted",
  outline: "text-muted",
};

export function buttonClass({ variant, size = "lg", block = false, spread = false }: ButtonStyle): string {
  return `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${spread ? "justify-between" : "justify-center"}${block ? " w-full" : ""}`;
}

/** The lighter lead-in of a door button: "Hiring?" before "See my CV & experience". */
export function ButtonPrefix({ variant, children }: { variant: ButtonVariant; children: ReactNode }) {
  return <span className={`font-normal ${PREFIX[variant]}`}>{children}</span>;
}

type ButtonLinkProps = AnyLinkProps &
  ButtonStyle & {
    /** Arrows only on filled primary buttons; "desktop" drops it below 1024px, as the mobile boards do. */
    arrow?: "always" | "desktop";
  };

export function ButtonLink({ variant, size, block, spread, arrow, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <AnyLink {...props} className={`${buttonClass({ variant, size, block, spread })} ${className}`}>
      {children}
      {arrow ? <ArrowIcon size={size === "md" ? 16 : 18} className={arrow === "desktop" ? "hidden lg:block" : ""} /> : null}
    </AnyLink>
  );
}

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> &
  ButtonStyle & {
    type?: "button" | "submit";
    /** While sending: stays focusable and announced, ignores clicks (the caller checks). */
    busy?: boolean;
  };

export function Button({ variant, size, block, spread, busy = false, type = "button", className = "", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      aria-busy={busy || undefined}
      aria-disabled={busy || undefined}
      className={`${buttonClass({ variant, size, block, spread })} ${className}`}
      {...props}
    />
  );
}
