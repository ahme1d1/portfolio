/**
 * The Services page parts that are the same in both languages: which services, in what order,
 * their usual stack, and where each "Seen in" and "Why work with me" link goes. Labels live in the
 * copy (`en.ts`, `ar.ts`), one per target here.
 */

/**
 * Where a link goes: a page of this site or another site. `anchor` is the part of an Experience
 * row's `pageId` ("eva-pharma" → `#experience-eva-pharma-en`).
 */
export type LinkTarget = { path: string; anchor?: string } | { url: string };

export const SERVICE_KEYS = ["web", "site", "mobile", "full"] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export type ServiceData = { stack: readonly string[]; seen: readonly LinkTarget[] };

const FANTASY: LinkTarget = { path: "/work/fantasy-eg/" };
const EDUCOURSEZ: LinkTarget = { path: "/work/educoursez/" };

export const SERVICE_DATA: Readonly<Record<ServiceKey, ServiceData>> = {
  web: {
    stack: ["React", "Next.js", "Vue", "Nuxt", "TypeScript", "Tailwind CSS"],
    seen: [FANTASY, EDUCOURSEZ],
  },
  site: {
    stack: ["Next.js", "Nuxt", "Astro", "Tailwind CSS"],
    seen: [{ url: "https://fantasyeg.com" }, { path: "/experience/", anchor: "eva-pharma" }],
  },
  mobile: {
    stack: ["Expo", "React Native", "TypeScript"],
    seen: [EDUCOURSEZ],
  },
  full: {
    stack: ["Nuxt", "React Native", "NestJS", "Prisma", "PostgreSQL", "Docker"],
    seen: [FANTASY],
  },
};

export const WHY_KEYS = ["rtl", "enterprise", "product"] as const;

export type WhyKey = (typeof WHY_KEYS)[number];

export const WHY_LINKS: Readonly<Record<WhyKey, readonly LinkTarget[]>> = {
  rtl: [FANTASY, EDUCOURSEZ],
  enterprise: [{ path: "/experience/" }],
  product: [FANTASY],
};
