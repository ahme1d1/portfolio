import { AlertCircleIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";

/** The fix, right under the field it is about (linked with aria-describedby). */
export function FieldError({ id, text }: { id: string; text: string }) {
  return (
    <span id={id} className="flex animate-state-in items-center gap-1.5 text-sm font-medium text-error">
      <AlertCircleIcon size={15} />
      <span>
        <Rich text={text} />
      </span>
    </span>
  );
}
