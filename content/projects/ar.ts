import type { ProjectsCopy } from "./en";

export const arProjects: ProjectsCopy = {
  link: "اقرأ دراسة الحالة",
  linkSuffix: " لمشروع ",
  status: { live: "يعمل الآن", inDevelopment: "قيد التطوير", ongoing: "مستمر" },
  items: {
    "fantasy-eg": {
      title: null,
      description:
        "فانتازي الدوري المصري الممتاز. صمّمته وبنيته من الصفر: التطبيق والموقع ولوحة التحكم والواجهة البرمجية.",
      alt: "موقع {Fantasy EG} بالعربية",
    },
    educoursez: {
      title: null,
      description: "منصة تعليمية بالعربية أولًا لطلاب الجامعات المصرية: تطبيق موبايل ولوحة تحكم وواجهة برمجية.",
      alts: ["الصفحة الرئيسية لتطبيق {Educoursez}", "دروس كورس في تطبيق {Educoursez}"],
    },
    "vodafone-modernization": {
      title: "تحديث نظام فودافون",
      description: "نقل تطبيق {jQuery} إلى {React} و {TypeScript} وحدةً بوحدة، بينما يواصل العمل في الإنتاج.",
      mockup: {
        before: "قبل",
        after: "الآن، والنظام يعمل",
        beforeCaption: "صفحة {jQuery}",
        afterCaption: "وحدات {React} مكانها",
      },
    },
    tikvideo: {
      title: "تيك فيديو {(TikVideo)}",
      description: "منصة عربية تعتمد على الذكاء الاصطناعي لتحويل الأفكار إلى فيديوهات وصور وأغانٍ: الموقع ولوحة التحكم.",
      alt: "الصفحة الرئيسية لموقع {TikVideo} بالعربية",
    },
    "cultural-bridge": {
      title: "جسر الثقافة {(Cultural Bridge)}",
      description:
        "منصة للفعاليات الثقافية في السعودية: احجز مقعدًا واحصل على تذكرة {QR}. الموقع، ولوحة تحكم للمنظّمين وأخرى للإدارة.",
      alt: "الصفحة الرئيسية لموقع جسر الثقافة بالعربية",
    },
    qima: {
      title: "قيمة {(Qima)}",
      description: "متجر للشهادات الدولية: قسائم الاختبارات والدفع وحجز مواعيد الاختبار. الموقع ولوحة التحكم.",
      alt: "الصفحة الرئيسية لموقع قيمة بالعربية",
    },
    "lean-academy": {
      title: "لين أكاديمي {(Lean Academy)}",
      description:
        "منصة تعليمية تشترك فيها جهات وتشغّلها كلٌّ منها باسمها: منشئ مواقع وتقارير ومحادثة مباشرة ودورات تعليمية بصيغة {SCORM}.",
      mockup: { sections: ["القسم الرئيسي", "الدورات", "التذييل"], result: "منشئ المواقع" },
    },
  },
};
