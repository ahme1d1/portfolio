/** Home page copy (Home board). Inline markup: lib/rich/parse.ts. */
export const enHome = {
  hero: {
    role: "Senior Frontend Engineer",
    availability: "Open to new opportunities and freelance projects",
    title: "I build and modernize large web and mobile apps, from the first design to launch.",
    hiring: { prefix: "Hiring?", label: "See my CV & experience" },
    project: { prefix: "Have a project?", label: "Let's build it" },
    portraitAlt: "Ahmed Gabal",
  },
  work: { title: "Selected work", all: "All work" },
  experience: {
    title: "Experience",
    all: "Full experience",
    cv: "Download CV (PDF)",
    /** Between the role and the company link in each row title. */
    separator: ", ",
    rows: {
      vois: {
        role: "Senior Frontend Engineer",
        summary:
          "Own the frontend architecture of a large Vodafone web app as it moves to React. Before that, customer-facing Angular apps for *Vodafone Italy* (payments, offers, invoices, top-up).",
      },
      evaPharma: {
        role: "Software Engineer, Frontend",
        summary: "Rebuilt React apps on Next.js (fast static marketing sites and signed-in dashboards) and onboarded junior developers.",
      },
      baianat: {
        role: "Software Engineer, Frontend",
        summary: "Admin dashboards and production apps in Angular and Vue.js, connected to REST and GraphQL APIs.",
      },
    },
  },
  services: {
    title: "Services",
    lede: "Freelance work in Arabic and English, with right-to-left built in from the first screen.",
    start: "Start a project",
    details: "Service details",
    items: [
      { title: "Web apps & dashboards", text: "Admin panels and customer-facing apps in React, Next.js, Vue or Nuxt." },
      {
        title: "Landing & marketing sites",
        text: "Company sites and landing pages that open fast on a phone and are easy for search engines to read.",
      },
      { title: "Mobile apps", text: "iOS and Android apps with Expo and React Native." },
      { title: "Full product, end to end", text: "I design it, build the web and mobile apps and the API behind them, and deploy it." },
    ],
  },
};

export type HomeCopy = typeof enHome;
