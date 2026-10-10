import { ClockIcon } from "@/components/ui/icons";

/** "I reply within 24 hours." with a clock, once per form or band. */
export function ReplyNote({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`m-0 flex items-center gap-2 text-ink-2 ${className}`}>
      <ClockIcon size={16} />
      {text}
    </p>
  );
}
