import type { FantasyDiagramsCopy } from "./diagrams.en";

export const arFantasyDiagrams: FantasyDiagramsCopy = {
  architecture: {
    clients: [
      { name: "تطبيق الويب", detail: "{Nuxt 4}، في المتصفح فقط", inDevelopment: false },
      { name: "الموقع التسويقي", detail: "{Nuxt 4}، مولَّد مسبقًا", inDevelopment: false },
      { name: "لوحة التحكم", detail: "{Nuxt}", inDevelopment: false },
      { name: "تطبيق الموبايل", detail: "{Expo}، قيد التطوير", inDevelopment: true },
    ],
    host: "استضافة ذاتية على {Docker}، للتطوير والإنتاج",
    api: { name: "الواجهة البرمجية {REST}", detail: "{NestJS} على {/api/v1}، وتحدد كل القواعد" },
    database: { name: "{PostgreSQL}", detail: "{Prisma}" },
    caption:
      "تطبيق الويب والموقع التسويقي مشروع {Nuxt 4} واحد. ويتشارك تطبيقُ الويب وتطبيقُ الموبايل حزمةً واحدة للعميل هي {@fel/core}.",
  },
};
