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
    onClick,
    onNavigate,
    transitionTypes: _transitionTypes,
    prefetch: _prefetch,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    onNavigate?: () => void;
    transitionTypes?: string[];
    prefetch?: boolean;
    ref?: React.Ref<HTMLAnchorElement>;
  }) => (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
        if (!isModified) onNavigate?.();
        event.preventDefault();
      }}
      {...props}
    >
      {children}
    </a>
  ),
}));
