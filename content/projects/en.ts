/**
 * Project card copy. A `null` title means the brand name is the title (it is Latin in both
 * languages). Copy uses the inline markup of lib/rich/parse.ts.
 */
export const enProjects = {
  link: "Read the case study",
  /** Visually hidden after the link text, so every card link has its own name. */
  linkSuffix: ": ",
  status: { live: "Live", inDevelopment: "In development", ongoing: "Ongoing" },
  items: {
    "fantasy-eg": {
      title: null,
      description:
        "Fantasy football for the Egyptian Premier League. Designed and built from scratch: app, website, dashboard and API.",
      alt: "Fantasy EG website in Arabic",
    },
    educoursez: {
      title: null,
      description:
        "An Arabic-first education platform for Egyptian university students: mobile app, admin dashboard and API.",
      alts: ["Educoursez app home in Arabic", "Educoursez course lessons in Arabic"],
    },
    "vodafone-modernization": {
      title: "Vodafone modernization",
      description:
        "Migrating a jQuery application to React and TypeScript one module at a time, while it stays in production.",
      mockup: {
        before: "Before",
        after: "Now, still live",
        beforeCaption: "jQuery page",
        afterCaption: "React modules swapped in",
      },
    },
    tikvideo: {
      title: "TikVideo",
      description: "An Arabic AI platform that turns ideas into videos, images and songs: website and admin dashboard.",
      alt: "TikVideo website home in Arabic",
    },
    "cultural-bridge": {
      title: "Cultural Bridge",
      description:
        "A platform for cultural events in Saudi Arabia: book a seat, get a QR ticket. Website, organizer and admin dashboards.",
      alt: "Cultural Bridge website home in Arabic",
    },
    qima: {
      title: "Qima",
      description:
        "A store for international certifications: exam vouchers, payments and exam booking. Website and admin dashboard.",
      alt: "Qima website home in Arabic",
    },
    "lean-academy": {
      title: "Lean Academy",
      description:
        "A learning platform that organizations subscribe to and run as their own: website builder, reports, live chat and SCORM courses.",
      mockup: { sections: ["Hero", "Courses", "Footer"], result: "Website builder" },
    },
  },
};

export type ProjectsCopy = typeof enProjects;
