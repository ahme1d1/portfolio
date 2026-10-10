import { vi } from "vitest";

/** The pathname the mocked router reports; set it per test. */
export const router = { pathname: "/en/" };

vi.mock("next/navigation", () => ({
  usePathname: () => router.pathname,
}));

/** next/link needs the App Router at runtime; in unit tests a plain anchor is enough. */
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    transitionTypes: _transitionTypes,
    prefetch: _prefetch,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    transitionTypes?: string[];
    prefetch?: boolean;
    ref?: React.Ref<HTMLAnchorElement>;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
