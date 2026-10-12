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
      "Each feature is rebuilt as a React module that mounts in place of the jQuery widget it replaces, on the same CMS page.",
  },
  facts: {
    role: [{ text: "Senior Frontend Engineer", note: "Owner of the frontend architecture" }],
    timeline: [{ text: "2024 – present", note: null }],
    company: [{ text: "VOIS", note: "Vodafone Intelligent Solutions" }],
  },
  summary: {
    owned: "The frontend architecture of the move to React and TypeScript: its structure, the shared pieces, and code review in both codebases.",
    hard: "Changing an application that can't be stopped, and two defects that a passing build and test suite didn't catch.",
    result: "React and the legacy app run side by side in production, and any module can be switched off on its own.",
    resultNote: null,
  },
  problem: [
    "A large legacy JavaScript and jQuery application, served by an OpenText CMS, had to move to React and TypeScript without being taken offline. The code was the only record of its business rules.",
    "So the change had to happen one feature at a time, in place, with a way back for each one.",
  ],
  role: {
    intro: "I designed how the migration is structured and built the shared pieces that every module uses.",
    items: [
      { title: "Architecture", body: "How modules mount, load data, talk to each other and roll out" },
      { title: "Shared components", body: "The reusable data table" },
      { title: "Quality", body: "Code reviews in both codebases, and the strict TypeScript and ESLint settings" },
    ],
    shots: null,
  },
  built: {
    intro:
      "Every module rests on the pieces drawn below: a typed API layer, its own rollout flag and kill switch, and a typed callback bus to the other modules.",
    groups: [
      {
        title: "One table instead of two",
        intro:
          "A reusable React and TypeScript data table replaced a legacy jQuery DataTables implementation and a separate JSON-driven table path, behind one component.",
        blocks: null,
      },
      {
        title: "Internal tools for Vodafone Germany teams",
        intro: "Rebuilt as React modules that talk to each other through the callback bus.",
        blocks: null,
      },
      {
        title: "Rules extracted from the legacy code and pinned in tests",
        intro:
          "Vitest and React Testing Library suites cover each rule, so the migration can't change behavior without a test failing. Each module's API contract is written down, along with every deliberate difference from the legacy behavior.",
        blocks: null,
      },
    ],
  },
  hard: {
    intro: "Neither of these defects showed up in the build or the tests. I diagnosed and fixed both.",
    items: [
      {
        title: "A blank page in production",
        body: "Vite had treated some dependencies as external and left them out of the production bundle, so the page loaded empty. No test in the suite checked for that.",
      },
      {
        title: 'An outage that looked like a "no"',
        body: "When the backend failed, its error response looked the same as a valid negative answer, so a user could be shown an incorrect result about their account. A failed response is now handled as an error, separately from real answers.",
      },
    ],
    dropped: {
      title: "Ideas we dropped",
      items: [
        "A big-bang rewrite, because the application had to keep running.",
        "Keeping two table implementations side by side.",
      ],
    },
  },
  result: {
    paragraphs: ["The migration is ongoing."],
    blocks: [
      { title: "Live throughout", body: "The application has kept running while its features move to React." },
      { title: "Reversible", body: "Each module has a rollout flag per environment and its own kill switch." },
      { title: "One table", body: "A single React component serves both former table paths." },
      {
        title: "Behavior pinned",
        body: "Business rules that were recorded only in the legacy code are now written down as tests.",
      },
      {
        title: "Security, accessibility and bundle fixes",
        body: "I removed unsafe HTML injection from templates, an XSS risk. I replaced misused ARIA roles with semantic HTML and screen-reader text, and kept a heavy vendor bundle off pages that never use it.",
      },
      { title: "Strict by default", body: "The team's CI enforces TypeScript strict mode and zero-warning ESLint." },
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
      body: "A passing build doesn't show how the bundle loads in the real page, or what a failed request looks like to the user. I now check both directly.",
    },
    {
      title: "Turn undocumented rules into tests first",
      body: "Pin each rule in a test before its code is replaced, while the legacy behavior is still there to check against.",
    },
    {
      title: "Give every step a way back",
      body: "When each change can be turned off by itself, every release is a small risk.",
    },
  ],
};
