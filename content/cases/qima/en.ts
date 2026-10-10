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
    owned: "On the website, the parts that talk to the backend: sign-in, catalogue, cart, payments, exam booking and the learner's account. On the dashboard, I started the project and built most of its modules.",
    hard: "Server rendering when only the browser knows who is signed in, dates that moved a day on their way to the API, and schedule changes that touch booked seats.",
    result: "The website is in production, with the live catalogue, checkout and exam booking. The admin dashboard runs beside it.",
    resultNote: null,
  },
  problem: [
    "Qima sells international professional certifications in Saudi Arabia, from Microsoft, Adobe, Apple, Cisco, PMI and others, and runs the exams with accredited bodies such as Certiport. A learner buys an exam or a training-and-exam package, pays, and books a seat for the exam, online or at a test centre. Results, certificates and refunds follow in their account.",
    "Many learners are funded by the Human Resources Development Fund (HRDF, {هدف}), so the catalogue had to show which certificates it supports. Everything had to be in Arabic and right to left, with prices in riyals and payment by card, Mada, Apple Pay or instalments. Qima's staff and the test centres needed their own tool to run the catalogue, the vouchers, the exam sessions and the bookings.",
  ],
  role: {
    intro: "I worked on both frontends, in a team of five. The API is a separate backend.",
    items: [
      {
        title: "Website",
        body: "A teammate built most of the page layouts. I connected the site to the backend: sign-in, the catalogue and its filters, cart and checkout, payments with PayTabs (card, Mada, Apple Pay), Tabby and Tamara, refunds, coupons, the multi-step exam booking with its calendar, and the learner's account area.",
      },
      {
        title: "Admin dashboard",
        body: "I started the project and built most of its modules: vouchers, exams and exam sessions, bookings with a calendar, payments and cancellations, offers and coupons, test labs and devices, and the reports module. Teammates built the content pages, users, roles and permissions, and the home and test-centre dashboards.",
      },
      {
        title: "Project setup",
        body: "On the website, the folder structure and separate staging and production settings. On the dashboard, the scaffold, the layout and menu, and the language handling.",
      },
    ],
    shots: {
      alts: [
        "The certificate catalogue in Arabic, with a search box and filters for category, price, HRDF support and discount",
        "A certificate's page in Arabic, IC3 Spark, with its HRDF badge, description and contents",
      ],
      caption:
        "The catalogue with its four filters, and a certificate's page with its HRDF badge. A teammate built these layouts; I connected their data, the filters and adding to the cart.",
    },
  },
  built: {
    intro:
      "Two Angular 20 apps on one REST API. The website renders on the server and sets each page's title and meta tags; the dashboard is a single-page app behind a login.",
    groups: [
      {
        title: "On the website",
        intro: null,
        blocks: [
          {
            title: "Prerender only what's public",
            body: "Home, the catalogue and the static pages are prerendered. Certificate details, the cart, payment status and every account page render on the server for each request, because they depend on the visitor or on live data.",
          },
          {
            title: "A cart before sign-in",
            body: "Visitors can fill a cart without an account. It's kept in the browser and merged into their account's cart when they sign in, and an item picked just before the sign-in page is added right after it.",
          },
          {
            title: "One booking flow for both kinds of voucher",
            body: "A learner books with a voucher bought on the site or with a voucher code from outside it. Both run the same four steps (exam, time, details, confirm) on one shared state contract, saved in session storage so a refresh keeps the progress. The exam can be online or at a test centre.",
          },
          {
            title: "Only bookable days",
            body: "The booking calendar disables every day that has no session with free seats or that falls on a holiday, and keeps the chosen day and time when the learner goes back a step.",
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
            body: "I started from PrimeNG's Sakai admin template for the layout and menu, then built the modules on PrimeNG, with FullCalendar for the bookings calendar and a shared export to PDF and Excel.",
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
        body: "The sign-in token lives in the browser, so the server can't tell who is signed in. The route guards read that as signed out and sent signed-in learners to the login page, and the page flashed before the browser put it right. I made the server report the state as unknown instead: the guards let the page render, and the browser decides once the page hydrates.",
      },
      {
        title: "Dates that moved a day",
        body: "The dashboard sent dates with *{toISOString}*, which converts them to UTC. Saudi Arabia is three hours ahead, so a date picked at midnight reached the API as the day before. I replaced every call with one helper that sends the local date and time.",
      },
      {
        title: "Changing a schedule people have booked",
        body: "Exam sessions repeat by day and time, and learners book seats in them. Editing or deleting a time slot first shows what it would change: the sessions affected, how many have bookings, and the learners in them, with a list to export to Excel. The API can block the change.",
      },
    ],
    dropped: {
      title: "Ideas I dropped",
      items: [
        "Server rendering on the admin dashboard. I removed it early on; the dashboard is a single-page app behind a login, served by nginx.",
        "Prerendering the certificate, cart and account pages for a fixed list of ids. They render on the server for each request instead.",
        "Google sign-in on the website. I built it through Keycloak, then switched it off; learners sign in with a username and password.",
      ],
    },
  },
  result: {
    paragraphs: [
      "The website is in production, in Arabic: the catalogue, cart, checkout, exam booking and the learner's account all run on the live API. The admin dashboard is deployed beside it, in Arabic and English.",
    ],
    blocks: null,
    metrics: [
      {
        value: "5",
        label: "Ways to pay at checkout: card, Mada and Apple Pay through PayTabs, or instalments with Tabby or Tamara",
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
