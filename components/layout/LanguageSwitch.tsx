"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { LOCALE_SWITCH } from "@/components/motion/MirrorBlock";
import { markLocaleSwitch } from "@/lib/motion/reveal";
import type { Locale } from "@/lib/i18n/locale";
import { switchLocalePath } from "@/lib/i18n/paths";

/** Which switch was used and the page it opens, so the same switch on that page can take focus. */
let pendingRefocus: { placement: string; path: string } | null = null;

/** Test helper: forget a pending refocus. */
export function resetLanguageSwitchFocus() {
  pendingRefocus = null;
}

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
  const href = switchLocalePath(pathname, target);

  // The other language is a separate page tree, so focus would fall back to <body>. A switch whose
  // page never opened (another link won) is forgotten instead of taking focus somewhere else.
  useEffect(() => {
    if (pendingRefocus?.placement !== placement) return;
    const isItsPage = pendingRefocus.path === pathname;
    pendingRefocus = null;
    if (isItsPage) ref.current?.focus({ preventScroll: true });
  }, [placement, pathname]);

  return (
    <Link
      ref={ref}
      href={href as Route}
      lang={target}
      hrefLang={target}
      transitionTypes={[LOCALE_SWITCH]}
      onNavigate={() => {
        // Only a switch that had focus gets it back. Safari never focuses a clicked link, and focus
        // moved there by script would draw a ring the person did not ask for.
        pendingRefocus = document.activeElement === ref.current ? { placement, path: href } : null;
        // The new page mirrors this one; its hero and blocks on screen don't play in.
        markLocaleSwitch(target);
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
