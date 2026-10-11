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
  /** `*Bold lead-in:*` then the rest. */
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
    lead: "Own the frontend architecture for a programme migrating a large legacy JavaScript/jQuery application, served by an OpenText CMS, to React and TypeScript. Features are rebuilt as independently mountable modules that replace legacy widgets in place, so React and the legacy application run side by side in production, with no big-bang rewrite.",
    bullets: [
      "*Designed the migration architecture:* module conventions, a typed API layer that cancels superseded requests so a slow response never overwrites a newer one, cross-module communication through a typed callback bus, and per-environment rollout flags with a kill switch that reverts any module on its own.",
      "*Fixed two high-impact defects a passing build and test suite missed:* a Vite dependency-externalization issue that shipped a blank page to production, and an outage-handling flaw where a failed backend response looked like a valid negative answer and could show users a wrong result about their account.",
      "*Built a reusable React/TypeScript data table* that replaced a legacy jQuery DataTables implementation and a separate JSON-driven table path: one component with sticky headers, global search, cascading column filters, merged-cell sorting, column visibility and pagination.",
      "*Rebuilt internal tools used by Vodafone Germany teams* as React modules (customer number lookup, roaming eligibility, store locator), plus the typed callback bus that became the permanent integration API between them.",
      "*Used the legacy codebase as the migration specification:* extracted its business rules and covered each one in Vitest and React Testing Library suites, so the migration could not silently change behaviour.",
      "*Improved security, accessibility and build performance:* removed an XSS surface created by templated innerHTML, replaced misapplied ARIA roles with semantic markup and screen-reader text, and reworked the Vite build so a heavy vendor bundle no longer loads on pages that never use it.",
      "*Enforced TypeScript strict mode and zero-warning ESLint* in the team's CI pipeline, documented each module's API contracts and deliberate divergences from legacy behaviour, and reviewed pull requests across both the legacy and React codebases.",
    ],
    subRole: {
      title: "Vodafone Italy: Angular Developer",
      bullets: [
        "Developed and maintained customer-facing Vodafone applications for the Italian market (payments, offers, invoices, timeline, top-up, login, registration and history), integrated with existing backend REST services.",
        "Implemented complex state management and reactive data flows with RxJS, NgRx and Angular Signals.",
        "Contributed to Angular version upgrades, migrating features while preserving functional parity and backward compatibility.",
        "Built and maintained reusable components, and refactored legacy code to make it faster and easier to read and change.",
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
      "Rebuilt React applications on Next.js: marketing and corporate sites moved to static generation for faster first paint and search visibility, while authenticated dashboards stayed client-rendered.",
      "Developed reusable component sets that shortened implementation time on later projects.",
      "Provided technical guidance and onboarding for junior developers joining the team.",
      "Worked with UX/UI designers and backend engineers to integrate frontend features with backend services.",
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
      "Designed and developed multiple admin dashboards backing production mobile applications.",
      "Diagnosed and fixed defects across several legacy projects, working incrementally inside unfamiliar codebases.",
      "Translated UI/UX wireframes into responsive, SEO-friendly production markup.",
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
