import { Rich } from "@/components/ui/Rich";
import { PanelTitle } from "./BuilderBlocks";
import type { BuilderCopy } from "./builder-copy";

type Block = BuilderCopy["blocks"][number];
type Shape = "header" | "hero" | "footer" | "editing" | "plain";

/** How a block looks on the page: the fixed frame, the block being edited (accent), or a plain band. */
function shapeOf(block: Block, index: number, count: number): Shape {
  if (block.editing) return "editing";
  if (!block.fixed) return "plain";
  if (index === 0) return "header";
  return index === count - 1 ? "footer" : "hero";
}

const LABEL = "text-xs font-medium text-muted";
const SECTION = "rounded-lg px-3";

/** Grey bars standing for menu links or text. */
function Bars({ widths, className }: { widths: readonly string[]; className: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {widths.map((width, index) => (
        <span key={index} className={`block rounded-full ${width}`} />
      ))}
    </span>
  );
}

function PreviewSection({ block, shape }: { block: Block; shape: Shape }) {
  const name = <Rich text={block.name} />;
  switch (shape) {
    case "header":
      return (
        <span className={`${SECTION} ${LABEL} flex h-[30px] items-center justify-between bg-surface`}>
          <span>{name}</span>
          <Bars widths={["h-1.5 w-[26px] bg-line", "h-1.5 w-[26px] bg-line", "h-1.5 w-[26px] bg-line"]} className="flex gap-1.5" />
        </span>
      );
    case "hero":
      return (
        <span className={`${SECTION} ${LABEL} flex h-[88px] flex-col justify-between bg-surface py-3`}>
          <span>{name}</span>
          <Bars widths={["h-2.5 w-[56%] bg-strong", "h-2 w-[36%] bg-line"]} className="flex flex-col gap-1.5" />
        </span>
      );
    case "editing":
      return (
        <span className={`${SECTION} flex flex-col gap-2 bg-accent py-2.5 text-xs font-semibold text-on-accent`}>
          <span>{name}</span>
          <span aria-hidden="true" className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((card) => (
              <span key={card} className="block h-[34px] rounded-md border border-on-accent-muted" />
            ))}
          </span>
        </span>
      );
    case "footer":
      return <span className={`${SECTION} ${LABEL} flex h-[30px] items-center bg-surface`}>{name}</span>;
    case "plain":
      return <span className={`${SECTION} ${LABEL} flex h-11 items-center border border-line`}>{name}</span>;
  }
}

/** The organization's page in preview: the same blocks, in the same order, as page sections. */
export function BuilderPreview({ copy }: { copy: BuilderCopy }) {
  const count = copy.blocks.length;
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <PanelTitle text={copy.previewTitle} />
      <div className="flex flex-col gap-2 rounded-button border border-line bg-page p-3">
        {copy.blocks.map((block, index) => (
          <PreviewSection key={block.name} block={block} shape={shapeOf(block, index, count)} />
        ))}
      </div>
    </div>
  );
}
