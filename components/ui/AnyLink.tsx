import Link from "next/link";
import type { Route } from "next";
import type { AnchorHTMLAttributes } from "react";

/** A page of this site (client navigation), as opposed to a file, another site or mailto:. */
export function isPagePath(href: string): boolean {
  const path = href.split(/[?#]/)[0] ?? href;
  return path.startsWith("/") && !path.startsWith("//") && !/\.[a-z0-9]+$/i.test(path);
}

export type AnyLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/** next/link for site pages, a plain anchor for the CV file, other sites, mailto: and wa.me. */
export function AnyLink({ href, children, ...props }: AnyLinkProps) {
  if (isPagePath(href)) {
    return (
      <Link href={href as Route} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
