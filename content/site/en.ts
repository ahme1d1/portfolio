export const enSite = {
  name: "Ahmed Gabal",
  /** How this language names itself, shown on the switch of the other language's pages. */
  languageName: "English",
  skipLink: "Skip to main content",
  nav: {
    mainLabel: "Main",
    footerLabel: "Footer",
    items: [
      { href: "/", label: "Home" },
      { href: "/work/", label: "Work" },
      { href: "/experience/", label: "Experience" },
      { href: "/services/", label: "Services" },
      { href: "/about/", label: "About" },
      { href: "/contact/", label: "Contact" },
    ],
  },
  theme: {
    switchToDark: "Switch to dark theme",
    switchToLight: "Switch to light theme",
    darkRow: "Dark theme",
    lightRow: "Light theme",
  },
  menu: { button: "Menu" },
  cv: { header: "CV", menuText: "Download CV", menuSuffix: "(PDF)" },
  social: { github: "GitHub", linkedin: "LinkedIn", whatsapp: "WhatsApp", email: "Email" },
  footer: { copyright: "© 2026 Ahmed Gabal. Designed and built by me." },
  notFound: {
    title: "This page doesn't exist.",
    lead: "Error 404. The link may be old or mistyped.",
    navLabel: "Where to go",
    home: "Home",
    work: "Work",
    contact: "Contact",
  },
};

export type SiteCopy = typeof enSite;
