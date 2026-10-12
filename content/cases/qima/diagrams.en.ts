/** Labels of the Qima architecture figure. */
export const enQimaDiagrams = {
  architecture: {
    label: "The two frontends I worked on",
    clients: [
      {
        eyebrow: "For learners",
        name: "Website",
        detail: "Angular 20, rendered on the server with Express, Arabic only",
        link: "REST, from the server and the browser",
      },
      {
        eyebrow: "For staff and test centers",
        name: "Admin dashboard",
        detail: "Angular 20 single-page app, Arabic and English",
        link: "REST, from the browser",
      },
    ],
    api: {
      eyebrow: "A separate backend",
      name: "REST API",
      detail: "Behind a gateway: catalog, orders, vouchers, exam bookings and payments",
    },
    services: [
      { eyebrow: "Payments", name: "PayTabs", detail: "Card, Mada and Apple Pay" },
      { eyebrow: "Installments", name: "Tabby and Tamara", detail: "Buy now, pay later" },
      { eyebrow: "Files", name: "S3 storage", detail: "Certificate images and uploads" },
    ],
    caption:
      "The API creates each payment and returns the provider's page. After paying, the learner comes back to a status page that asks the API every two seconds until the payment is settled.",
  },
};

export type QimaDiagramsCopy = typeof enQimaDiagrams;
