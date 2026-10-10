import type { Ref } from "react";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import type { FormCopy } from "@/content/contact";

type SentPanelProps = {
  copy: FormCopy["sent"];
  headingLevel: 2 | 3;
  headingRef?: Ref<HTMLHeadingElement>;
  onAgain: () => void;
};

/** Replaces the form once the message is sent; focus moves to its heading so it is announced. */
export function SentPanel({ copy, headingLevel, headingRef, onAgain }: SentPanelProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div role="status" className="flex animate-state-in flex-col items-start gap-4">
      <span className="flex size-14 items-center justify-center rounded-full bg-ok-bg text-ok-ink">
        <CheckIcon size={28} />
      </span>
      <Heading ref={headingRef} tabIndex={-1} className="type-h2-panel outline-none">
        {copy.title}
      </Heading>
      <p className="m-0 max-w-[520px] type-body-lg text-ink-2">{copy.text}</p>
      <Button variant="outline" onClick={onAgain} className="mt-2">
        {copy.again}
      </Button>
    </div>
  );
}
