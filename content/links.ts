/** Public contact details and fixed URLs. Shown on the site, so nothing here is secret. */
export const EMAIL = "ahmedadel8045@gmail.com";
export const WHATSAPP_URL = "https://wa.me/201092829213";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ahmedadelgabal";
export const GITHUB_URL = "https://github.com/ahme1d1";
export const CV_PATH = "/cv/Ahmed_Gabal_Senior_Frontend_Engineer.pdf";

/** Link-preview cards (1200 x 630) per language and a square portrait at stable addresses (../tools/make-share-images.mjs). */
export const SHARE_IMAGE_PATHS = { en: "/share/ahmed-gabal-en.png", ar: "/share/ahmed-gabal-ar.png" } as const;
export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const PORTRAIT_PATH = "/share/ahmed-gabal.jpg";

/** Absolute origin for canonical URLs and the sitemap. Overridden per deploy with NEXT_PUBLIC_SITE_URL (an empty value counts as unset). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ahmedgabal.vercel.app";

/** The profile handles shown beside LinkedIn and GitHub on the Contact page. */
export const LINKEDIN_HANDLE = "in/ahmedadelgabal";
export const GITHUB_HANDLE = "ahme1d1";
