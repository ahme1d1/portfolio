import { AlertCircleIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";

/** The fix, right under the field it is about (linked with aria-describedby). */
export function FieldError({ id, text }: { id: string; text: string }) {
  return (
    <span id={id} className="flex animate-state-in items-start gap-1.5 text-sm leading-[1.45] font-medium text-error">
      <AlertCircleIcon size={15} className="mt-[calc((1lh-15px)/2)] shrink-0" />
      <span>
        <Rich text={text} />
      </span>
    </span>
  );
}
