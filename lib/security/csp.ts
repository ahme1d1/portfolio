/**
 * The Content-Security-Policy every page is sent with (docs/SPEC.md "Security headers").
 * next.config.ts imports this file, so it imports nothing itself.
 */

type Directive =
  | "default-src"
  | "script-src"
  | "style-src"
  | "img-src"
  | "font-src"
  | "connect-src"
  | "form-action"
  | "frame-ancestors"
  | "base-uri"
  | "object-src";

/** A typo in a directive name is a type error, not a directive the browser silently ignores. */
export type CspDirectives = Readonly<Partial<Record<Directive, readonly string[]>>>;

/** The contact form's endpoint (`lib/contact/send.ts`, tested to match) and the page it lands on without JavaScript. */
const WEB3FORMS_API = "https://api.web3forms.com";
const WEB3FORMS_SUCCESS = "https://web3forms.com";

export const CSP_DIRECTIVES: CspDirectives = {
  "default-src": ["'self'"],
  // Every page is prerendered, so no nonce is possible, and Next's inline scripts change per page and per build.
  // A hash or nonce here would switch 'unsafe-inline' off and stop them.
  "script-src": ["'self'", "'unsafe-inline'"],
  // No inline styles: images render through components/ui/Img (no style attribute), the theme switch uses a class.
  "style-src": ["'self'"],
  "img-src": ["'self'"],
  "font-src": ["'self'"],
  "connect-src": ["'self'", WEB3FORMS_API],
  "form-action": [WEB3FORMS_API, WEB3FORMS_SUCCESS],
  "frame-ancestors": ["'none'"],
  "base-uri": ["'none'"],
  "object-src": ["'none'"],
};

/** "name source source; name source" from a directive table. */
export function buildCsp(directives: CspDirectives = CSP_DIRECTIVES): string {
  return Object.entries(directives)
    .map(([name, sources = []]) => [name, ...sources].join(" "))
    .join("; ");
}
