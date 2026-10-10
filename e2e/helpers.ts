/** Browsers put a space before the hidden ": Name" of a card link (it is positioned), so allow one. */
export const caseLink = (name: string) => new RegExp(`^Read the case study ?: ${name}$`);
