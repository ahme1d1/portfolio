/** "2022 – 2023", or "2024 – present" while the role goes on. The en dash keeps its spaces. */
export function formatYears(start: number, end: number | null, present: string): string {
  return `${start} – ${end ?? present}`;
}
