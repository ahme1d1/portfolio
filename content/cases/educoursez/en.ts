import type { CaseCopy } from "../types";

export const enEducoursez: CaseCopy = {
  title: null,
  meta: "Sole engineer, 7 of 8 phases built",
  lede: "An Arabic-first education platform for Egyptian university students: a mobile app for students, a dashboard for admins and instructors, and the API behind both.",
  notice: null,
  hero: {
    alts: [
      "Educoursez home in Arabic: Level 1 Pharmacy courses at Horus, filtered by level",
      "A course's lessons in Arabic, with its first two videos marked free",
      "Educoursez home in English with the dark theme",
    ],
    caption:
      "The student app: home in Arabic, a course's lessons, and home in English with the dark theme. Screens from the app in development, with test data.",
  },
  facts: {
    role: [{ text: "Sole engineer on the student app, dashboard and API", note: null }],
    status: [{ text: "In development", note: "7 of 8 phases built, no public link yet" }],
    platforms: [
      { text: "Student mobile app", note: "Expo, React Native" },
      { text: "Admin & instructor dashboard", note: "Nuxt 4" },
      { text: "REST API", note: "NestJS, Prisma, PostgreSQL" },
    ],
  },
  summary: {
    owned: "All three parts, phase by phase: the Expo app, the Nuxt 4 dashboard and the NestJS API.",
    hard: "Right-to-left on React Native, offline exam answers against the server's timer, and a player that keeps students out of YouTube's interface.",
    result: "Seven of eight phases are built; it has not launched yet.",
    resultNote: null,
  },
  problem: [
    "Educoursez is for Egyptian university students. Its catalogue follows the way their universities are organized (university, faculty, department, level), so a student sees the courses of their own faculty, with their own level first.",
    "It had to be Arabic-first and right-to-left from the first screen, with English beside it, and cover the whole loop: sign up with a WhatsApp-verified number, join a course, watch its videos, sit timed exams and message the instructor. Instructors and admins needed their own tool to run all of it.",
  ],
  role: {
    intro:
      "I'm the only engineer, and I build all three parts. Work runs in phases: a written plan agreed before any code, the build in all three repositories, then code and security reviews, green CI and a short note on how to test it.",
    items: [
      { title: "Student app", body: "Expo and React Native" },
      { title: "Dashboard", body: "Nuxt 4, for admins and instructors" },
      { title: "API", body: "NestJS, Prisma and PostgreSQL" },
    ],
    shots: null,
  },
  built: {
    intro:
      "One API serves both clients, and it is the authority: the app may compute what it shows, but progress, enrolment, scores and the time left in an exam always come from the server.",
    groups: [
      {
        title: "What a student can do",
        intro: null,
        blocks: [
          {
            title: "Sign up",
            body: "An Egyptian number that must be on WhatsApp, verified by a WhatsApp code. One device per student; a student number and a private QR code.",
          },
          {
            title: "Academic info",
            body: "University, faculty, department and level, in that order, mandatory and enforced by the database. Changing the university clears what's below.",
          },
          {
            title: "Courses and joining",
            body: "Lessons and videos, with the first two videos free. Join by a WhatsApp request the instructor accepts, or at once with a code or barcode.",
          },
          {
            title: "Video and resume",
            body: "Unlisted YouTube links in the app's own player. A video counts as watched in its last 30 seconds, and Home resumes where the student stopped.",
          },
          {
            title: "Exams",
            body: "Six question types, a timer the server keeps, answers that work offline and sync, and auto-submit at time-up.",
          },
          {
            title: "Chat and notifications",
            body: "One realtime thread per instructor, pictures and PDFs up to 10 MB, and five notification types sent as push.",
          },
        ],
      },
      { title: "Built in phases", intro: null, blocks: null },
    ],
  },
  hard: {
    intro: null,
    items: [
      {
        title: "Right-to-left on React Native",
        body: "React Native 0.86 has no logical start or end for text, and on Android an input aligns by its physical side: an Arabic field starts on the right. One module owns both mappings; lint bans *{textAlign}* and physical edges everywhere else. Numbers and codes sit in Unicode isolates, or Android reverses them.",
      },
      {
        title: "Offline answers against the server's clock",
        body: "The server keeps the timer, and it runs while the student is away. Yet answers made offline must sync later. The rule: an answer counts if it reaches the server before time-up plus a two-minute grace. The server closes expired attempts itself, on the next request or in a 30-second sweep.",
      },
      {
        title: "Keeping students out of YouTube's interface",
        body: "Videos play in the app's own page around YouTube's IFrame API, controls off. A cover layer takes every touch, and the web view loads only its own page and this video's embed. Anything else fails closed. The id can still be read from the phone's traffic, so protected hosting is planned as its own phase.",
      },
    ],
    dropped: {
      title: "Dropped or deferred",
      items: [
        "The app doesn't force right-to-left app-wide, so switching language needs no reload.",
        "Bunny for video hosting was rejected, because its bill grows with every view.",
        "The screen-recording warning and account block moved to the final phase.",
      ],
    },
  },
  result: {
    paragraphs: [
      "Not launched yet. Seven of eight phases are built and closed in all three repositories; the last (profile, settings and account blocking) is next.",
    ],
    blocks: null,
    metrics: [
      { value: "1,455", label: "API tests at the close of Phase 6, unit and end-to-end against PostgreSQL" },
      { value: "98.43%", label: "API test coverage at the same point" },
      { value: "15 / 15", label: "End-to-end flows passing on an Android device" },
      { value: null, label: "Launch date" },
      { value: null, label: "Students using it" },
    ],
  },
  learned: [
    {
      title: "Put the rule in the linter",
      body: "Banning physical edges kept right-to-left correct on every new screen, with nobody having to remember to check.",
    },
    {
      title: "Let the server own what counts",
      body: "Because time, progress and scores live on the API, accepting answers made offline is safe.",
    },
    { title: "Plan each phase first", body: "Product questions get answered in the plan, before the build starts." },
  ],
};
