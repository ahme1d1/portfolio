/** Labels of the Lean Academy drawings: the hero, the architecture and the website builder. */
export const enLeanDiagrams = {
  hero: {
    platform: { eyebrow: "One platform", name: "Lean Academy" },
    offersLabel: "What the platform offers",
    offers: ["Courses", "Exams", "Certificates", "Reports", "Live chat", "Plans and add-ons"],
    /** In order; each one gets its own mini website on the drawing. */
    organizations: ["A government body", "A company", "A training center"],
    getsLabel: "What it gets",
    gets: [
      { name: "Website", highlighted: true },
      { name: "Admins", highlighted: false },
      { name: "Instructors", highlighted: false },
      { name: "Students", highlighted: false },
    ],
  },
  architecture: {
    app: {
      eyebrow: "My part",
      title: "One Angular 19 app for every organization",
      detail: "Finds the organization by its domain at start-up",
    },
    parts: [
      { title: "The organization's website", detail: "For visitors, with a course cart" },
      { title: "Portals", detail: "For admins, instructors and students" },
      { title: "Platform owner's portal", detail: "Organizations, plans and add-ons" },
    ],
    gateway: { eyebrow: "REST, with typed clients made from Swagger", title: "API gateway" },
    servicesLabel: "Services behind the gateway",
    services: [
      { name: "Auth", mine: false },
      { name: "Courses", mine: false },
      { name: "Quizzes", mine: false },
      { name: "Assignments", mine: false },
      { name: "Files", mine: false },
      { name: "Notifications", mine: false },
      { name: "Website builder", mine: true },
      { name: "Announcements", mine: false },
      { name: "Logs", mine: false },
    ],
    hub: { eyebrow: "WebSockets", title: "SignalR hub", detail: "Chat and notifications in real time" },
    identity: { eyebrow: "OIDC", title: "External identity provider", detail: "Sign-in for one client's deployment" },
    caption:
      "My part is the app at the top. The services behind the gateway, the hub and the identity provider are other people's work.",
  },
  builder: {
    blocksTitle: "Blocks on the page, in order",
    blocksLabel: "Blocks on the page",
    /** In page order. Fixed blocks have a lock; the others a drag handle and a ticked box. */
    blocks: [
      { name: "Header", fixed: true, editing: false },
      { name: "Hero", fixed: true, editing: false },
      { name: "About us", fixed: false, editing: false },
      { name: "Courses", fixed: false, editing: true },
      { name: "Testimonials", fixed: false, editing: false },
      { name: "FAQs", fixed: false, editing: false },
      { name: "Footer", fixed: true, editing: false },
    ],
    fixed: "Fixed",
    editing: "Editing",
    unusedTitle: "Not used",
    unusedLabel: "Blocks not used",
    unused: ["Programs", "Plans", "Contact us", "Newsletter"],
    languagesTitle: "Languages",
    languages: ["English", "{العربية}"],
    sameOrder: "Same order on the page",
    previewTitle: "The organization's page, in preview",
    edit: {
      eyebrow: "Edit panel",
      title: "Courses block",
      heading: { label: "Heading", value: "Our courses" },
      paragraph: { label: "Paragraph", tools: ["B", "I", "U"] },
      background: "Background",
      button: { label: "Button text and link", value: "Browse courses" },
      actions: { preview: "Preview", save: "Save" },
    },
    caption:
      "The builder with the Courses block open: the blocks in use and their order, the page in preview, and the block's edit panel.",
  },
};

export type LeanDiagramsCopy = typeof enLeanDiagrams;
