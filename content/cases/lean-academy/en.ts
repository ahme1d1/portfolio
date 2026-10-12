import type { CaseCopy } from "../types";

export const enLean: CaseCopy = {
  /** A string, not null: the Arabic h1 is the Arabic name, and both languages keep the same keys. */
  title: "Lean Academy",
  meta: "Frontend for the dashboard and website builder",
  lede: "A learning platform that organizations subscribe to and run as their own: courses, exams, reports, live chat and a website for each one.",
  notice: null,
  hero: {
    alts: [],
    caption: "Each organization on the platform gets its own website, made in the website builder, and its own portals.",
  },
  facts: {
    role: [{ text: "Frontend on the dashboard", note: "In a team of about eight frontend developers" }],
    languages: [{ text: "Arabic and English", note: "Right to left switches with the language" }],
    platforms: [
      { text: "Portals for admins, instructors and students", note: null },
      { text: "A website for each organization", note: null },
      { text: "The platform owner's portal", note: null },
    ],
  },
  summary: {
    owned:
      "My biggest piece was the website builder each organization uses for its own site. I also built many of the reports, the dashboard statistics and SCORM courses for students, and worked on the real-time chat.",
    hard: "A one-day upgrade from Angular 16 to 19, and two website problems: knowing the organization before the first screen, and links that work in the builder, preview and live site.",
    result: "All of it is in the product the team still develops.",
    resultNote: null,
  },
  problem: [
    "Lean Academy ({لين أكاديمي}) is made for government bodies, companies and training centers. In its own words, it supports self-paced, live and in-person training, with virtual classrooms, online exams, verified digital certificates and reporting.",
    "Each organization subscribes to a plan with add-ons, gets its own portals, and builds its public website, with a course cart, in a website builder.",
  ],
  role: {
    intro:
      "The dashboard is one large Angular app that the frontend team built up over time. I started its website builder and worked on the parts below.",
    items: [
      {
        title: "Website builder",
        body: "The header, hero, about, services, courses, plans, testimonials, FAQs, contact and newsletter blocks, a rich-text editor in each, preview, publishing, a guided tour, Arabic and English. Teammates worked on it too.",
      },
      {
        title: "Reports",
        body: "Course completion, attendance, employee attendance, quiz and assignment performance, time spent training, surveys and certification tracking.",
      },
      { title: "Dashboard statistics", body: "For the admin, instructor and student dashboards, on new APIs." },
      { title: "Chat", body: "The real-time chat: its APIs, its sign-in, a redesign, the loading state and message counts." },
      {
        title: "Courses",
        body: "SCORM courses for students (SCORM is the standard format for e-learning courses), locked course items, programs, categories, course bundles and question-bank upload.",
      },
      {
        title: "Platform",
        body: "A shared upload service, the organization check at start-up, notifications, and sign-in through an external identity provider.",
      },
    ],
    shots: null,
  },
  built: {
    intro:
      "Every organization, and everyone in it, uses the same Angular app, which talks to the backend through one API gateway.",
    groups: [
      {
        title: "Key decisions",
        intro: null,
        blocks: [
          {
            title: "Typed clients from Swagger",
            body: "The API clients are generated from each service's Swagger file, so a changed endpoint shows up as a type error in the code before it can break a screen. I added the website builder's service to the generator.",
          },
          {
            title: "Chat over SignalR",
            body: "Chat runs on a SignalR connection over WebSockets. Each environment's config sets the hub's address.",
          },
          {
            title: "A shared upload service",
            body: "Course modules, the question bank, quizzes and profiles all upload files through the same service, so uploads work the same way in all four.",
          },
          {
            title: "Report filters, built once",
            body: "I moved the reports onto shared filters for dates, lists, number ranges and text, then built the later reports on them.",
          },
          {
            title: "Course items that open in order",
            body: "When a course must be followed in order, each item opens only after the one before it is complete. A module stays locked until every item in the earlier modules is done, and the first item is always open.",
          },
          {
            title: "SCORM in a sandbox",
            body: "A SCORM package plays inside the student's course page, in a sandboxed frame with its own loading, error and retry states.",
          },
        ],
      },
      {
        title: "The website builder",
        intro: "Each organization builds its public site from blocks, inside the dashboard, and publishes it when it is ready.",
        blocks: [
          {
            title: "A fixed frame",
            body: "Header, hero and footer are always there, in place. The organization ticks the other blocks on or off and drags them into order, and the order is saved with the page.",
          },
          {
            title: "Two parts per block",
            body: "Each block is a section, as visitors see it, and a panel to edit it: heading, rich text, colors, button text and link.",
          },
          {
            title: "New blocks start with content",
            body: "Ticking a block saves it at once with starter content, so the preview shows a filled-in section from the start.",
          },
          {
            title: "Preview before publishing, and a guided tour",
            body: "The organization sees its site in preview, then publishes it. New users get a guided tour of the builder.",
          },
        ],
      },
    ],
  },
  hard: {
    intro: null,
    items: [
      {
        title: "Angular 16 to 19",
        body: "I moved the dashboard from Angular 16 to 19 in one day, one major version at a time, across 1,871 files. The new build system rejected how moment and Plyr were imported, so I rewrote those imports. Angular Material renamed its theme functions, so I switched to their m2 versions to keep the look. Version 19 makes components standalone by default, so I kept every existing one in its module.",
      },
      {
        title: "Knowing the organization before the first screen",
        body: "The shared app must know whose it is before it shows anything. I first built a separate page that checked and redirected, then moved the check into app start-up. The app now asks the API which organization owns the domain, then sends a visitor to its website if it is published, or to sign-in if not. Sign-in, organization sign-up and certificate pages skip the redirect.",
      },
      {
        title: "Links that work in the builder, preview and live site",
        body: "The same sections show in the builder, in the preview and on the live site, so every link has three places to work. Header and footer links scroll to their section, or open the site at that section from any other page, and they refresh when a block is added or removed.",
      },
    ],
    dropped: null,
  },
  result: {
    paragraphs: [
      "The website builder, the reports, chat and the course features are still in the product, which has stayed on Angular 19 since my upgrade. The external sign-in went into one client's deployment.",
    ],
    blocks: null,
    metrics: [
      { value: null, label: "Organizations using it" },
      { value: null, label: "Sites published with the builder" },
    ],
  },
  learned: null,
};
