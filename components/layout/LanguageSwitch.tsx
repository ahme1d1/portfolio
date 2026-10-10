"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { LOCALE_SWITCH } from "@/components/motion/MirrorBlock";
import type { Locale } from "@/lib/i18n/locale";
import { switchLocalePath } from "@/lib/i18n/paths";

/** Which switch was used, so the same one on the new page can take focus. */
let refocusPlacement: string | null = null;

type LanguageSwitchProps = {
  /** The language the link opens. Its name is shown in its own script. */
  target: Locale;
  /** Where this switch sits ("header", "footer"); focus returns to the same place after switching. */
  placement: string;
  className?: string;
  children: React.ReactNode;
};

/** Opens the same page in the other language, with the mirror transition. */
export function LanguageSwitch({ target, placement, className, children }: LanguageSwitchProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);

  // The other language is a separate page tree, so focus would fall back to <body>.
  useEffect(() => {
    if (refocusPlacement !== placement) return;
    refocusPlacement = null;
    ref.current?.focus({ preventScroll: true });
  }, [placement]);

  return (
    <Link
      ref={ref}
      href={switchLocalePath(pathname, target) as Route}
      lang={target}
      hrefLang={target}
      transitionTypes={[LOCALE_SWITCH]}
      onClick={() => {
        refocusPlacement = placement;
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
