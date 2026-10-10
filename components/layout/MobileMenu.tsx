"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/ui/icons";
import { CV_PATH } from "@/content/links";
import type { SiteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { MenuSocialLinks } from "./MenuSocialLinks";
import { NavLink } from "./NavLink";
import { ThemeRow } from "./ThemeToggle";
import { useFocusTrap } from "./useFocusTrap";

/** The menu replaces the header navigation below this width (Tailwind's lg). */
const DESKTOP_QUERY = "(min-width: 1024px)";

type MobileMenuProps = { locale: Locale; copy: SiteCopy };

/**
 * The menu below 1024px. The button keeps its name ("Menu"); only aria-expanded changes.
 * While open: focus starts on the first link and Tab cycles between the button and the menu,
 * Esc closes, and the page behind neither scrolls nor takes focus (inert).
 */
export function MobileMenu({ locale, copy }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  // A navigation (a menu link, or back/forward) always closes the menu.
  const [openedOn, setOpenedOn] = useState(pathname);
  if (isOpen && openedOn !== pathname) setIsOpen(false);
  if (openedOn !== pathname) setOpenedOn(pathname);

  // Next hides the previous page instead of unmounting it; a menu left open there stays closed.
  useLayoutEffect(() => () => setIsOpen(false), []);

  useFocusTrap({ isActive: isOpen, containerRef: panelRef, extraRef: buttonRef, onEscape: close });
  useLockedBackground(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    // The panel turns visible in the same frame (only closing is animated), so it can take focus.
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    // Widening past 1024px hides the menu and its button; close it so nothing stays locked.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => desktop.matches && setIsOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={copy.menu.button}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className="grid size-11 cursor-pointer place-items-center rounded-control text-ink lg:hidden"
      >
        {isOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        data-open={isOpen ? "" : undefined}
        className="invisible fixed inset-x-0 top-15 bottom-0 z-20 flex -translate-y-4 flex-col overflow-y-auto bg-page opacity-0 transition-[opacity,transform,visibility] duration-200 ease-leave data-open:visible data-open:translate-y-0 data-open:opacity-100 data-open:transition-[opacity,transform] data-open:ease-enter lg:hidden"
      >
        <nav aria-label={copy.nav.mainLabel} className="flex flex-1 flex-col px-4 pt-5">
          {copy.nav.items.map((item) => (
            <NavLink
              key={item.href}
              href={localePath(locale, item.href)}
              onNavigate={close}
              className="flex min-h-16 items-center border-b border-line text-[30px] font-semibold tracking-[-0.03em] text-ink ar:tracking-normal"
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={CV_PATH}
            className="mt-6 flex h-13 items-center justify-center gap-2.5 rounded-button bg-inverse text-base font-semibold text-on-inverse transition-[background-color,transform] duration-150 ease-enter hover:bg-ink-2 active:scale-[0.97]"
          >
            <DownloadIcon />
            <span>
              {copy.cv.menuText} <bdi>{copy.cv.menuSuffix}</bdi>
            </span>
          </a>
          <ThemeRow labels={copy.theme} />
        </nav>
        <MenuSocialLinks labels={copy.social} />
      </div>
    </>
  );
}

/** While the menu is open the page behind does not scroll and cannot be reached (inert). */
function useLockedBackground(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const behind = Array.from(document.querySelectorAll<HTMLElement>("body > main, body > footer"));
    root.style.overflow = "hidden";
    behind.forEach((element) => {
      element.inert = true;
    });
    return () => {
      root.style.overflow = previousOverflow;
      behind.forEach((element) => {
        element.inert = false;
      });
    };
  }, [isLocked]);
}
