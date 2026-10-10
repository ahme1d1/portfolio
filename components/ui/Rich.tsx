import { Fragment, type ReactNode } from "react";
import { parseRich, type RichNode } from "@/lib/rich/parse";

type RichProps = {
  /** Copy in the inline markup of `lib/rich/parse.ts`. */
  text: string;
  /** Content for `{$name}` slots, e.g. a link. */
  slots?: Readonly<Record<string, ReactNode>>;
};

function renderNodes(nodes: readonly RichNode[], slots: RichProps["slots"]): ReactNode[] {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "text":
        return <Fragment key={index}>{node.value}</Fragment>;
      case "latin":
        return (
          <bdi key={index} dir="ltr" lang="en">
            {node.value}
          </bdi>
        );
      case "slot":
        return <Fragment key={index}>{slots?.[node.name] ?? null}</Fragment>;
      case "strong":
        return (
          <strong key={index} className="font-semibold text-ink">
            {renderNodes(node.children, slots)}
          </strong>
        );
      case "nowrap":
        return (
          <span key={index} className="whitespace-nowrap">
            {renderNodes(node.children, slots)}
          </span>
        );
    }
  });
}

/** Renders copy with Latin words in <bdi>, emphasis and slots. No hooks: works on the server and the client. */
export function Rich({ text, slots }: RichProps) {
  return <>{renderNodes(parseRich(text), slots)}</>;
}
