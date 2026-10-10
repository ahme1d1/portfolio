import type { ContactCopy } from "./en";

export const arContact: ContactCopy = {
  band: {
    title: "لنتحدث.",
    lede: "لديك وظيفة شاغرة أو منتج تريد بناءه؟ أخبرني بما لديك.",
    hiring: { prefix: "تبحث عن مهندس؟", label: "حدّثني عن الوظيفة" },
    project: { prefix: "لديك مشروع؟", label: "لنبنه معًا" },
  },
  reply: "أرد خلال 24 ساعة.",
  form: {
    label: "نموذج التواصل",
    title: "أرسل رسالة",
    required: "كل الحقول مطلوبة.",
    topic: {
      legend: "أتواصل بخصوص",
      options: { role: "وظيفة", project: "مشروع", other: "أمر آخر" },
    },
    name: "الاسم",
    email: "البريد الإلكتروني",
    message: "الرسالة",
    messageHint: "تفاصيل الوظيفة، أو المنتج الذي تريد بناءه.",
    submit: "إرسال الرسالة",
    sending: "جارٍ الإرسال…",
    sendingStatus: "جارٍ إرسال رسالتك…",
    sent: {
      title: "وصلت رسالتك.",
      text: "شكرًا لك. سأرد خلال 24 ساعة على بريدك الإلكتروني.",
      again: "إرسال رسالة أخرى",
    },
    summary: {
      one: "*لم تُرسَل رسالتك.* صحّح الحقل أدناه، أو راسلني مباشرة على {$email}.",
      many: "*لم تُرسَل رسالتك.* صحّح الحقول أدناه، أو راسلني مباشرة على {$email}.",
      network: "*لم تُرسَل رسالتك.* تحقّق من اتصالك بالإنترنت وحاول مرة أخرى، أو راسلني مباشرة على {$email}.",
      unavailable: "*لم تُرسَل رسالتك.* النموذج لا يعمل الآن. راسلني مباشرة على {$email}.",
    },
    errors: {
      topicMissing: "اختر موضوع رسالتك.",
      nameMissing: "أضف اسمك.",
      emailMissing: "أضف بريدك الإلكتروني، مثل {sara@company.com}",
      emailNoAt: "أضف علامة {@}، مثل {sara@company.com}",
      emailNoLocal: "أضف الجزء الذي قبل {@}، مثل {sara}",
      emailNoDomain: "أضف الجزء الذي بعد {@}، مثل {company.com}",
      emailInvalid: "راجع البريد الإلكتروني، مثل {sara@company.com}",
      messageMissing: "أضف رسالتك: تفاصيل الوظيفة، أو المنتج الذي تريد بناءه.",
    },
  },
};
