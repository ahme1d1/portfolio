import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/links";
import { PAGE_PATHS } from "@/content/routes";
import { LOCALES } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      alternates: {
        languages: {
          en: `${SITE_URL}${localePath("en", path)}`,
          ar: `${SITE_URL}${localePath("ar", path)}`,
        },
      },
    })),
  );
}
