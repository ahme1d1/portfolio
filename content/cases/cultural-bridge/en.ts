import type { CaseCopy } from "../types";

export const enCulturalBridge: CaseCopy = {
  /** Spelled out because the Arabic page has its own title ("جسر الثقافة"), and both languages keep the same keys. */
  title: "Cultural Bridge",
  meta: "Frontend for the website, organizer and admin dashboards",
  lede: "A platform for cultural events in Saudi Arabia, in Arabic. The public book seats, literary partners run their events, and the client's team reviews and reports on all of them.",
  notice: null,
  hero: {
    alts: [
      "The Cultural Bridge home page on desktop, in Arabic: a headline inviting people to join cultural events in Saudi Arabia, a sign-up button, and the platform's introduction",
      "The same home page on a phone",
    ],
    caption: "The public website's home page on desktop and on a phone.",
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
    owned: "Most of the public website and of the two dashboards: one for literary partners, one for the client's team.",
    hard: "Booking on the website, where an event can run over several dates and the rules kept growing. In the dashboards, a review process that spans both, and a permission check on every page.",
    result: "The public website ran in production with real events from literary partners. It is offline today.",
    resultNote: null,
  },
  problem: [
    "On Cultural Bridge ({جسر الثقافة}), cafés, literary clubs and cultural centers publish literary and cultural events. The platform calls these publishers literary partners ({الشريك الأدبي}). The public browse the events, book a seat and get a QR ticket for the door.",
    "Its own copy sets the goal: to be the first digital destination for cultural events, and to manage their promotion, registration and attendance. Besides the website, each partner needed a dashboard to run its events, which the platform calls initiatives ({المبادرات}). The client's team needed one too, to review, approve, document and report on all of them.",
  ],
  role: {
    intro: "I worked alongside three other frontend developers. These are the parts I built in each app.",
    items: [
      {
        title: "Website",
        body: "The events list with filters, tabs and a map view, and the event pages. Seat booking on one date or several, and the QR ticket with its download. Sign-up and sign-in with email verification, partner pages, news and the first survey page.",
      },
      {
        title: "Organizer dashboard",
        body: "Adding and editing events with their speakers, and the permit and proof tabs. Custody (items lent to the partner, and their return), support requests, partner contracts, the home charts, and a permission check on every page.",
      },
      {
        title: "Admin dashboard",
        body: "The cultural consultants' review flow, reports, surveys with answer review, login as organizer and QR scanning for attendance. Excel exports, a drag-and-drop home-page slider, tickets, knowledge articles, and roles and permissions.",
      },
    ],
    shots: {
      alts: [
        "The events page in Arabic: a Cultural Initiatives banner, partner and category filters, a nearby-events toggle, tabs for upcoming, current and ended events with counts, and a map button",
        "An event's page in Arabic: its poster, literary partner, speaker, audience, dates, time, city and seats, with buttons to book a seat and see it on the map",
      ],
      caption: "Two website pages I built: the events page and an event's page. Both are archived captures of the production site, with real events.",
    },
  },
  built: {
    intro: "Each app is its own Nuxt 3 project, and all three call the same REST API. Two links tie them together.",
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
            title: "Calling the API",
            body: "Every request in every app goes through one shared function. It takes the API address from the config and the sign-in token from a cookie, asks for Arabic responses, and sends updates as form data. Each error status has its own Arabic error page, and the dashboards tell a lost connection, a timeout and an unreachable server apart.",
          },
          {
            title: "Tickets scanned at the door",
            body: "Each ticket carries a QR code. Staff scan it with a phone camera, and the scan records the visitor's attendance.",
          },
          {
            title: "Login as organizer",
            body: "The admin dashboard asks the API for a token for that organizer and opens the organizer dashboard with it. The organizer app checks the token with the API before it keeps it, and sends the user to the login page if the check fails.",
          },
          {
            title: "Arabic throughout",
            body: "The apps use no translation library, since Arabic is their only language. Each one is set to Arabic and right to left at its root, asks the API for Arabic, and has its own right-to-left stylesheet. Form errors are in Arabic too, including the website's rules for phone numbers and passwords.",
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
        body: "An event can run over several days, each with its own seats. The booking window lists the dates that still have seats, with a count for each. Its select-all box also shows when only some dates are picked. After booking, the event page lists the visitor's dates and the button becomes the ticket download.",
      },
      {
        title: "Who may book, and when",
        body: "The booking button depends on whether the visitor is signed in, whether the event is active and open, and what they have already booked. Signed-out visitors go to sign-in and come back to the same event. The rules grew over time, and I came back to this button's logic several times.",
      },
      {
        title: "An event passes through many hands",
        body: "A partner submits an event, and the client's team assigns it to a cultural consultant for review. The event needs a permit, and after it runs, the partner uploads proof it took place, which can be sent back and resubmitted. I built the partner's permit and proof tabs and the consultant's review flow, with a status for each step.",
      },
      {
        title: "Many roles, a permission on every page",
        body: "The client's side has admins, account managers, partner managers and cultural consultants, and each partner has staff with their own roles. Every page and menu item asks for a named permission. The menu hides the links a user has no permission for, and opening one of those pages leads to the 404 page, as if it did not exist.",
      },
    ],
    dropped: null,
  },
  result: {
    paragraphs: [
      "Literary partners published real events on the production site, and the archived captures above come from it. The site has since gone offline, so this page has no link to it.",
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
