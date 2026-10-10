import type { SiteCopy } from "./en";

export const arSite: SiteCopy = {
  name: "أحمد جبل",
  languageName: "العربية",
  skipLink: "تخطَّ إلى المحتوى",
  nav: {
    mainLabel: "القائمة الرئيسية",
    footerLabel: "روابط التذييل",
    items: [
      { href: "/work/", label: "الأعمال" },
      { href: "/experience/", label: "الخبرات" },
      { href: "/services/", label: "الخدمات" },
      { href: "/about/", label: "نبذة عني" },
      { href: "/contact/", label: "تواصل" },
    ],
  },
  theme: {
    switchToDark: "التبديل إلى الوضع الداكن",
    switchToLight: "التبديل إلى الوضع الفاتح",
    darkRow: "الوضع الداكن",
    lightRow: "الوضع الفاتح",
  },
  menu: { button: "القائمة" },
  cv: { header: "السيرة الذاتية", menuText: "تنزيل السيرة الذاتية", menuSuffix: "(PDF)" },
  social: { github: "GitHub", linkedin: "LinkedIn", whatsapp: "واتساب", email: "البريد الإلكتروني" },
  footer: { copyright: "© 2026 أحمد جبل. صمّمته وبنيته بنفسي." },
  notFound: {
    title: "هذه الصفحة غير موجودة.",
    lead: "خطأ 404. ربما يكون الرابط قديمًا، أو فيه خطأ في الكتابة.",
    navLabel: "إلى أين تريد الذهاب",
    home: "الرئيسية",
    work: "الأعمال",
    contact: "تواصل",
  },
};
