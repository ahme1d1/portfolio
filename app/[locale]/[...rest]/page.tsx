import { notFound } from "next/navigation";

/** Any unknown path under /en/ or /ar/ renders that language's 404 with status 404. */
export function generateStaticParams() {
  return [{ rest: ["404"] }];
}

export default function UnknownPage() {
  notFound();
}
