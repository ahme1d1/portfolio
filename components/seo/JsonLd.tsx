import { serializeJsonLd } from "@/lib/seo/person";

/** Structured data in the prerendered HTML (a plain script tag, as the Next JSON-LD guide shows). */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
