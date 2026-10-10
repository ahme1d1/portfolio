import type { QimaDiagramsCopy } from "./diagrams.en";

export const arQimaDiagrams: QimaDiagramsCopy = {
  architecture: {
    label: "الواجهتان الأماميتان اللتان عملت عليهما",
    clients: [
      {
        eyebrow: "للمتعلّمين",
        name: "الموقع",
        detail: "{Angular 20}، يُعرض من الخادم عبر {Express}، بالعربية فقط",
        link: "{REST}، من الخادم ومن المتصفح",
      },
      {
        eyebrow: "للموظفين ومراكز الاختبار",
        name: "لوحة تحكم الإدارة",
        detail: "تطبيق صفحة واحدة بـ {Angular 20}، بالعربية والإنجليزية",
        link: "{REST}، من المتصفح",
      },
    ],
    api: {
      eyebrow: "خادم منفصل",
      name: "الواجهة البرمجية {REST}",
      detail: "خلف بوابة: الكتالوج والطلبات والقسائم وحجوزات الاختبارات والمدفوعات",
    },
    services: [
      { eyebrow: "المدفوعات", name: "{PayTabs}", detail: "البطاقة ومدى و {Apple Pay}" },
      { eyebrow: "التقسيط", name: "{Tabby} و {Tamara}", detail: "اشترِ الآن وادفع لاحقًا" },
      { eyebrow: "الملفات", name: "تخزين {S3}", detail: "صور الشهادات والملفات المرفوعة" },
    ],
    caption:
      "تُنشئ الواجهة البرمجية كل عملية دفع وتُرجع صفحة مزوّد الدفع. وبعد الدفع يعود المتعلّم إلى صفحة حالة تسأل الواجهة البرمجية كل ثانيتين حتى تكتمل العملية.",
  },
};
