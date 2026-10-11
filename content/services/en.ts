/**
 * Services page copy (Services boards). Items are keyed like `data.ts`, which holds the stacks and
 * link targets; every link label here has one target there. Copy uses the inline markup of
 * lib/rich/parse.ts.
 */
export const enServices = {
  hero: {
    title: "Services",
    lede: "Freelance web and mobile work in English and Arabic, with right-to-left built in from the first screen.",
    start: "Start a project",
    work: "See my work",
  },
  what: {
    title: "What I do",
    getTitle: "What you get",
    stackLabel: "Typical stack:",
    seenLabel: "Seen in:",
    items: {
      web: {
        title: "Web apps & dashboards",
        description:
          "Admin panels, internal tools and customer-facing web apps, built in React, Next.js, Vue or Nuxt, in English, Arabic or both.",
        get: [
          "Screens built from reusable, typed components",
          "Data tables with search, filters, sorting and pagination",
          "Unit and end-to-end tests on the main user flows",
        ],
        seen: ["Fantasy EG dashboard", "Educoursez dashboard"],
      },
      site: {
        title: "Landing & marketing sites",
        description: "Company websites and landing pages that open fast on a phone and are easy for search engines to read.",
        get: [
          "Pages generated ahead of time and served as static files",
          "Search basics in place: titles, share previews, sitemap",
          "Arabic and English versions, each on its own address",
        ],
        seen: ["fantasyeg.com", "EVA Pharma & Curium sites"],
      },
      mobile: {
        title: "Mobile apps",
        description: "iOS and Android apps from one codebase with Expo and React Native, right-to-left included.",
        get: [
          "Arabic and English, with the layout switching to right-to-left in Arabic",
          "Push notifications and in-app chat where the product needs them",
        ],
        seen: ["Educoursez student app"],
      },
      full: {
        title: "Full product, end to end",
        description:
          "From the first design to a live product: web, mobile, the API behind them and the deployment. I'm responsible for all of it.",
        get: [
          "The design first, with every screen agreed before it is built",
          "A NestJS API on PostgreSQL, with an admin dashboard to run it",
          "Deployment with separate test and live environments",
        ],
        seen: ["Fantasy EG (designed and built from scratch)"],
      },
    },
  },
  process: {
    title: "How a project runs",
    steps: [
      { title: "Talk", text: "You describe the goal; I reply within 24 hours." },
      { title: "Design", text: "Screens first, agreed before any code." },
      { title: "Build", text: "I build in small steps you can see, each one tested." },
      { title: "Launch & handover", text: "I deploy it, document it and hand it over to you." },
    ],
  },
  why: {
    title: "Why work with me",
    items: {
      rtl: {
        title: "Right-to-left products I've built",
        body: "Fantasy EG is live with Arabic as its default language, and Educoursez is Arabic-first. In both, right-to-left was part of the layout from the first screen.",
        links: ["Fantasy EG", "Educoursez"],
        linkSuffix: null,
      },
      enterprise: {
        title: "5+ years on large enterprise apps",
        body: "At VOIS, for Vodafone: the frontend architecture for moving a live jQuery application to React and TypeScript, and customer apps for Vodafone Italy.",
        links: ["Experience"],
        linkSuffix: null,
      },
      product: {
        title: "The whole product, from design to API and deployment",
        body: "Fantasy EG: I designed and built the app and the website from scratch, starting with the design. The admin dashboard, the API and the deployment were mine too.",
        links: ["Read the case study"],
        /** Visually hidden after the link text, so the link has a name of its own (as on project cards). */
        linkSuffix: ": Fantasy EG",
      },
    },
    pricing: {
      label: "Pricing",
      text: "Every project is quoted after a short call. Tell me what you need.",
    },
  },
  bandLede: "Write to me about the dashboard, site, app or full product you need.",
};

export type ServicesCopy = typeof enServices;
