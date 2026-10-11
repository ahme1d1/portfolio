/** About page copy (About board). The availability line is Home's, so the two never drift. */
export const enAbout = {
  title: "About",
  intro: [
    "I'm a senior frontend engineer with 5+ years on large web applications. At VOIS I own the frontend architecture of a programme migrating a Vodafone application from jQuery to React and TypeScript, while it stays in production.",
    "Features move one at a time: each is rebuilt as a React module that replaces its legacy widget in place.",
    "Alongside my job at VOIS I build products end to end. I designed and built Fantasy EG, fantasy football for the Egyptian Premier League, from scratch, starting with the design: the app, the website, the admin dashboard and the API. I work in Arabic and English.",
  ],
  links: { experience: "Full experience", fantasy: "Fantasy EG case study" },
  portraitAlt: "Ahmed Gabal",
  how: {
    title: "How I work",
    items: [
      {
        title: "Change running systems in small, reversible steps.",
        body: "New code replaces old in place, module by module, each behind a rollout flag with a kill switch that reverts it on its own.",
      },
      {
        title: "Treat the legacy code as the spec.",
        body: "I extract the business rules it already encodes and cover each one in tests, so a migration cannot silently change behaviour.",
      },
      {
        title: "Build right-to-left in from the first screen.",
        body: "Arabic-first interfaces built with CSS logical properties, so the layout flips direction without a parallel stylesheet.",
      },
      {
        title: "Own the whole product when it's needed.",
        body: "On Fantasy EG I owned the product rules, data model, API, admin dashboard and deployment as well as the frontend.",
      },
    ],
  },
  facts: {
    title: "Quick facts",
    rows: [
      { term: "Based in", value: "Egypt" },
      { term: "Experience", value: "5+ years" },
      { term: "Languages", value: "Arabic (native) and English" },
      { term: "Education", value: "Bachelor of Computer and Information Sciences, Mansoura University (2021)" },
    ],
    availability: "Availability",
  },
  /** Something Ahmed enjoys outside work. Optional: the panel is left out while it is null. */
  outside: { title: "Outside work", text: null as string | null },
};

export type AboutCopy = typeof enAbout;
