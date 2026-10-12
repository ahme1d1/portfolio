import type { WorkCopy } from "./en";

export const arWork: WorkCopy = {
  title: "الأعمال",
  lede: "ثلاثة مشاريع رئيسية، وأربعة مشاريع لعملاء لكلٍّ منها دراسة حالة، وأعمال سابقة في إيفا فارما وبيانات (2021 – 2023).",
  main: { title: "المشاريع الرئيسية" },
  more: {
    title: "مشاريع أخرى",
    lede: "منتجات لعملاء بنيتُ واجهاتها الأمامية، ولكلٍّ منها دراسة حالة.",
  },
  other: {
    title: "أعمال أخرى لعملاء",
    items: {
      eventsPlatform: { name: "منصة فعاليات", text: "لوحة تحكم للفعاليات" },
      fazah: { name: null, text: "لوحة تحكم للمعارض" },
      asass: { name: null, text: "لوحة تحكم للموارد البشرية" },
    },
  },
  earlier: {
    title: "أعمال سابقة",
    lede: "مشاريع لشركات وعملاء من سيرتي الذاتية.",
    headers: { project: "المشروع", type: "النوع", company: "الشركة" },
    names: { evaPharmaSite: "الموقع الرسمي لإيفا فارما", curiumSite: "الموقع الرسمي لـ {Curium}" },
    types: {
      corporate: "موقع شركة",
      landing: "صفحة هبوط",
      dashboard: "لوحة تحكم",
      ecommerce: "تجارة إلكترونية",
      elearning: "تعليم إلكتروني",
      realEstate: "عقارات",
    },
  },
};
