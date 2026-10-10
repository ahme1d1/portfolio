import { CASE_SLUGS } from "./cases/slugs";

/** Every page path without the locale, in the order the sitemap lists them. */
export const PAGE_PATHS: readonly string[] = [
  "/",
  "/work/",
  ...CASE_SLUGS.map((slug) => `/work/${slug}/`),
  "/experience/",
  "/services/",
  "/about/",
  "/contact/",
];
