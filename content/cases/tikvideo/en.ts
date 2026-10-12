import type { CaseCopy } from "../types";

export const enTikVideo: CaseCopy = {
  title: null,
  meta: "Frontend for the website and admin dashboard",
  lede: "An Arabic AI platform that turns ideas into videos, images and songs: a website where people make them, and a dashboard for the admins who run it.",
  notice: null,
  hero: {
    alts: [
      "The TikVideo home page on desktop, in Arabic. The headline reads: turn your special moments into professional videos.",
      "The same home page on a phone",
    ],
    caption:
      "The website's home page on desktop and on a phone, Arabic only and dark by design, captured from a local build.",
  },
  facts: {
    role: [{ text: "Built both frontends: the website and the admin dashboard", note: "The backend team built the API" }],
    languages: [
      { text: "Website", note: "Arabic only, right to left" },
      { text: "Admin dashboard", note: "Arabic and English" },
    ],
    platforms: [
      { text: "Website", note: "Nuxt 4" },
      { text: "Admin dashboard", note: "Nuxt 4, PrimeVue" },
      { text: "REST API", note: "Laravel" },
    ],
  },
  summary: {
    owned:
      "The website's home and sign-in pages, its studio for signed-in users, its API integration and tests, plus almost all of the admin dashboard. I started both apps.",
    hard: "AI results aren't ready when the request returns, so the website has to wait for them. The API's responses didn't always match the website's types, and video drafts broke after a reload.",
    result: "2,234 tests passing on the website, with 91.5% line coverage. The live site is offline today.",
    resultNote: null,
  },
  problem: [
    "TikVideo ({تيك فيديو}) describes itself in one line on its home page: write your idea, and watch the AI make a high-quality video for you. It is meant for content creators, marketers and business owners with no technical experience, mostly in Saudi Arabia.",
    "It started from personalized songs for occasions like birthdays and graduations. You pick a genre, a mood and a voice, edit the lyrics and add the recipient's name, then turn the song into a music video with photos. Around that it needed accounts with phone verification, subscriptions and credits paid through Moyasar, and an admin dashboard to run the platform.",
  ],
  role: {
    intro:
      "I built the website and the admin dashboard on the backend team's Laravel API. A teammate built three parts of the website: the in-browser video editor, the first version of the video wizard and the media library.",
    items: [
      {
        title: "Website",
        body: "I started the Nuxt 4 project and built the header and footer, all eight home sections, the About page, and the sign-in, sign-up, password reset and phone code pages.",
      },
      {
        title: "Studio",
        body: "The area behind sign-in where people create: images, videos and songs with their detail pages, projects and saved items, notifications and the profile.",
      },
      {
        title: "API integration",
        body: "Sign-in with phone codes, Google and Apple; packages, subscription checkout, credits and orders; creating songs, images and videos; support tickets and notifications.",
      },
      {
        title: "Test suite",
        body: "Unit and component tests in Vitest. End-to-end tests in Playwright that run in Chromium, Firefox, WebKit and an iPhone profile, and fail on serious accessibility violations.",
      },
      {
        title: "Admin dashboard",
        body: "I started it and built almost all of it: users, packages, subscriptions, orders and transactions, content, support tickets, reports with charts, roles and permissions, and two-factor sign-in.",
      },
    ],
    shots: {
      alts: [
        "The how it works section in Arabic: four numbered steps: images, music and a song, a template and effects, then preview and export",
        "The features section in Arabic: privacy, one place for everything, human review, AI help and saved time",
      ],
      caption: "Two of the eight home sections I built: how the platform works, and what sets it apart.",
    },
  },
  built: {
    intro:
      "The website and the dashboard are separate Nuxt 4 apps that share one Laravel API. The API calls the AI services and the payment gateway, and the apps show what it returns.",
    groups: [
      {
        title: "On the website",
        intro: null,
        blocks: [
          {
            title: "Four kinds of page",
            body: "A global route guard sorts every page into one of four kinds. Public pages are open to all, and guest-only pages such as sign-in are for signed-out visitors. A phone code page serves users who are signed in but not yet verified. The studio, profile, notifications and checkout need a verified phone.",
          },
          {
            title: "The API client",
            body: "Every request goes through one typed client. It adds the token and asks for Arabic responses. On a 401 it signs the user out; on a 403, a 404 or a server error it shows the error page; after 30 seconds it gives up. Errors reach the user as an Arabic sentence instead of raw request text.",
          },
          {
            title: "Payment on Moyasar's page",
            body: "When the user comes back from Moyasar, the success and cancel pages check the order with the API instead of trusting the link they were opened with.",
          },
          {
            title: "A song inside the wizard",
            body: "The video wizard's steps are project details, images, lyrics, voice and music, then generating and previewing. I added a way to make the song inside it, so the soundtrack is made in the same flow as the video.",
          },
        ],
      },
      {
        title: "On the admin dashboard",
        intro: null,
        blocks: [
          {
            title: "Access by permission",
            body: "69 permissions sit on pages, menu items and single buttons, so each admin sees only what their role allows. Admins, roles and permissions are managed from the dashboard itself.",
          },
          {
            title: "One table for every list",
            body: "Every list page is built on one shared data table: paging, sorting and filtering on the server, with a stats strip and an Excel export on each list.",
          },
          {
            title: "Two languages",
            body: "Arabic by default, right to left, and English, left to right, with 1,737 strings in each language. The choice lives in a cookie, so page addresses don't change.",
          },
          {
            title: "Two-factor sign-in",
            body: "Admins can turn on an authenticator app, set up from a QR code and backed by eight recovery codes.",
          },
        ],
      },
    ],
  },
  hard: {
    intro: null,
    items: [
      {
        title: "Waiting for the AI",
        body: "A song is still being made when the request returns, so the page asks the API for its status every 10 seconds, up to 30 times. It follows the progress, keeps going through a dropped connection, and tells the user in Arabic when the wait runs out.",
      },
      {
        title: "Responses that didn't match",
        body: "The API's live responses didn't always match what the website expected. The profile came back without the phone number, and users had a first and a last name but no full name. Some errors arrived with no message at all. I checked the screens against real responses and fixed each mismatch in the frontend.",
      },
      {
        title: "Drafts that broke on reload",
        body: "The video wizard keeps a draft for 24 hours. Files picked from the device were saved only as temporary browser links, which stop working on reload, so a restored draft looked complete and then failed at generation. A restored draft now drops those files and asks the user to upload them again.",
      },
    ],
    dropped: null,
  },
  result: {
    paragraphs: [
      "I built the website and the dashboard and connected both to the API, and the website's tests pass. The live site is offline today, so the screenshots on this page come from a local build.",
    ],
    blocks: null,
    metrics: [
      { value: "2,234", label: "Unit and component tests passing on the website, in 249 files" },
      { value: "91.5%", label: "Line coverage of the website's code" },
      { value: "69", label: "Permissions that decide what each admin can see and do on the dashboard" },
      { value: null, label: "Users" },
      { value: null, label: "Videos, images and songs made" },
      { value: null, label: "Paying subscribers" },
    ],
  },
  learned: null,
};
