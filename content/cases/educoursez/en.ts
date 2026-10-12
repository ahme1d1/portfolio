import type { CaseCopy } from "../types";

export const enEducoursez: CaseCopy = {
  title: null,
  meta: "Sole engineer",
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
    role: [{ text: "The student app, dashboard and API", note: null }],
    status: [{ text: "In development", note: "No public link yet" }],
    platforms: [
      { text: "Student mobile app", note: "Expo, React Native" },
      { text: "Admin & instructor dashboard", note: "Nuxt 4" },
      { text: "REST API", note: "NestJS, Prisma, PostgreSQL" },
    ],
  },
  summary: {
    owned: "All three parts, phase by phase: the Expo app, the Nuxt 4 dashboard and the NestJS API.",
    hard: "Getting React Native to lay out Arabic correctly, and accepting exam answers made offline while the server keeps the time. The video player also had to keep students out of YouTube's interface.",
    result: "Seven of eight phases are built; it has not launched yet.",
    resultNote: null,
  },
  problem: [
    "The course catalog follows the way Egyptian universities are organized (university, faculty, department, level), so students see the courses of their own faculty, with their own level first.",
    "Students needed the whole loop in one app: sign up with a WhatsApp-verified number, join a course, watch its videos, sit timed exams and message the instructor. It had to be right-to-left from the first screen, with English beside Arabic. Instructors and admins needed their own tool to run it all.",
  ],
  role: {
    intro: "I'm the only engineer, and I build all three parts. Each phase runs the same way.",
    items: [
      { title: "Plan", body: "A written plan for the phase, agreed before any code" },
      { title: "Build", body: "The phase built in all three repositories" },
      {
        title: "Review and close",
        body: "Code and security reviews, every CI check passing, and a short note on how to test it",
      },
    ],
    shots: null,
  },
  built: {
    intro:
      "The API is the authority for both clients. The app may compute what it shows, but progress, enrollment, scores and the time left in an exam always come from the server.",
    groups: [
      {
        title: "What a student can do",
        intro: null,
        blocks: [
          {
            title: "Sign up",
            body: "An Egyptian number that must be on WhatsApp, verified by a WhatsApp code. Each student gets one device, a student number and a private QR code.",
          },
          {
            title: "Academic info",
            body: "The four academic fields are mandatory, filled in order and enforced by the database. Changing the university clears the fields below it.",
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
        body: "React Native 0.86 has no logical start or end for text. On Android a text field also aligns by left and right, so an Arabic one must be set to start on the right. One module handles both, and a lint rule blocks *{textAlign}* and left or right edges elsewhere. Numbers and codes are wrapped in invisible Unicode characters, or Android reverses them.",
      },
      {
        title: "Offline answers against the server's clock",
        body: "The server keeps the timer, and it keeps running while the student is away, yet answers made offline reach the server later. An answer counts if it arrives before time is up, or within a two-minute grace period after that. The server closes expired attempts itself, on the next request or in a sweep every 30 seconds.",
      },
      {
        title: "Keeping students out of YouTube's interface",
        body: "Videos play in the app's own page, built on YouTube's IFrame API with its controls off. A cover layer takes every touch, and the web view loads only that page and this video's embed; anything else is blocked. The video's id can still be read from the phone's traffic, so protected hosting is planned as its own phase.",
      },
    ],
    dropped: {
      title: "Ideas I dropped or deferred",
      items: [
        "Forcing right-to-left on the whole app. Leaving it off means switching language needs no reload.",
        "Bunny for video hosting, rejected because its bill grows with every view.",
        "The screen-recording warning and the account block, moved to the final phase.",
      ],
    },
  },
  result: {
    paragraphs: [
      "Seven of eight phases are built and closed in all three repositories. The last one (profile, settings and account blocking) is next, and the platform has not launched yet.",
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
      body: "A lint error stops a left or right edge the moment it is written, on every new screen.",
    },
    {
      title: "Let the server own what counts",
      body: "Decide early which side has the final word. Here it was the server, and that settled how offline answers work.",
    },
    { title: "Plan each phase first", body: "Product questions get answered in the plan, before the build starts." },
  ],
};
