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
    languages: [{ text: "English and Arabic", note: "Right to left switches with the language" }],
    platforms: [
      { text: "Portals for admins, instructors and students", note: null },
      { text: "A website for each organization", note: null },
      { text: "The platform owner's portal", note: null },
    ],
  },
  summary: {
    owned:
      "My biggest piece was the website builder each organization uses for its own site. I also built many of the reports, the dashboard statistics and SCORM courses for students, and worked on the real-time chat.",
    hard: "Moving the dashboard from Angular 16 to 19, serving the right organization from the first screen, and links that work in the builder, the preview and the live site.",
    result: "All of it is in the product the team still develops, on Angular 19.",
    resultNote: null,
  },
  problem: [
    "Lean Academy ({لين أكاديمي}) is a learning and training platform for government bodies, companies and training centres. In its own words, it supports self-paced, live and in-person training, with virtual classrooms, online exams, verified digital certificates and reporting.",
    "Many organizations run it as their own. Each one subscribes to a plan with add-ons, gets portals for its admins, instructors and students, and builds its own public website, with a course cart, in a website builder. Everything had to work in English and Arabic, right to left included.",
  ],
  role: {
    intro:
      "The dashboard is one large Angular app, built over time by a team of about eight frontend developers, and I was one of them. My biggest piece was the website builder, which I started.",
    items: [
      {
        title: "Website builder",
        body: "The header, hero, about, services, courses, plans, testimonials, FAQs, contact and newsletter blocks, a rich-text editor in each, preview, publishing, a guided tour, English and Arabic. Teammates worked on it too.",
      },
      {
        title: "Reports",
        body: "Course completion, attendance, employee attendance, quiz and assignment performance, time spent training, surveys and certification tracking.",
      },
      { title: "Dashboard statistics", body: "For the admin, instructor and student dashboards, on new APIs." },
      { title: "Chat", body: "Real-time chat over SignalR: its APIs, sign-in, a redesign, loading and message counts." },
      {
        title: "Courses",
        body: "SCORM courses for students, locked course items, programmes, categories, course bundles and question-bank upload.",
      },
      {
        title: "Platform",
        body: "The move from Angular 16 to 19, a shared upload service, the organization check at start-up, notifications, and sign-in through an external identity provider for one client's deployment.",
      },
    ],
    shots: null,
  },
  built: {
    intro:
      "One Angular app serves every organization and everyone in it. It works out which organization it is serving before the first screen, then talks to the backend through one API gateway, with a SignalR hub for chat.",
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
            title: "One upload service",
            body: "A shared file-upload service serves course modules, the question bank, quizzes and profiles, so uploads in all four work the same way.",
          },
          {
            title: "Report filters, built once",
            body: "I moved the reports onto shared filters for dates, lists, number ranges and text, then built the later reports on them.",
          },
          {
            title: "Course items that open in order",
            body: "When a course must be followed in order, each item opens only after the one before it is complete, and a module stays locked until every item in the earlier modules is done. The first item is always open.",
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
            body: "Each block is a section, as visitors see it, and a panel to edit it: heading, rich text, colours, button text and link.",
          },
          {
            title: "New blocks start with content",
            body: "Ticking a block saves it at once with starter content, so the preview shows a filled-in section from the start.",
          },
          {
            title: "Preview before publishing, and a guided tour",
            body: "The organization previews its site, then publishes it. Until then, visitors go to sign-in. A guided tour walks new users through the builder.",
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
        body: "I upgraded the dashboard from Angular 16 to 19, with Angular Material 17 to 19, in one day, on a 1,871-file codebase, one major version at a time. The new application builder broke the old namespace imports of moment and Plyr. Material renamed its theme functions, so the theme moved to their m2 versions to keep its look. Version 19 makes components standalone by default, so every existing component was marked to stay in its module.",
      },
      {
        title: "The right organization from the first screen",
        body: "The same app runs for every organization, so it must know whose it is before anything shows. I first built a separate page that checked and redirected, then moved the check into app start-up. The app asks the API which organization owns the domain and sends a visitor to its website if it is published, or to sign-in if not. Sign-in, organization sign-up and certificate pages skip the redirect.",
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
      "The website builder, the reports, the dashboard statistics, chat, SCORM courses and locked course items are all part of the product the team still develops, on Angular 19 since my upgrade. The external sign-in went into one client's deployment.",
    ],
    blocks: null,
    metrics: [
      { value: null, label: "Organizations using it" },
      { value: null, label: "Sites published with the builder" },
    ],
  },
  learned: null,
};
