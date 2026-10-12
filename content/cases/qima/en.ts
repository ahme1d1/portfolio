import type { CaseCopy } from "../types";

export const enQima: CaseCopy = {
  /** A string, not null: the Arabic title ("منصة قيمة") is not the brand, and both languages need the same keys. */
  title: "Qima",
  meta: "Frontend for the website and admin dashboard",
  lede: "Qima ({منصة قيمة}) sells international professional certifications in Saudi Arabia: learners buy an exam voucher, pay, and book a seat for the exam.",
  notice: null,
  hero: {
    alts: [
      "The Qima website's home on desktop, in Arabic, with a slide for a Microsoft certification",
      "The Qima website's home on a phone, in Arabic",
    ],
    caption: "The website's home on desktop and on a phone. The site is in Arabic only, right to left.",
  },
  facts: {
    role: [{ text: "Frontend on the website and the admin dashboard", note: "In a team of five, for a client" }],
    languages: [
      { text: "Website", note: "Arabic only, right to left" },
      { text: "Dashboard", note: "Arabic and English, both directions" },
    ],
    platforms: [
      { text: "Learner website", note: "Angular, server-rendered" },
      { text: "Admin dashboard", note: "Angular, PrimeNG" },
      { text: "REST API", note: "a separate backend" },
    ],
  },
  summary: {
    owned: "On the website, the parts that talk to the backend: sign-in, catalog, cart, payments, exam booking and the learner's account. On the dashboard, I started the project and built most of its modules.",
    hard: "Server rendering when only the browser knows who is signed in. On the dashboard, dates that slipped a day and schedule edits that touch booked seats.",
    result: "The website is in production for learners, and the admin dashboard for staff and test centers is deployed beside it.",
    resultNote: null,
  },
  problem: [
    "The certifications come from Microsoft, Adobe, Apple, Cisco, PMI and others, and Qima runs the exams with accredited bodies such as Certiport. A learner buys an exam or a training-and-exam package and sits it online or at a test center. Results, certificates and refunds follow in their account.",
    "Many learners are funded by the Human Resources Development Fund (HRDF, {هدف}), so the catalog had to show which certificates it supports. Prices are in riyals, and learners pay in full or in installments. Qima's staff and the test centers also needed their own tool to run the catalog, the vouchers, the exam sessions and the bookings.",
  ],
  role: {
    intro: "I worked on both frontends, with teammates on each.",
    items: [
      {
        title: "Website",
        body: "A teammate built most of the page layouts. I connected the site to the backend: sign-in, the catalog and its filters, cart, checkout, payments, refunds, coupons, the multi-step exam booking with its calendar, and the learner's account.",
      },
      {
        title: "Admin dashboard",
        body: "I built the modules for vouchers, exams and their sessions, bookings with a calendar, payments and cancellations, offers and coupons, test labs and devices, and reports. Teammates built the content pages, users, roles and permissions, and the home and test-center dashboards.",
      },
      {
        title: "Project setup",
        body: "On the website, the folder structure and separate staging and production settings. On the dashboard, the scaffold, the layout and menu, and the language handling.",
      },
    ],
    shots: {
      alts: [
        "The certificate catalog in Arabic, with a search box and filters for category, price, HRDF support and discount",
        "A certificate's page in Arabic, IC3 Spark, with its HRDF badge, description and contents",
      ],
      caption:
        "The catalog with its four filters, and a certificate's page with its HRDF badge. On these pages, the data, the filters and adding to the cart are my work.",
    },
  },
  built: {
    intro:
      "The website renders on the server and sets each page's title and meta tags. The dashboard runs only in the browser. Both use Angular 20 and call the same REST API.",
    groups: [
      {
        title: "On the website",
        intro: null,
        blocks: [
          {
            title: "Prerender only what's public",
            body: "Home, the catalog and the static pages are prerendered. Certificate details, the cart, payment status and every account page render on the server for each request, because they depend on the visitor or on live data.",
          },
          {
            title: "A cart before sign-in",
            body: "Visitors can fill a cart without an account. It's kept in the browser and merged into their account's cart when they sign in. If they picked an item just before signing in, it's added right after.",
          },
          {
            title: "One booking flow for both kinds of voucher",
            body: "A learner books with a voucher bought on the site or with a voucher code from outside it. Both take the same four steps (exam, time, details, confirm), and the choices so far are kept in session storage, so a refresh doesn't lose them.",
          },
          {
            title: "Only bookable days",
            body: "The booking calendar disables every day that falls on a holiday or has no session with free seats. If the learner goes back a step, the chosen day and time stay selected.",
          },
          {
            title: "Free orders skip the payment page",
            body: "When a coupon brings the total to zero, the order is confirmed through its own endpoint instead of opening a payment page.",
          },
        ],
      },
      {
        title: "On the dashboard",
        intro: null,
        blocks: [
          {
            title: "Language from the address",
            body: "The dashboard reads the language from the path, /ar or /en, and switches the page direction with it. Arabic is the default.",
          },
          {
            title: "Built on PrimeNG's Sakai template",
            body: "I started from Sakai, PrimeNG's ready-made admin template, for the layout and menu. The modules use PrimeNG components, FullCalendar for the bookings calendar, and a shared export to PDF and Excel.",
          },
        ],
      },
    ],
  },
  hard: {
    intro: null,
    items: [
      {
        title: "Server rendering without the session",
        body: "The sign-in token lives in the browser, so the server can't tell who is signed in. The route guards took that as signed out and sent signed-in learners to the login page, which flashed before the browser corrected it. I made the server report the state as unknown, so the guards let the page render and the browser decides once it hydrates.",
      },
      {
        title: "Dates that moved a day",
        body: "The dashboard turned every date into UTC before sending it. Saudi Arabia is three hours ahead of UTC, so a date picked at midnight reached the API as the day before. I replaced that conversion everywhere with one helper that sends the local date and time.",
      },
      {
        title: "Changing a schedule people have booked",
        body: "Exam sessions repeat by day and time, and learners book seats in them. Before a time slot is edited or deleted, the dashboard shows what would change: the sessions affected, how many have bookings, and the learners in them. This list exports to Excel, and the API can block the change.",
      },
    ],
    dropped: {
      title: "Ideas I dropped",
      items: [
        "Server rendering on the admin dashboard. I removed it early on; the dashboard is a single-page app behind a login, served by nginx.",
        "Prerendering the certificate, cart and account pages for a fixed list of ids. Server rendering per request replaced it.",
        "Google sign-in on the website. I built it through Keycloak, then switched it off; learners sign in with a username and password.",
      ],
    },
  },
  result: {
    paragraphs: [
      "The live website is in Arabic, and its catalog, cart, checkout, exam booking and learner accounts all run on the production API. The admin dashboard works in Arabic and English.",
    ],
    blocks: null,
    metrics: [
      {
        value: "5",
        label: "Ways to pay at checkout: card, Mada and Apple Pay through PayTabs, or installments with Tabby or Tamara",
      },
      { value: "133", label: "Routes in the admin dashboard, in Arabic and English" },
      { value: "19", label: "Report pages in the dashboard, each with export to PDF and Excel" },
      { value: null, label: "Learners registered" },
      { value: null, label: "Vouchers sold" },
      { value: null, label: "Exams booked" },
    ],
  },
  learned: null,
};
