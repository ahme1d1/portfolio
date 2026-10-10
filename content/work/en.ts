/** Work page copy (Projects board). */
export const enWork = {
  title: "Work",
  lede: "Three main projects, four client projects with case studies, and earlier work at EVA Pharma and Baianat (2021 – 2023).",
  main: { title: "Main projects" },
  more: {
    title: "More projects",
    lede: "Client products I worked on as a frontend engineer, each with its own case study.",
  },
  other: {
    title: "Other client work",
    items: {
      eventsPlatform: { name: "Events platform", text: "Events admin dashboard" },
      fazah: { name: null, text: "Exhibitions admin dashboard" },
      asass: { name: null, text: "HR admin dashboard" },
    },
  },
  earlier: {
    title: "Earlier work",
    lede: "Projects from my time at EVA Pharma and Baianat, as listed in my CV.",
    headers: { project: "Project", type: "Type", company: "Company" },
    names: { evaPharmaSite: "EVA Pharma corporate website", curiumSite: "Curium corporate website" },
    types: {
      corporate: "Corporate website",
      landing: "Landing page",
      dashboard: "Admin dashboard",
      ecommerce: "E-commerce",
      elearning: "E-learning",
      realEstate: "Real estate",
    },
  },
};

export type WorkCopy = typeof enWork;
