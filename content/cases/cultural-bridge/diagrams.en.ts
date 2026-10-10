/** Labels of the Cultural Bridge architecture figure: three apps, two links between them, one API. */
export const enCulturalBridgeDiagrams = {
  architecture: {
    website: { eyebrow: "For the public", name: "Website", detail: "Nuxt 3, server-rendered" },
    ticketLink: { above: "Ticket QR code", below: "Scanned to record attendance" },
    organizer: { eyebrow: "For each literary partner", name: "Organizer dashboard", detail: "Nuxt 3, PrimeVue, in the browser" },
    loginLink: { above: "Login as organizer", below: "with an API token" },
    admin: { eyebrow: "For the client's team", name: "Admin dashboard", detail: "Nuxt 3, PrimeVue, in the browser" },
    api: { eyebrow: "Shared by every app", name: "REST API", detail: "At /api/v1, answers in Arabic" },
    caption:
      "The first link carries the ticket QR code, scanned by staff to record attendance. The second lets admins open the organizer dashboard as any partner. An Android app for the public uses the same API.",
  },
};

export type CulturalBridgeDiagramsCopy = typeof enCulturalBridgeDiagrams;
