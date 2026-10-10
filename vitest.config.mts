import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

/** Next turns a static image import into { src, width, height, blurDataURL }; tests get the same shape. */
function staticImages(): Plugin {
  return {
    name: "static-images",
    enforce: "pre",
    load(id) {
      const path = id.split("?")[0] ?? id;
      if (!/\.(png|jpe?g)$/.test(path)) return null;
      const image = { src: `/_next/static/media/${basename(path)}`, width: 1440, height: 900, blurDataURL: "" };
      return `export default ${JSON.stringify(image)};`;
    },
  };
}

export default defineConfig({
  plugins: [staticImages(), react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts", "./tests/mocks/next.tsx"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      include: ["lib/**", "components/**", "content/**"],
      exclude: ["**/*.test.{ts,tsx}"],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
