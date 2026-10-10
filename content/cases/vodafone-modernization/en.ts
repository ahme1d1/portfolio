import type { CaseCopy } from "../types";

export const enVodafone: CaseCopy = {
  // The brand, written out: the Arabic page has its own title, and both languages need the same keys.
  title: "Vodafone modernization",
  meta: "VOIS, 2024 – present",
  lede: "Migrating a jQuery application to React and TypeScript one module at a time, while it stays in production.",
  notice:
    "Details are kept general and there are no screenshots, because the code is Vodafone's. The diagrams show how the migration is structured.",
  hero: {
    alts: [],
    caption:
      "Each feature is rebuilt as a module that mounts in place of the legacy widget it replaces. React and the legacy application run side by side in production.",
  },
  facts: {
    role: [{ text: "Senior Frontend Engineer", note: "Owner of the frontend architecture" }],
    timeline: [{ text: "2024 – present", note: null }],
    company: [{ text: "VOIS", note: "Vodafone Intelligent Solutions" }],
  },
  summary: {
    owned: "The frontend architecture of a programme moving a live jQuery application to React and TypeScript.",
    hard: "Changing an application that can't be stopped, and two defects that a passing build and test suite didn't catch.",
    result: "React and the legacy app run side by side in production, and any module can be switched off on its own.",
    resultNote: null,
  },
  problem: [
    "A large legacy JavaScript and jQuery application, served by an OpenText CMS, had to move to React and TypeScript while it stayed in production. Its business rules lived in the code, not in documents.",
    "A big-bang rewrite was not an option. The change had to happen one feature at a time, in place, with a way back for each one.",
  ],
  role: {
    intro:
      "I own the frontend architecture: I designed how the migration is structured, built the shared pieces the modules rely on, and review pull requests across both the legacy and the React codebases.",
    items: [
      { title: "Architecture", body: "The modules, the API layer, the callback bus and the rollout flags" },
      { title: "Shared components", body: "The reusable data table" },
      { title: "Quality", body: "TypeScript strict mode, zero-warning ESLint and code reviews" },
    ],
    shots: null,
  },
  built: {
    intro:
      "Features are rebuilt as independently mountable modules that replace legacy widgets in place. Four pieces hold the system together.",
    groups: [
      {
        title: "One table instead of two",
        intro:
          "A reusable React and TypeScript data table replaced a legacy jQuery DataTables implementation and a separate JSON-driven table path, behind one component.",
        blocks: null,
      },
      {
        title: "Internal tools for Vodafone Germany teams",
        intro: "Rebuilt as React modules, joined by the typed callback bus.",
        blocks: null,
      },
      {
        title: "Rules extracted from the legacy code and pinned in tests",
        intro:
          "Each business rule is extracted from the legacy code and covered in Vitest and React Testing Library suites, so the migration can't silently change behaviour. Each module's API contract, and every deliberate divergence from the legacy behaviour, is written down.",
        blocks: null,
      },
    ],
  },
  hard: {
    intro: "Two high-impact defects passed the build and the test suite. I diagnosed and fixed both.",
    items: [
      {
        title: "A blank page in production",
        body: "The build was green and the tests passed, yet production showed a blank page. The cause was a Vite dependency-externalization issue, something no test in the suite was looking at.",
      },
      {
        title: 'An outage that looked like a "no"',
        body: "When the backend failed, its error response looked the same as a valid negative answer, so a user could be shown an incorrect result about their account. A failed response is now handled as an error, separately from real answers.",
      },
    ],
    dropped: {
      title: "Approaches we dropped",
      items: [
        "A big-bang rewrite, because the application had to keep running. It moves one module at a time instead.",
        "Two separate table implementations, now merged into one component.",
      ],
    },
  },
  result: {
    paragraphs: ["The migration is ongoing."],
    blocks: [
      { title: "Migrated while in production", body: "Features move module by module while the application stays live." },
      { title: "Reversible", body: "A rollout flag per environment and a kill switch for every module." },
      { title: "One table", body: "One React component where there were two table paths." },
      { title: "Behaviour pinned", body: "Extracted business rules covered in Vitest and React Testing Library." },
      {
        title: "Security, accessibility and bundle fixes",
        body: "An XSS surface from templated innerHTML removed; misapplied ARIA roles replaced with semantic markup and screen-reader text; a heavy vendor bundle kept off pages that never use it.",
      },
      { title: "Strict by default", body: "TypeScript strict mode and zero-warning ESLint enforced in the team's CI." },
    ],
    metrics: [
      { value: null, label: "Modules migrated so far" },
      { value: null, label: "Screens the data table serves" },
      { value: null, label: "Vendor bundle KB removed" },
    ],
  },
  learned: [
    {
      title: "Check how the bundle loads and what a failure looks like",
      body: "Both defects passed every check. I now look at how the bundle really loads, and at what a failure looks like to the user.",
    },
    {
      title: "Turn undocumented rules into tests first",
      body: "When the rules aren't written down, extract them from the legacy code and pin them in tests before replacing anything.",
    },
    {
      title: "Give every step a way back",
      body: "A kill switch per module keeps each release small and each mistake reversible.",
    },
  ],
};
