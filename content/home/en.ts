/** Home page copy (Home board). Inline markup: lib/rich/parse.ts. */
export const enHome = {
  hero: {
    role: "Senior Frontend Engineer",
    availability: "Open to new opportunities and freelance projects",
    title: "I build and modernize large web apps in React and TypeScript, in English and Arabic.",
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
          "Own the frontend architecture of a programme migrating a legacy jQuery application to React and TypeScript, while it stays in production. Before that, customer-facing Angular apps for *Vodafone Italy* (payments, offers, invoices, top-up).",
      },
      evaPharma: {
        role: "Software Engineer, Frontend",
        summary: "Rebuilt React apps on Next.js (static marketing sites, client-rendered dashboards) and onboarded junior developers.",
      },
      baianat: {
        role: "Software Engineer, Frontend",
        summary: "Admin dashboards and production apps in Angular and Vue.js, integrated with REST and GraphQL APIs.",
      },
    },
  },
  services: {
    title: "Services",
    lede: "Freelance work in English and Arabic, with right-to-left built in from the first screen.",
    start: "Start a project",
    details: "Service details",
    items: [
      { title: "Web apps & dashboards", text: "Admin panels and customer-facing apps in React, Next.js, Vue or Nuxt." },
      {
        title: "Landing & marketing sites",
        text: "Company sites and landing pages that open fast on a phone and are easy for search engines to read.",
      },
      { title: "Mobile apps", text: "iOS and Android apps with Expo and React Native." },
      { title: "Full product, end to end", text: "From the first design to launch: web, mobile, a NestJS API and deployment." },
    ],
  },
};

export type HomeCopy = typeof enHome;
