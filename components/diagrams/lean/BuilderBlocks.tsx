import { CheckIcon, GripIcon, LockIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";
import { plainText } from "@/lib/rich/parse";
import type { BuilderCopy } from "./builder-copy";

type Block = BuilderCopy["blocks"][number];

/** A small muted heading inside the drawing: a panel's or a list's name. */
export function PanelTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`text-[13px] font-medium text-muted ${className}`}>
      <Rich text={text} />
    </span>
  );
}

/** The ticked box of a block in use: a drawing, not a control. */
function Ticked() {
  return (
    <span aria-hidden="true" className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm bg-accent text-on-accent">
      <CheckIcon size={11} strokeWidth={3.5} />
    </span>
  );
}

const ROW = "flex h-8 items-center gap-2 rounded-lg text-sm text-ink";
const ROW_LOOKS = {
  fixed: `${ROW} bg-surface px-2.5 font-medium`,
  editing: `${ROW} border border-accent bg-chip px-2 font-semibold`,
  used: `${ROW} border border-line px-2 font-medium`,
} as const;

/** One block in the list: fixed blocks are locked in place; the others have a handle and a ticked box. */
function BlockRow({ block, copy }: { block: Block; copy: BuilderCopy }) {
  const look = block.fixed ? "fixed" : block.editing ? "editing" : "used";
  return (
    <li className={ROW_LOOKS[look]}>
      <span className={`inline-flex ${block.editing ? "text-accent-ink" : "text-muted"}`}>
        {block.fixed ? <LockIcon size={14} /> : <GripIcon size={14} />}
      </span>
      <span className="min-w-0 flex-1">
        <Rich text={block.name} />
      </span>
      {block.fixed ? (
        <span className="text-xs text-muted">
          <Rich text={copy.fixed} />
        </span>
      ) : null}
      {block.editing ? (
        <span className="text-xs font-medium text-accent-ink">
          <Rich text={copy.editing} />
        </span>
      ) : null}
      {block.fixed ? null : <Ticked />}
    </li>
  );
}

const PILL = "rounded-full px-2.5 py-1 text-[13px] font-medium";

/** The builder's side panel: the blocks in page order, the blocks not used, and the languages. */
export function BuilderBlocks({ copy }: { copy: BuilderCopy }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-button border border-line bg-page p-3.5 md:p-4">
      <PanelTitle text={copy.blocksTitle} />
      <ul aria-label={plainText(copy.blocksLabel)} className="m-0 flex list-none flex-col gap-1 p-0">
        {copy.blocks.map((block) => (
          <BlockRow key={block.name} block={block} copy={copy} />
        ))}
      </ul>
      <PanelTitle text={copy.unusedTitle} className="mt-1" />
      <ul aria-label={plainText(copy.unusedLabel)} className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {copy.unused.map((name) => (
          <li key={name} className={`${PILL} border border-dashed border-strong text-muted`}>
            <Rich text={name} />
          </li>
        ))}
      </ul>
      <PanelTitle text={copy.languagesTitle} className="mt-1" />
      <span className="flex flex-wrap gap-1.5">
        {copy.languages.map((language) => (
          <span key={language} className={`${PILL} border border-line text-ink-2`}>
            <Rich text={language} />
          </span>
        ))}
      </span>
    </div>
  );
}
