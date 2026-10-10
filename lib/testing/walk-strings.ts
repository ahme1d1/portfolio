export type StringEntry = { path: string; value: string };

/** Every string inside a nested content object, with a dotted path such as "nav.items.0.label". */
export function walkStrings(value: unknown, path = ""): StringEntry[] {
  if (typeof value === "string") return [{ path, value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => walkStrings(item, join(path, String(index))));
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => walkStrings(item, join(path, key)));
  }
  return [];
}

function join(path: string, key: string): string {
  return path === "" ? key : `${path}.${key}`;
}
