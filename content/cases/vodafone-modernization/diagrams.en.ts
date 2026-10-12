/** Labels of the Vodafone modernization drawings. Which tiles are React is drawn by the components. */
export const enVodafoneDiagrams = {
  hero: {
    before: {
      label: "Before",
      page: "A legacy jQuery page in the OpenText CMS",
      table: "jQuery DataTables",
    },
    during: {
      label: "During the migration",
      page: "The same page and CMS, with React and jQuery both running",
      table: "React data table",
    },
    widget: "jQuery widget",
    module: "React module",
    step: "One module at a time",
  },
  architecture: {
    api: {
      eyebrow: "Typed API layer",
      title: "Cancels superseded requests",
      detail: "A slow response can never overwrite a newer one.",
      cancelled: "Request 1 canceled",
      used: "Request 2 is used",
    },
    modules: {
      label: "Modules, each behind a per-environment rollout flag with its own kill switch",
      module: "React module",
      flagOn: "Flag on",
      off: "Switched off",
      offDetail: "and the legacy widget is back",
      killSwitch: "Kill switch",
    },
    bus: {
      eyebrow: "Typed callback bus",
      title: "How modules talk to each other",
      detail: "It became the permanent integration API between the rebuilt internal tools.",
    },
    caption:
      "Each module ships behind its own flag, per environment. Turning a flag off reverts that one module to the legacy widget and leaves the other modules as they are.",
  },
  table: {
    legacy: "Legacy",
    sources: ["jQuery DataTables", "JSON-driven table path"],
    eyebrow: "One component",
    title: "React and TypeScript data table",
    featuresLabel: "Table features",
    features: [
      "Sticky headers",
      "Global search",
      "Cascading column filters",
      "Merged-cell sorting",
      "Column visibility",
      "Pagination",
    ],
  },
  tools: ["Customer number lookup", "Roaming eligibility", "Store locator"],
  steps: {
    label: "How a rule moves across",
    items: ["Read the legacy code", "Extract the rule", "Pin it in a test", "Ship the module"],
  },
};

export type VodafoneDiagramsCopy = typeof enVodafoneDiagrams;
