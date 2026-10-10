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
    caption:
      "The API and its services are the backend team's work. Payment happens on Moyasar's own page: the website sends the user there and checks the order with the API when they come back.",
  },
};

export type TikVideoDiagramsCopy = typeof enTikVideoDiagrams;
