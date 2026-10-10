import type { StaticImageData } from "next/image";
import culturalBridge from "@/assets/images/projects/cultural-bridge.jpg";
import educoursezHome from "@/assets/images/projects/educoursez-home-ar.jpg";
import educoursezLessons from "@/assets/images/projects/educoursez-lessons-ar.jpg";
import fantasyEg from "@/assets/images/projects/fantasy-eg.jpg";
import qima from "@/assets/images/projects/qima.jpg";
import tikvideo from "@/assets/images/projects/tikvideo.jpg";
import type { CaseSlug } from "@/content/cases/slugs";

export type ProjectStatus = "live" | "inDevelopment" | "ongoing";

/** What fills a card's 16:10 frame. Vodafone (NDA) and Lean Academy are drawn, never screenshots. */
export type ProjectMedia =
  | { kind: "image"; image: StaticImageData }
  | { kind: "phones"; images: readonly [StaticImageData, StaticImageData] }
  | { kind: "vodafone" }
  | { kind: "lean" };

/**
 * The same in both languages. There is no date field on purpose: the four More-projects cards must
 * never show one.
 */
export type ProjectData = {
  brand: string;
  stack: readonly string[];
  status: ProjectStatus | null;
  media: ProjectMedia;
};

export const PROJECTS: Readonly<Record<CaseSlug, ProjectData>> = {
  "fantasy-eg": {
    brand: "Fantasy EG",
    stack: ["Nuxt 4", "React Native", "NestJS", "PostgreSQL"],
    status: "live",
    media: { kind: "image", image: fantasyEg },
  },
  educoursez: {
    brand: "Educoursez",
    stack: ["Expo", "React Native", "Nuxt 4", "NestJS"],
    status: "inDevelopment",
    media: { kind: "phones", images: [educoursezHome, educoursezLessons] },
  },
  "vodafone-modernization": {
    brand: "Vodafone modernization",
    stack: ["React", "TypeScript", "Vite", "Vitest"],
    status: "ongoing",
    media: { kind: "vodafone" },
  },
  tikvideo: {
    brand: "TikVideo",
    stack: ["Nuxt 4", "Vue 3", "Tailwind CSS", "PrimeVue"],
    status: null,
    media: { kind: "image", image: tikvideo },
  },
  "cultural-bridge": {
    brand: "Cultural Bridge",
    stack: ["Nuxt 3", "Vue 3", "Pinia", "PrimeVue"],
    status: null,
    media: { kind: "image", image: culturalBridge },
  },
  qima: {
    brand: "Qima",
    stack: ["Angular 20", "Tailwind CSS", "PrimeNG"],
    status: null,
    media: { kind: "image", image: qima },
  },
  "lean-academy": {
    brand: "Lean Academy",
    stack: ["Angular 19", "TypeScript", "RxJS"],
    status: null,
    media: { kind: "lean" },
  },
};

/** Home's "Selected work" and the first row on Work. */
export const MAIN_PROJECT_SLUGS = ["fantasy-eg", "educoursez", "vodafone-modernization"] as const satisfies readonly CaseSlug[];
