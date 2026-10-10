import type { CaseCopy } from "../types";

export const enCulturalBridge: CaseCopy = {
  /** Spelled out because the Arabic page has its own title ("جسر الثقافة"), and both languages keep the same keys. */
  title: "Cultural Bridge",
  meta: "Frontend for the website, organizer and admin dashboards",
  lede: "A platform for cultural events in Saudi Arabia, in Arabic: the public book seats and get a QR ticket, literary partners run their events, and the client's team reviews and reports on all of them.",
  notice: null,
  hero: {
    alts: [
      "The Cultural Bridge home page on desktop, in Arabic: a headline inviting people to join cultural events in Saudi Arabia, a sign-up button, and the platform's introduction",
      "The same home page on a phone",
    ],
    caption: "The public website's home page on desktop and on a phone. All three apps are Arabic only.",
  },
  facts: {
    role: [{ text: "Started all three web apps and built most of each", note: "One of four frontend developers" }],
    languages: [{ text: "Arabic only, right to left", note: "In all three apps" }],
    platforms: [
      { text: "Public website", note: "Nuxt 3, server-rendered" },
      { text: "Organizer dashboard", note: "Nuxt 3, PrimeVue" },
      { text: "Admin dashboard", note: "Nuxt 3, PrimeVue" },
    ],
  },
  summary: {
    owned:
      "Most of the website, the organizer dashboard and the admin dashboard. I started all three, in a team of four frontend developers.",
    hard: "Booking on one date or several, an event review process that runs across two dashboards, and a permission on every page for many roles.",
    result: "The public website ran in production with real events from literary partners. It is offline today.",
    resultNote: null,
  },
  problem: [
    "Cultural Bridge ({جسر الثقافة}) is a platform for literary and cultural events in Saudi Arabia. Cafés, literary clubs and cultural centres, which it calls literary partners ({الشريك الأدبي}), publish events. The public browse them, book a seat and get a QR ticket for the door.",
    "Its own copy sets the goal: to be the first digital destination for cultural events, from promotion and registration to managing attendance. Besides the website, each partner needed a dashboard to run its events, and the client's team needed one to review, approve, document and report on all of them. The platform calls these events initiatives ({المبادرات}). All of it had to work in Arabic, right to left.",
  ],
  role: {
    intro: "I was one of four frontend developers on the web apps. I started all three and built most of each.",
    items: [
      {
        title: "Website",
        body: "Event listing with filters, tabs and a map view; event pages; seat booking on one date or several; the QR ticket and its download; sign-up and sign-in with email verification; partner pages, news and the first survey page.",
      },
      {
        title: "Organizer dashboard",
        body: "Adding and editing events with their speakers, the permit and proof tabs, custody (items lent to the partner, and their return), support requests, partner contracts, the home charts, and a permission check on every page.",
      },
      {
        title: "Admin dashboard",
        body: "The cultural consultants' review flow, the reports module, the survey module with answer review, login as organizer, QR scanning to record attendance, exports to Excel, the home-page slider with drag and drop, tickets, knowledge articles, and roles and permissions.",
      },
    ],
    shots: {
      alts: [
        "The events page in Arabic: a Cultural Initiatives banner, filters for partner and category, a toggle for nearby events, tabs for upcoming, current and ended events with counts, and a map button",
        "An event's page in Arabic: its poster, literary partner, speaker, audience, dates, time, city and number of seats, with buttons to book a seat and to see it on the map",
      ],
      caption:
        "Two website pages I built: the events page, with filters, tabs and a map view, and an event's page, with its dates, seats and booking button. Archived captures of the production site, with real events.",
    },
  },
  built: {
    intro:
      "Three Nuxt 3 apps on one REST API. The public website renders on the server; the two dashboards sit behind a login and run in the browser only. Two links tie the apps to each other.",
    groups: [
      {
        title: "Key decisions",
        intro: null,
        blocks: [
          {
            title: "Server rendering for the public site only",
            body: "The public pages render on the server. The dashboards, used only by signed-in staff, run in the browser only and keep the signed-in state there between visits.",
          },
          {
            title: "One way to call the API",
            body: "Every request in every app goes through one composable: the address from config, the token from a cookie, Arabic responses, and updates sent as form data. Each error status has its own Arabic error page, and the dashboards tell a lost connection, a timeout and an unreachable server apart.",
          },
          {
            title: "QR tickets scanned to record attendance",
            body: "Each ticket carries a QR code. Staff scan it with a phone camera to record attendance; I built the scanning in the admin dashboard.",
          },
          {
            title: "Login as organizer",
            body: "The admin dashboard asks the API for a token for that organizer and opens the organizer dashboard with it. The organizer app checks the token with the API before it keeps it, and sends the user to the login page if the check fails.",
          },
          {
            title: "Arabic only, right to left",
            body: "There is no translation layer. Each app is set to Arabic and right to left at its root, asks the API for Arabic, and has its own right-to-left stylesheet. Form errors are in Arabic too, including the website's rules for phone numbers and passwords.",
          },
        ],
      },
    ],
  },
  hard: {
    intro: null,
    items: [
      {
        title: "Booking one date or several",
        body: "An event can run over several days, each with its own seats. The booking window lists the dates that still have seats, with a count for each, and a select-all box that also shows when only some dates are picked. After booking, the event page lists the visitor's dates and the button becomes the ticket download.",
      },
      {
        title: "Who may book, and when",
        body: "The booking button depends on whether the visitor is signed in, whether the event is active and open, and what they have already booked. Signed-out visitors go to sign-in and come back to the same event. The rules grew over time, and I came back to this button's logic several times.",
      },
      {
        title: "An event passes through many hands",
        body: "A partner submits an event. The client's team assigns it to a cultural consultant for review, it needs a permit, and after it runs the partner uploads proof that it took place, which can be sent back and resubmitted. I built the permit and proof tabs on the partner's side and the consultant's review flow on the client's side, with a status for each step.",
      },
      {
        title: "Many roles, a permission on every page",
        body: "The client's side has admins, account managers, partner managers and cultural consultants, and each partner has staff with their own roles. Every page and menu item asks for a named permission. A user without it is sent to the 404 page, as if the page did not exist, and never sees its link in the menu.",
      },
    ],
    dropped: null,
  },
  result: {
    paragraphs: [
      "The public website ran in production with real events from literary partners. It is offline today, so this page has no link to it.",
    ],
    blocks: null,
    metrics: [
      { value: null, label: "Events published" },
      { value: null, label: "Seats booked" },
      { value: null, label: "Literary partners on the platform" },
    ],
  },
  learned: null,
};
