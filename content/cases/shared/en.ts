/** Labels every case study shares. */
export const enCaseShared = {
  breadcrumbLabel: "Breadcrumb",
  factsLabel: "Project facts",
  /** The live site's button; the component fills the domain. */
  visitSite: "Visit {$site}",
  sections: {
    summary: "Summary",
    problem: "Problem",
    role: "My role",
    built: "How I built it",
    hard: "What was hard",
    result: "Result",
    learned: "What I learned",
  },
  summary: { owned: "What I owned", hard: "What was hard", result: "Result" },
  facts: {
    role: "Role",
    timeline: "Timeline",
    status: "Status",
    company: "Company",
    languages: "Languages",
    platforms: "Platforms",
    stack: "Stack",
  },
  next: "Next case study",
};

export type CaseSharedCopy = typeof enCaseShared;
