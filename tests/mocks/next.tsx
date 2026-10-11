import { vi } from "vitest";

/** The pathname and query string the mocked router reports; set them per test. */
export const router = { pathname: "/en/", search: "" };

vi.mock("next/navigation", () => ({
  usePathname: () => router.pathname,
  useSearchParams: () => new URLSearchParams(router.search),
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

/** next/image needs Next's image config at runtime; tests check the plain <img> it renders. */
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    preload: _preload,
    quality: _quality,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string | { src: string };
    alt: string;
    placeholder?: string;
    blurDataURL?: string;
    preload?: boolean;
    quality?: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : src.src} alt={alt} {...props} />
  ),
}));
