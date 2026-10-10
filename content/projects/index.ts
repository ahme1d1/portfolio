import type { StaticImageData } from "next/image";
import type { CaseSlug } from "@/content/cases/slugs";
import type { Locale } from "@/lib/i18n/locale";
import { localePath } from "@/lib/i18n/paths";
import { asLatin, plainText } from "@/lib/rich/parse";
import { arProjects } from "./ar";
import { PROJECTS, type ProjectStatus } from "./data";
import { enProjects, type ProjectsCopy } from "./en";

const COPY: Record<Locale, ProjectsCopy> = { en: enProjects, ar: arProjects };

type ItemCopy = ProjectsCopy["items"][CaseSlug];
export type VodafoneLabels = ProjectsCopy["items"]["vodafone-modernization"]["mockup"];
export type LeanLabels = ProjectsCopy["items"]["lean-academy"]["mockup"];

const NO_VODAFONE_LABELS: VodafoneLabels = { before: "", after: "", beforeCaption: "", afterCaption: "" };
const NO_LEAN_LABELS: LeanLabels = { sections: [], result: "" };

export type CardMedia =
  | { kind: "image"; image: StaticImageData; alt: string }
  | { kind: "phones"; images: readonly { image: StaticImageData; alt: string }[] }
  | { kind: "vodafone"; labels: VodafoneLabels }
  | { kind: "lean"; labels: LeanLabels };

/** Everything one project card shows, in one language. Copy strings keep their inline markup. */
export type ProjectCardData = {
  slug: CaseSlug;
  href: string;
  title: string;
  /** The Arabic title carries the Latin name in brackets, set smaller. */
  hasTitleNote: boolean;
  linkLabel: string;
  /** Plain text read after the link label by screen readers: ": Qima". */
  linkSuffix: string;
  status: { kind: ProjectStatus; label: string } | null;
  description: string;
  stack: string;
  media: CardMedia;
};

function cardMedia(slug: CaseSlug, item: ItemCopy): CardMedia {
  const { media } = PROJECTS[slug];
  switch (media.kind) {
    case "image":
      return { kind: "image", image: media.image, alt: "alt" in item ? plainText(item.alt) : "" };
    case "phones":
      return {
        kind: "phones",
        images: media.images.map((image, index) => ({
          image,
          alt: "alts" in item ? plainText(item.alts[index] ?? "") : "",
        })),
      };
    case "vodafone":
      return { kind: "vodafone", labels: "mockup" in item && "before" in item.mockup ? item.mockup : NO_VODAFONE_LABELS };
    case "lean":
      return { kind: "lean", labels: "mockup" in item && "sections" in item.mockup ? item.mockup : NO_LEAN_LABELS };
  }
}

export function getProjectCard(locale: Locale, slug: CaseSlug): ProjectCardData {
  const copy = COPY[locale];
  const item: ItemCopy = copy.items[slug];
  const data = PROJECTS[slug];
  const title = item.title ?? asLatin(locale, data.brand);

  return {
    slug,
    href: localePath(locale, `/work/${slug}/`),
    title,
    hasTitleNote: locale === "ar" && item.title !== null && item.title.includes("{"),
    linkLabel: copy.link,
    linkSuffix: `${copy.linkSuffix}${plainText(title)}`,
    status: data.status === null ? null : { kind: data.status, label: copy.status[data.status] },
    description: item.description,
    stack: data.stack.join(", "),
    media: cardMedia(slug, item),
  };
}

export { MAIN_PROJECT_SLUGS } from "./data";
export type { ProjectsCopy };
