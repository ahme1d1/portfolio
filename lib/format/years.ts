/** "2022 – 2023", or "2024 – present" while the role goes on. The en dash keeps its spaces. */
export function formatYears(start: number, end: number | null, present: string): string {
  return `${start} – ${end ?? present}`;
}

/** A calendar month: `month` runs 1 (January) to 12. */
export type YearMonth = { year: number; month: number };

function formatMonth({ year, month }: YearMonth, months: readonly string[]): string {
  const name = months[month - 1];
  if (name === undefined) throw new RangeError(`No month ${month}: months run 1 to 12.`);
  return `${name} ${year}`;
}

/** "May 2022 – Dec 2023", or "Jan 2024 – present". Month names come from the page's language. */
export function formatMonthRange(start: YearMonth, end: YearMonth | null, months: readonly string[], present: string): string {
  return `${formatMonth(start, months)} – ${end ? formatMonth(end, months) : present}`;
}
