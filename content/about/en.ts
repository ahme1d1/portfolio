/**
 * About page copy. Who Ahmed is and what he likes building, then one door per audience (hiring, a
 * project), then the quick facts. The migration's method lives on Experience and the Vodafone case
 * study; here it is one linked line. The availability line is Home's, so the two never drift.
 */
export const enAbout = {
  title: "About",
  intro: [
    "I'm a senior frontend engineer based in Egypt, with 5+ years on large web and mobile apps.",
    "The work I like most comes in two kinds: taking a new product from its first design to launch, and modernizing a big app while people keep using it.",
  ],
  portraitAlt: "Ahmed Gabal",
  doors: {
    hiring: {
      title: "If you're hiring",
      body: "I'm open to senior frontend roles, remote or with a move to the GCC. Today I'm at VOIS, where I own the frontend architecture of a large Vodafone app as it moves to React.",
      links: { experience: "Full experience", vodafone: "Vodafone case study" },
    },
    project: {
      title: "If you have a project",
      body: "I take on freelance web apps, dashboards, company sites and mobile apps, in Arabic, English or both. On Fantasy EG I did all of it: the design, the app, the website, the admin dashboard and the API.",
      links: { services: "Service details", fantasy: "Fantasy EG case study" },
    },
  },
  facts: {
    title: "Quick facts",
    rows: [
      { term: "Based in", value: "Egypt" },
      { term: "Work", value: "Remote, open to relocating to the GCC" },
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
