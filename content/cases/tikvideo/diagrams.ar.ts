import type { TikVideoDiagramsCopy } from "./diagrams.en";

export const arTikVideoDiagrams: TikVideoDiagramsCopy = {
  architecture: {
    frontends: [
      { eyebrow: "من بنائي", name: "الموقع", detail: "{Nuxt 4}، لصنّاع المحتوى" },
      { eyebrow: "من بنائي", name: "لوحة التحكم", detail: "{Nuxt 4} و {PrimeVue}، للمشرفين" },
    ],
    apiLink: { above: "{REST} على {/api/v1}", below: "رمز {Bearer}" },
    api: { eyebrow: "فريق الخادم", name: "واجهة {Laravel} البرمجية", detail: "13 وحدة، وقاعدة {MySQL}، والملفات على {S3}" },
    servicesLink: { above: "تستدعيها", below: "الواجهة البرمجية" },
    services: [
      { label: "كلمات الأغاني", name: "{OpenAI}" },
      { label: "الموسيقى والصوت", name: "{Suno, MusicAPI, ElevenLabs}" },
      { label: "الصور والفيديو", name: "{Stability AI, Runway}" },
      { label: "قوالب الفيديو", name: "{Creatomate, Shotstack}" },
      { label: "المدفوعات", name: "{Moyasar}" },
    ],
    caption:
      "الواجهة البرمجية وخدماتها من عمل فريق الخادم. ويجري الدفع على صفحة {Moyasar} نفسها: يحوّل الموقع المستخدم إليها، ثم يتحقق من الطلب لدى الواجهة البرمجية حين يعود.",
  },
};
