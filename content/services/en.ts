/**
 * Services page copy (Services boards). Items are keyed like `data.ts`, which holds the stacks and
 * link targets; every link label here has one target there. Copy uses the inline markup of
 * lib/rich/parse.ts.
 */
export const enServices = {
  hero: {
    title: "Services",
    lede: "Freelance web and mobile work in Arabic and English, with right-to-left built in from the first screen.",
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
          "Admin panels, internal tools and customer-facing web apps, built in React, Next.js, Vue or Nuxt, in Arabic, English or both.",
        get: [
          "Screens built from one set of reusable components",
          "Data tables with search, filters, sorting and pagination",
          "Automated tests on the main user flows",
        ],
        seen: ["Fantasy EG dashboard", "Educoursez dashboard"],
      },
      site: {
        title: "Landing & marketing sites",
        description: "Company websites and landing pages that open fast on a phone and are easy for search engines to read.",
        get: [
          "Pages prepared ahead of time, so they load fast",
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
          "I design the product, build the web and mobile apps and the API behind them, and handle the deployment.",
        get: [
          "Designs for every screen, web and mobile",
          "An API and database, with an admin dashboard to run the product",
          "Deployment with separate test and live environments",
        ],
        seen: ["Fantasy EG"],
      },
    },
  },
  process: {
    title: "How a project runs",
    steps: [
      { title: "Talk", text: "You describe the goal, and we talk it through." },
      { title: "Design", text: "I design the screens, and we agree on them before I write code." },
      { title: "Build", text: "I build in small, tested steps that you see as they land." },
      { title: "Launch & handover", text: "I deploy it, document it and hand it over to you." },
    ],
  },
  why: {
    title: "Why work with me",
    items: {
      rtl: {
        title: "Right-to-left products I've built",
        body: "Fantasy EG is live with Arabic as its default language, and Educoursez is Arabic-first. In both, the layout was built for right to left from the start.",
        links: ["Fantasy EG", "Educoursez"],
        linkSuffix: null,
      },
      enterprise: {
        title: "5+ years on large enterprise apps",
        body: "At VOIS I own the frontend architecture of a large Vodafone app. Before that, I built customer apps for Vodafone Italy.",
        links: ["Experience"],
        linkSuffix: null,
      },
      product: {
        title: "Whole products, start to finish",
        body: "On Fantasy EG I started with the design, then built the app, the website, the admin dashboard and the API from scratch, and deployed them.",
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
