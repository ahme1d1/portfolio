import culturalBridgeEvent from "@/assets/images/cases/cultural-bridge-event.jpg";
import culturalBridgeEvents from "@/assets/images/cases/cultural-bridge-events.jpg";
import culturalBridgePhone from "@/assets/images/cases/cultural-bridge-phone.jpg";
import educoursezHomeEnDark from "@/assets/images/cases/educoursez-home-en-dark.jpg";
import fantasyEgPhone from "@/assets/images/cases/fantasy-eg-phone.jpg";
import qimaCertification from "@/assets/images/cases/qima-certification.jpg";
import qimaCertifications from "@/assets/images/cases/qima-certifications.jpg";
import qimaPhone from "@/assets/images/cases/qima-phone.jpg";
import tikvideoFeatures from "@/assets/images/cases/tikvideo-features.jpg";
import tikvideoHowItWorks from "@/assets/images/cases/tikvideo-how-it-works.jpg";
import tikvideoPhone from "@/assets/images/cases/tikvideo-phone.jpg";
import culturalBridge from "@/assets/images/projects/cultural-bridge.jpg";
import educoursezHomeAr from "@/assets/images/projects/educoursez-home-ar.jpg";
import educoursezLessonsAr from "@/assets/images/projects/educoursez-lessons-ar.jpg";
import fantasyEg from "@/assets/images/projects/fantasy-eg.jpg";
import qima from "@/assets/images/projects/qima.jpg";
import tikvideo from "@/assets/images/projects/tikvideo.jpg";
import type { CaseSlug } from "./slugs";
import type { CaseData } from "./types";

/** The case studies' language-neutral parts. Copy lives in each case's `en.ts` and `ar.ts`. */
export const CASE_DATA: Readonly<Record<CaseSlug, CaseData>> = {
  "fantasy-eg": {
    stack: [
      "Nuxt 4",
      "Vue 3",
      "TypeScript",
      "Pinia",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Expo",
      "React Native",
      "Vitest",
      "Playwright",
    ],
    site: { href: "https://fantasyeg.com", label: "fantasyeg.com" },
    facts: ["role", "timeline", "platforms", "stack"],
    hero: {
      kind: "browser",
      bar: { kind: "url", url: "fantasyeg.com", lock: true },
      desktop: fantasyEg,
      phone: fantasyEgPhone,
    },
    roleShots: null,
    built: { figure: "fantasy-architecture", groups: [{ figure: null }] },
  },
  educoursez: {
    stack: ["TypeScript", "Expo", "React Native", "Nuxt 4", "NestJS", "Prisma", "PostgreSQL", "Socket.IO", "Expo push"],
    site: null,
    facts: ["role", "status", "platforms", "stack"],
    hero: { kind: "phones", images: [educoursezHomeAr, educoursezLessonsAr, educoursezHomeEnDark] },
    roleShots: null,
    built: { figure: "educoursez-architecture", groups: [{ figure: null }, { figure: "educoursez-phases" }] },
  },
  "vodafone-modernization": {
    stack: ["React", "TypeScript", "Vite", "Vitest", "React Testing Library", "ESLint", "jQuery", "OpenText CMS"],
    site: null,
    facts: ["role", "timeline", "company", "stack"],
    hero: { kind: "diagram", figure: "vodafone-hero" },
    roleShots: null,
    built: {
      figure: "vodafone-architecture",
      groups: [{ figure: "vodafone-table" }, { figure: "vodafone-tools" }, { figure: "vodafone-steps" }],
    },
  },
  tikvideo: {
    stack: [
      "Nuxt 4",
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "daisyUI",
      "PrimeVue",
      "Pinia",
      "VeeValidate",
      "Chart.js",
      "Vitest",
      "Playwright",
      "axe-core",
    ],
    site: null,
    facts: ["role", "languages", "platforms", "stack"],
    hero: { kind: "browser", bar: { kind: "blank" }, desktop: tikvideo, phone: tikvideoPhone },
    roleShots: {
      frame: "bare",
      shots: [
        { image: tikvideoHowItWorks, bar: { kind: "dots" } },
        { image: tikvideoFeatures, bar: { kind: "dots" } },
      ],
    },
    built: { figure: "tikvideo-architecture", groups: [{ figure: null }, { figure: null }] },
  },
  "cultural-bridge": {
    stack: [
      "Nuxt 3",
      "Vue 3",
      "Pinia",
      "VeeValidate",
      "PrimeVue",
      "PrimeFlex",
      "Bootstrap 4",
      "Chart.js",
      "FullCalendar",
      "Swiper",
      "Google Maps",
    ],
    site: null,
    facts: ["role", "languages", "platforms", "stack"],
    hero: {
      kind: "browser",
      bar: { kind: "url", url: "culturebridgesa.com", lock: true },
      desktop: culturalBridge,
      phone: culturalBridgePhone,
    },
    roleShots: {
      frame: "browser",
      shots: [
        { image: culturalBridgeEvents, bar: { kind: "url", url: "culturebridgesa.com/events", lock: false } },
        { image: culturalBridgeEvent, bar: { kind: "url", url: "culturebridgesa.com/events/…", lock: false } },
      ],
    },
    built: { figure: "cultural-bridge-architecture", groups: [{ figure: null }] },
  },
  qima: {
    stack: [
      "Angular 20",
      "TypeScript",
      "RxJS",
      "Angular SSR on Express",
      "Tailwind CSS",
      "PrimeNG",
      "FullCalendar",
      "ngx-translate",
      "Docker",
    ],
    site: null,
    facts: ["role", "languages", "platforms", "stack"],
    hero: { kind: "browser", bar: { kind: "dots" }, desktop: qima, phone: qimaPhone },
    roleShots: {
      frame: "browser",
      shots: [
        { image: qimaCertifications, bar: { kind: "dots" } },
        { image: qimaCertification, bar: { kind: "dots" } },
      ],
    },
    built: { figure: "qima-architecture", groups: [{ figure: null }, { figure: null }] },
  },
  "lean-academy": {
    stack: [
      "Angular 19",
      "TypeScript",
      "RxJS",
      "Angular Material",
      "Bootstrap",
      "SignalR",
      "ApexCharts",
      "hls.js",
      "ngx-translate",
      "ng-openapi-gen",
    ],
    site: null,
    facts: ["role", "languages", "platforms", "stack"],
    hero: { kind: "diagram", figure: "lean-hero" },
    roleShots: null,
    built: { figure: "lean-architecture", groups: [{ figure: null }, { figure: "lean-builder" }] },
  },
};
