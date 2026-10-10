import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  typedRoutes: true,
  experimental: {
    globalNotFound: true,
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
