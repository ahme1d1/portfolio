import type { RoleKey, SkillKey } from "./data";

/** One role on the timeline. The dates, stack and dashboards are language-neutral (`data.ts`). */
export type RoleCopy = {
  /** "Senior Frontend Engineer"; the company link follows after the separator. */
  title: string;
  /** The link text: the Experience board names the company in full. */
  company: string;
  location: string;
  /** The paragraph before the bullets (the current role only). */
  lead: string | null;
  /** One plain sentence each, 30 words or fewer (tested). */
  bullets: readonly string[];
  subRole: { title: string; bullets: readonly string[] } | null;
  /** "Selected projects" chips; empty when there are none. */
  projects: readonly string[];
};

export type TermCopy = { term: string; value: string };

const EGYPT = "Egypt";

const roles: Readonly<Record<RoleKey, RoleCopy>> = {
  vois: {
    title: "Senior Frontend Engineer",
    company: "VOIS (Vodafone Intelligent Solutions)",
    location: EGYPT,
    lead: "Own the frontend architecture for a program moving a large legacy jQuery application, served by an OpenText CMS, to React and TypeScript. Each feature is rebuilt as a React module that replaces its legacy widget in place, so the old and new code run side by side in production.",
    bullets: [
      "Designed the migration architecture: module conventions, a typed API layer that ignores stale responses, a typed callback bus, and rollout flags per environment with a kill switch per module.",
      "Fixed two defects the build and tests missed: a Vite bundling error that shipped a blank page, and failed backend responses that could show users a wrong account result.",
      "Built a reusable React and TypeScript data table that replaced jQuery DataTables and a second table setup: sticky headers, search, cascading column filters, merged-cell sorting, column visibility and pagination.",
      "Rebuilt internal tools for Vodafone Germany teams as React modules (customer number lookup, roaming eligibility, store locator), linked by the callback bus that became the permanent integration API.",
      "Treated the legacy code as the specification: extracted its business rules and covered each one in Vitest and React Testing Library tests, so behavior could not change unnoticed.",
      "Removed an XSS risk in innerHTML templates and replaced misused ARIA roles with semantic markup and screen-reader text.",
      "Reworked the Vite build so a heavy vendor bundle no longer loads on pages that never use it.",
      "Enforced TypeScript strict mode and zero-warning ESLint in CI, documented each module's API and its intended differences from the legacy code, and reviewed pull requests in both codebases.",
    ],
    subRole: {
      title: "Vodafone Italy: Angular Developer",
      bullets: [
        "Developed and maintained customer-facing Vodafone apps for the Italian market (payments, offers, invoices, timeline, top-up, login, registration and history) on the existing backend REST services.",
        "Managed app state and reactive data flows with RxJS, NgRx and Angular Signals.",
        "Helped with Angular version upgrades, and migrated features without changing their behavior or breaking backward compatibility.",
        "Built reusable components and refactored legacy code to run faster and be easier to read and change.",
        "Took over regression and functional testing during QA absences, after a formal handover, so releases were still tested before they shipped.",
      ],
    },
    projects: [],
  },
  evaPharma: {
    title: "Software Engineer, Frontend",
    company: "EVA Pharma",
    location: EGYPT,
    lead: null,
    bullets: [
      "Rebuilt React applications on Next.js: marketing and corporate sites moved to static generation to load faster and rank in search, while signed-in dashboards stayed client-rendered.",
      "Built reusable component sets that cut implementation time on later projects.",
      "Onboarded and mentored junior developers joining the team.",
      "Worked with UX/UI designers and backend engineers to connect frontend features to backend services.",
    ],
    subRole: null,
    projects: ["EVA Pharma corporate website", "Curium corporate website", "Acticolla landing page", "Medsulto admin dashboard"],
  },
  baianat: {
    title: "Software Engineer, Frontend",
    company: "Baianat",
    location: EGYPT,
    lead: null,
    bullets: [
      "Integrated REST and GraphQL APIs into production applications built with Angular and Vue.js.",
      "Designed and built several admin dashboards behind production mobile apps.",
      "Found and fixed defects in several legacy projects, in small steps inside codebases new to me.",
      "Turned UI/UX wireframes into responsive production pages with markup search engines can read.",
    ],
    subRole: null,
    projects: ["Kemitt e-commerce", "twjeih e-learning", "Aqarat real estate"],
  },
};

const skills: Readonly<Record<SkillKey, TermCopy>> = {
  core: {
    term: "Core",
    value:
      "React, TypeScript, JavaScript (ES6+), Angular, frontend architecture, legacy modernization, micro-frontend architecture, component architecture",
  },
  also: { term: "Also experienced with", value: "Next.js, Vue.js, Nuxt.js, jQuery, RxJS, NgRx, Angular Signals, Pinia, Vuex" },
  markup: {
    term: "Markup and styling",
    value: "HTML5, CSS3, SCSS/Sass, Tailwind CSS, Bootstrap, responsive design, RTL and bilingual interfaces",
  },
  apis: { term: "APIs and data", value: "REST, fetch, AbortController, GraphQL, CMS integration" },
  testing: {
    term: "Testing",
    value: "Vitest, Jest, React Testing Library, Playwright, Storybook, unit, integration and end-to-end testing",
  },
  tooling: {
    term: "Tooling",
    value: "Vite, Webpack, ESLint, Prettier, Husky, Git, GitHub Enterprise, GitHub Actions, CI/CD, Jira, Docker",
  },
  practices: {
    term: "Practices",
    value:
      "Reusable component libraries, accessibility (WCAG/ARIA), web security (XSS prevention), performance optimization, code review, Agile",
  },
  fullStack: { term: "Full-stack (Fantasy EG and Educoursez)", value: "Node.js, NestJS, Prisma, PostgreSQL, Docker" },
};

const languages: readonly TermCopy[] = [
  { term: "Arabic", value: "Native" },
  { term: "English", value: "Professional working proficiency" },
];

/** Short month names for the date ranges, January first. */
const MONTHS: readonly string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Experience page copy (Experience board; phones show the same copy). */
export const enExperience = {
  title: "Experience",
  lede: "5+ years building and modernizing large web applications in React, Angular and Vue.",
  cv: "Download CV (PDF)",
  contact: "Contact",
  months: MONTHS,
  /** The end of the range for the role that goes on. */
  present: "present",
  roles: {
    title: "Roles",
    /** Between the role title and the company link. */
    separator: ", ",
    items: roles,
    chips: { projects: "Selected projects", dashboards: "Admin dashboards" },
  },
  skills: { title: "Skills", rows: skills },
  education: {
    title: "Education",
    location: EGYPT,
    degree: "Bachelor of Computer and Information Sciences",
    school: "Faculty of Computer & Information Sciences, Mansoura University",
  },
  languages: { title: "Languages", rows: languages },
};

export type ExperienceCopy = typeof enExperience;
