import type { SeoCopy } from "./types";

/**
 * Search titles and meta descriptions. Titles hold only the topic; " | Ahmed Gabal" is appended
 * when the metadata is built. Approved in the Round 7 review, except the four More-projects case
 * studies, which are drafts waiting for Ahmed's OK.
 */
export const enSeo: SeoCopy = {
  home: {
    title: "Senior Frontend Engineer, React and TypeScript",
    description:
      "I build and modernize large web apps in React and TypeScript, in English and Arabic. Senior Frontend Engineer at VOIS, open to roles and freelance projects.",
  },
  work: {
    title: "Work and case studies: web and mobile apps",
    description:
      "Case studies of Fantasy EG, Educoursez and a Vodafone jQuery to React migration, plus client projects and earlier work at EVA Pharma and Baianat.",
  },
  experience: {
    title: "Experience and CV, Senior Frontend Engineer",
    description:
      "5+ years as a frontend engineer at VOIS (Vodafone), on Vodafone Italy apps, at EVA Pharma and at Baianat. Roles, skills, education and a CV to download.",
  },
  services: {
    title: "Freelance apps and sites in Arabic and English",
    description:
      "Web apps, dashboards, landing pages and mobile apps in English and Arabic, with right-to-left built in from the first screen. Quoted after a short call.",
  },
  about: {
    title: "About me, a senior frontend engineer in Egypt",
    description:
      "Senior frontend engineer in Egypt with 5+ years on large web apps. I own the frontend architecture of a Vodafone migration and built Fantasy EG on my own.",
  },
  contact: {
    title: "Contact me about a role or a project",
    description:
      "Write to me about a role or a project: send a message on this page, or use email, WhatsApp, LinkedIn or GitHub. I reply within 24 hours.",
  },
  notFound: {
    title: "Page not found: old or mistyped link",
    description:
      "This page doesn't exist. The link may be old or mistyped. Go to the home page, see my work, or get in touch through the contact page instead.",
  },
  cases: {
    "fantasy-eg": {
      title: "Fantasy EG case study: fantasy football app",
      description:
        "How I designed and built Fantasy EG alone: a fantasy football web app, marketing site, admin dashboard and NestJS API, live at fantasyeg.com since August 2026.",
    },
    educoursez: {
      title: "Educoursez: Arabic-first education platform",
      description:
        "Educoursez, an Arabic-first education platform for Egyptian university students. I'm the only engineer on its Expo app, Nuxt dashboard and NestJS API.",
    },
    "vodafone-modernization": {
      title: "Vodafone case study: jQuery to React migration",
      description:
        "How a live Vodafone jQuery application moves to React and TypeScript one module at a time, with a kill switch per module and its business rules pinned in tests.",
    },
    tikvideo: {
      title: "TikVideo case study: Arabic AI video platform",
      description:
        "How I built both frontends of TikVideo, an Arabic AI platform that turns ideas into videos, images and songs: the website and the admin dashboard.",
    },
    "cultural-bridge": {
      title: "Cultural Bridge: Saudi events and tickets",
      description:
        "Cultural Bridge, an Arabic platform for cultural events in Saudi Arabia: seat booking with QR tickets, plus dashboards for organizers and the admin team.",
    },
    qima: {
      title: "Qima case study: certification exam vouchers",
      description:
        "Qima sells international professional certifications in Saudi Arabia. I built the website's sign-in, cart, payments and exam booking, and most of the dashboard.",
    },
    "lean-academy": {
      title: "Lean Academy case study: learning platform",
      description:
        "Lean Academy, a learning platform organizations run as their own. I built the website builder each one uses for its site, plus reports and SCORM courses.",
    },
  },
};
