/** Labels of the Educoursez figures: the architecture and the "Built in phases" list. */
export const enEducoursezDiagrams = {
  architecture: {
    student: { eyebrow: "For students", name: "Mobile app", detail: "Expo, React Native" },
    studentLink: { protocol: "REST on /app", realtime: "Socket.IO" },
    api: { eyebrow: "The authority", name: "API", detail: "NestJS, Prisma, PostgreSQL" },
    staffLink: { protocol: "REST on /admin", realtime: "Socket.IO" },
    staff: { eyebrow: "For staff", name: "Dashboard", detail: "Nuxt 4" },
    caption:
      "Realtime runs on the API's own server, push goes through Expo, and pictures and chat files sit in PostgreSQL for now.",
  },
  phases: {
    label: "Phases",
    done: "Done",
    next: "Next",
    items: [
      { number: "Phase 0", name: "Setup", isDone: true },
      { number: "Phase 1", name: "Sign-up & sign-in", isDone: true },
      { number: "Phase 2", name: "Academic info & courses", isDone: true },
      { number: "Phase 3", name: "Joining & codes", isDone: true },
      { number: "Phase 4", name: "Player & progress", isDone: true },
      { number: "Phase 5", name: "Exams", isDone: true },
      { number: "Phase 6", name: "Chat & notifications", isDone: true },
      { number: "Phase 7", name: "Profile, settings, blocking", isDone: false },
    ],
  },
};

export type EducoursezDiagramsCopy = typeof enEducoursezDiagrams;
