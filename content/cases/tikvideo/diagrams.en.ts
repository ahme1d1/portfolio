/** Labels of the TikVideo architecture figure. */
export const enTikVideoDiagrams = {
  architecture: {
    frontends: [
      { eyebrow: "I built", name: "Website", detail: "Nuxt 4, for creators" },
      { eyebrow: "I built", name: "Admin dashboard", detail: "Nuxt 4 and PrimeVue, for admins" },
    ],
    apiLink: { above: "REST on /api/v1", below: "Bearer token" },
    api: { eyebrow: "The backend team", name: "Laravel API", detail: "13 modules, MySQL, files on S3" },
    servicesLink: { above: "Called by", below: "the API" },
    services: [
      { label: "Lyrics", name: "OpenAI" },
      { label: "Music and voice", name: "Suno, MusicAPI, ElevenLabs" },
      { label: "Images and video", name: "Stability AI, Runway" },
      { label: "Video templates", name: "Creatomate, Shotstack" },
      { label: "Payments", name: "Moyasar" },
    ],
    caption: "For payment, the website asks the API to start one and sends the user to Moyasar's own page.",
  },
};

export type TikVideoDiagramsCopy = typeof enTikVideoDiagrams;
