import type { NextConfig } from "next";
import { buildCsp } from "./lib/security/csp";

/** `next dev` needs eval and inline styles for its overlay, so the policy applies to built pages only. */
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  trailingSlash: true,
  typedRoutes: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Kept for browsers that predate the CSP's frame-ancestors.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      ...(isDev
        ? []
        : [
            {
              // Pages only: a CSP on the CV PDF can break the browser's viewer, and static files need none.
              source: "/((?!cv/|_next/static/).*)",
              headers: [{ key: "Content-Security-Policy", value: buildCsp() }],
            },
          ]),
    ];
  },
  async redirects() {
    // The site has no language sniffing: the bare domain always opens English.
    return [{ source: "/", destination: "/en/", permanent: false }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
