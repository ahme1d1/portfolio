import type { LeanDiagramsCopy } from "./diagrams.en";

export const arLeanDiagrams: LeanDiagramsCopy = {
  hero: {
    platform: { eyebrow: "منصة واحدة", name: "لين أكاديمي" },
    offersLabel: "ما تقدّمه المنصة",
    offers: ["الدورات", "الاختبارات", "الشهادات", "التقارير", "المحادثة المباشرة", "الباقات والإضافات"],
    organizations: ["جهة حكومية", "شركة", "مركز تدريب"],
    getsLabel: "ما تحصل عليه الجهة",
    gets: [
      { name: "الموقع", highlighted: true },
      { name: "المشرفون", highlighted: false },
      { name: "المدرّبون", highlighted: false },
      { name: "الطلاب", highlighted: false },
    ],
  },
  architecture: {
    app: {
      eyebrow: "الجزء الذي عملت عليه",
      title: "تطبيق {Angular 19} واحد لكل الجهات",
      detail: "يتعرّف على الجهة من نطاقها عند بدء التشغيل",
    },
    parts: [
      { title: "موقع الجهة", detail: "للزوّار، مع سلة للدورات" },
      { title: "البوابات", detail: "للمشرفين والمدرّبين والطلاب" },
      { title: "بوابة مالك المنصة", detail: "الجهات والباقات والإضافات" },
    ],
    gateway: { eyebrow: "{REST}، بعملاء محدَّدي الأنواع مولَّدين من {Swagger}", title: "بوابة الواجهة البرمجية" },
    servicesLabel: "الخدمات خلف البوابة",
    services: [
      { name: "المصادقة", mine: false },
      { name: "الدورات", mine: false },
      { name: "الاختبارات القصيرة", mine: false },
      { name: "الواجبات", mine: false },
      { name: "الملفات", mine: false },
      { name: "الإشعارات", mine: false },
      { name: "منشئ المواقع", mine: true },
      { name: "الإعلانات", mine: false },
      { name: "السجلات", mine: false },
    ],
    hub: { eyebrow: "{WebSockets}", title: "مركز {SignalR}", detail: "المحادثة والإشعارات في الوقت الفعلي" },
    identity: { eyebrow: "{OIDC}", title: "مزوّد هوية خارجي", detail: "تسجيل الدخول في نسخة أحد العملاء" },
    caption:
      "الجزء الذي عملت عليه هو التطبيق في الأعلى. أما الخدمات خلف البوابة، والمركز، ومزوّد الهوية، فمن عمل آخرين.",
  },
  builder: {
    blocksTitle: "الأقسام في الصفحة، بالترتيب",
    blocksLabel: "الأقسام في الصفحة",
    blocks: [
      { name: "الترويسة", fixed: true, editing: false },
      { name: "القسم الرئيسي", fixed: true, editing: false },
      { name: "من نحن", fixed: false, editing: false },
      { name: "الدورات", fixed: false, editing: true },
      { name: "آراء العملاء", fixed: false, editing: false },
      { name: "الأسئلة الشائعة", fixed: false, editing: false },
      { name: "التذييل", fixed: true, editing: false },
    ],
    fixed: "ثابت",
    editing: "قيد التحرير",
    unusedTitle: "غير مستخدمة",
    unusedLabel: "أقسام غير مستخدمة",
    unused: ["البرامج", "الباقات", "تواصل معنا", "النشرة البريدية"],
    languagesTitle: "اللغات",
    languages: ["الإنجليزية", "العربية"],
    sameOrder: "الترتيب نفسه في الصفحة",
    previewTitle: "صفحة الجهة، في المعاينة",
    edit: {
      eyebrow: "لوحة التحرير",
      title: "قسم الدورات",
      heading: { label: "العنوان", value: "دوراتنا" },
      paragraph: { label: "الفقرة", tools: ["{B}", "{I}", "{U}"] },
      background: "الخلفية",
      button: { label: "نص الزر ورابطه", value: "تصفّح الدورات" },
      actions: { preview: "معاينة", save: "حفظ" },
    },
    caption:
      "تبقى الترويسة والقسم الرئيسي والتذييل في أماكنها. وتفعّل الجهة الأقسام الأخرى أو تلغيها، وترتّبها بالسحب، وتحرّر كلًّا منها في لوحته الخاصة، ثم تعاين الموقع وتنشره.",
  },
};
