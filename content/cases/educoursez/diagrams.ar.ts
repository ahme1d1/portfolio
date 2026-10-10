import type { EducoursezDiagramsCopy } from "./diagrams.en";

export const arEducoursezDiagrams: EducoursezDiagramsCopy = {
  architecture: {
    student: { eyebrow: "للطلاب", name: "تطبيق الموبايل", detail: "{Expo, React Native}" },
    studentLink: { protocol: "{REST} على {/app}", realtime: "{Socket.IO}" },
    api: { eyebrow: "المرجع", name: "الواجهة البرمجية", detail: "{NestJS, Prisma, PostgreSQL}" },
    staffLink: { protocol: "{REST} على {/admin}", realtime: "{Socket.IO}" },
    staff: { eyebrow: "للفريق", name: "لوحة التحكم", detail: "{Nuxt 4}" },
    caption:
      "يعمل الاتصال اللحظي على خادم الواجهة البرمجية نفسه، وتُرسَل الإشعارات الفورية عبر {Expo}، وتُحفظ الصور وملفات المحادثات في {PostgreSQL} حاليًا.",
  },
  phases: {
    label: "المراحل",
    done: "اكتملت",
    next: "التالية",
    items: [
      { number: "المرحلة 0", name: "التجهيز", isDone: true },
      { number: "المرحلة 1", name: "إنشاء الحساب وتسجيل الدخول", isDone: true },
      { number: "المرحلة 2", name: "البيانات الأكاديمية والكورسات", isDone: true },
      { number: "المرحلة 3", name: "الانضمام والأكواد", isDone: true },
      { number: "المرحلة 4", name: "المشغّل ومتابعة التقدّم", isDone: true },
      { number: "المرحلة 5", name: "الامتحانات", isDone: true },
      { number: "المرحلة 6", name: "المحادثات والإشعارات", isDone: true },
      { number: "المرحلة 7", name: "الملف الشخصي والإعدادات والحظر", isDone: false },
    ],
  },
};
