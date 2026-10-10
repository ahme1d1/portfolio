import { Rich } from "@/components/ui/Rich";
import type { Block, Metric } from "@/content/cases/types";

/** h3 under a section, h4 under a group heading such as "Key decisions". */
export type BlockHeading = "h3" | "h4";

const ROW =
  "flex flex-col gap-1.5 border-t border-line py-4 md:grid md:grid-cols-[260px_minmax(0,1fr)] md:items-baseline md:gap-6 md:py-5";
const ROW_TEXT = "m-0 max-w-[560px] type-body text-ink-2 ar:max-w-[520px]";

/** A divided list: the heading on the start side, its text beside it; stacked on phones. */
export function RowList({ blocks, heading }: { blocks: readonly Block[]; heading: BlockHeading }) {
  const Heading = heading;
  return (
    <div className="border-b border-line">
      {blocks.map((block) => (
        <div key={block.title} className={ROW}>
          <Heading className="type-h3-label">
            <Rich text={block.title} />
          </Heading>
          <p className={ROW_TEXT}>
            <Rich text={block.body} />
          </p>
        </div>
      ))}
    </div>
  );
}

/** Decisions in two columns, each under a line; one divided list on phones. */
export function BlockGrid({ blocks, heading }: { blocks: readonly Block[]; heading: BlockHeading }) {
  const Heading = heading;
  return (
    <div className="mt-2 border-b border-line md:mt-4 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-7 md:border-b-0">
      {blocks.map((block) => (
        <div key={block.title} className="flex flex-col gap-1.5 border-t border-line py-4 md:gap-2 md:pt-5 md:pb-0">
          <Heading className="type-h3-label">
            <Rich text={block.title} />
          </Heading>
          <p className="m-0 type-body text-ink-2">
            <Rich text={block.body} />
          </p>
        </div>
      ))}
    </div>
  );
}

/** Numbers with what they count. Numbers Ahmed has not given yet are left out, and so is an empty list. */
export function MetricRows({ metrics }: { metrics: readonly Metric[] }) {
  const known = metrics.filter((metric): metric is Metric & { value: string } => metric.value !== null);
  if (known.length === 0) return null;
  return (
    <dl className="m-0 border-b border-line">
      {known.map((metric) => (
        <div key={metric.label} className={ROW}>
          <dt className="text-[28px] leading-none font-semibold tracking-[-0.03em] tabular-nums md:text-[34px] ar:tracking-normal">
            <bdi dir="ltr">{metric.value}</bdi>
          </dt>
          <dd className={ROW_TEXT}>
            <Rich text={metric.label} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** "Ideas I dropped": a short bulleted list on a bordered panel, at text width. */
export function DroppedPanel({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="mt-1 flex max-w-[760px] flex-col gap-2.5 rounded-panel-sm border border-line p-[18px] md:rounded-panel md:px-7 md:py-6">
      <h3 className="type-h3-row">
        <Rich text={title} />
      </h3>
      <ul className="m-0 flex max-w-[578px] list-disc flex-col gap-2 ps-[18px] type-body text-ink-2 md:gap-1.5 ar:max-w-[538px]">
        {items.map((item) => (
          <li key={item}>
            <Rich text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
