"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { currentState } from "@/lib/i18n/paths";

type NavLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
};

/** A link that knows whether it is the current page ("page") or its section ("true"). */
export function NavLink({ href, className, children, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const current = currentState(pathname, href);

  return (
    <Link
      href={href as Route}
      aria-current={current}
      data-current={current ? "" : undefined}
      className={className}
      onNavigate={onNavigate}
    >
      {children}
    </Link>
  );
}
