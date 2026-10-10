/** Labels of the Fantasy EG architecture figure. */
export const enFantasyDiagrams = {
  architecture: {
    clients: [
      { name: "Web app", detail: "Nuxt 4, client-only", inDevelopment: false },
      { name: "Marketing site", detail: "Nuxt 4, prerendered", inDevelopment: false },
      { name: "Admin dashboard", detail: "Nuxt", inDevelopment: false },
      { name: "Mobile app", detail: "Expo, in development", inDevelopment: true },
    ],
    host: "Self-hosted in Docker, development and production",
    api: { name: "REST API", detail: "NestJS at /api/v1, owns every rule" },
    database: { name: "PostgreSQL", detail: "Prisma" },
    caption:
      "The web app and the marketing site are one Nuxt 4 project. The web app and the mobile app share one client package, @fel/core.",
  },
};

export type FantasyDiagramsCopy = typeof enFantasyDiagrams;
