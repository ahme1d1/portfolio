import type { CaseCopy } from "../types";

export const enFantasy: CaseCopy = {
  title: null,
  meta: "Solo project, 2026 – present",
  lede: "Fantasy football for the Egyptian Premier League, designed and built from scratch, starting with the design.",
  notice: null,
  hero: {
    alts: ["The Fantasy EG website on desktop, in Arabic", "Fantasy EG on a phone"],
    caption: "The live site on desktop and on a phone. Arabic is the default language.",
  },
  facts: {
    role: [{ text: "Product design, frontend, backend and deployment", note: null }],
    timeline: [{ text: "Built from June 2026. Live since August 2026.", note: null }],
    platforms: [
      { text: "Web app", note: "Live", live: true },
      { text: "Marketing site", note: "Live", live: true },
      { text: "Admin dashboard", note: "Live", live: true },
      { text: "REST API", note: "Live", live: true },
      { text: "Mobile app", note: "In development, not in the stores yet" },
    ],
  },
  summary: {
    owned: "The whole product: game rules, design, web app, marketing site, admin dashboard, API and deployment.",
    hard: "Keeping one set of game rules true on every screen, and getting mixed-direction text to display in the right order in Arabic.",
    result: "Live at fantasyeg.com for the 2026/27 Egyptian Premier League season.",
    resultNote: null,
  },
  problem: [
    "Fantasy Premier League is built around England's league. Fantasy EG brings the same game to the Egyptian Premier League: a 15-player squad on a budget, transfers every gameweek, chips, and classic and head-to-head leagues between friends.",
    "It had to be live for the first gameweek of the 2026/27 season, in Arabic first and English second. The rules (prices, points, deadlines, chips) had to give the same answer on the website, in the mobile app and in the admin dashboard where match results are entered.",
  ],
  role: {
    intro: "I built it alone and owned every layer.",
    items: [
      { title: "Product", body: "The game rules and the data model." },
      { title: "Design", body: "The app screens and the landing page." },
      {
        title: "Frontend",
        body: "The web app, the bilingual marketing site and the admin dashboard in Nuxt 4; the mobile app in Expo and React Native.",
      },
      { title: "Backend", body: "The REST API in NestJS, Prisma and PostgreSQL." },
      { title: "Operations", body: "Docker, GitHub Actions, and separate development and production environments, self-hosted." },
    ],
    shots: null,
  },
  built: {
    intro: "Every game rule lives in the API, and the clients display what it returns.",
    groups: [
      {
        title: null,
        intro: null,
        blocks: [
          {
            title: "Design before code",
            body: "The app screens and the landing page were designed first as a working prototype, and every screen was built to match it.",
          },
          {
            title: "Arabic first, one stylesheet",
            body: "All layout uses CSS logical properties (margin-inline-start rather than margin-left), so one stylesheet serves both directions.",
          },
          {
            title: "Two rendering modes",
            body: "Marketing pages are prerendered for search, Arabic at / and English at /en/. The game under /app runs only in the browser, because its live session state would not match a server-rendered page.",
          },
          {
            title: "The server owns the rules",
            body: "Prices, points, deadlines and chips are computed on the server. Money and points are stored as integer tenths (4.5m is 45) and converted only at the API boundary.",
          },
          {
            title: "One client package",
            body: "The API client, the game's vocabulary and the Arabic/English dictionary live in @fel/core, shared by the website and the mobile app. Its squad rules are the same code the API runs.",
          },
          {
            title: "Two environments",
            body: "GitHub Actions builds the Docker images. A push to develop deploys development; a merge into main deploys production, with database migrations run before the API starts.",
          },
        ],
      },
    ],
  },
  hard: {
    intro: null,
    items: [
      {
        title: "A scoring rule kept in two places",
        body: "The website once kept its own copy of the scoring engine. A rule added on the server never reached it, so player profiles showed 2 points too few for every match the rule covered. I deleted the copy. The API now sends each player's points broken down, and a parity test fails the build if the website's rule values drift from the API's.",
      },
      {
        title: "Mixed-direction text in Arabic",
        body: "Short runs of letters, numbers and signs broke in Arabic. The Triple Captain badge {C ×3} rendered as {3×C}, and a {−4} points hit drew its minus on the wrong side. Each of those runs is now pinned left to right on purpose.",
      },
      {
        title: "Code that assumed a 38-gameweek season",
        body: "The Egyptian league's first stage is shorter than 38 gameweeks. Head-to-head schedules ran past its last gameweek, and every head-to-head league failed to load. The schedule is now built from the gameweeks that actually exist.",
      },
    ],
    dropped: {
      title: "Ideas I dropped",
      items: [
        'Guest accounts. A "try it without signing up" session created a real account for every new device, and nothing cleaned those accounts up, so I removed it.',
        "A separate landing site. The first landing page was its own Astro project. I folded it into the Nuxt app, so marketing and the game share one codebase and one set of design tokens.",
        "The mock data layer. The web app started on mock services that kept the real API's shapes, so switching to the live API was a configuration change. I retired it once the API was ready.",
      ],
    },
  },
  result: {
    paragraphs: [
      "Everything except the mobile app is in production. The mobile app is in development and not in the app stores yet.",
    ],
    blocks: null,
    metrics: [
      { value: null, label: "Managers signed up" },
      { value: null, label: "Leagues created" },
      { value: null, label: "Gameweeks played so far" },
    ],
  },
  learned: [
    {
      title: "Give every rule one home",
      body: "When a client needs a rule, it should run the API's own code, or a test should check its copy against the API.",
    },
    {
      title: "Start right-to-left",
      body: "Logical properties cost nothing extra on the first day. Converting a finished layout to them is much more work.",
    },
    {
      title: "Loading, empty and failed are three different screens",
      body: 'A dash means "no value", never "still loading", and a failed request must never read as "you have no leagues".',
    },
  ],
};
