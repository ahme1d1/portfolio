import type { ChangeEvent, HTMLInputAutoCompleteAttribute } from "react";
import { FieldError } from "./FieldError";

const CONTROL =
  "w-full rounded-control border border-strong bg-page px-3.5 text-base font-normal text-ink transition-[border-color] duration-150 ease-enter hover:border-ink-2 focus:outline-2 focus:outline-offset-2 focus:outline-accent aria-[invalid=true]:border-error aria-[invalid=true]:shadow-[inset_0_0_0_1px_var(--error)] read-only:cursor-default read-only:border-line read-only:bg-disabled read-only:text-ink-2";

type FieldProps = {
  id: string;
  name: "name" | "email" | "message";
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  /** Locked (read-only, grey) while sending. */
  isLocked: boolean;
  error: string | null;
  hint?: string;
  multiline?: boolean;
  type?: "text" | "email";
  autoComplete?: HTMLInputAutoCompleteAttribute;
  dir?: "ltr" | "auto";
};

/** A labelled text field with an optional hint and the error under it. Labels sit above, always. */
export function Field({ id, name, label, value, onChange, maxLength, isLocked, error, hint, multiline = false, type = "text", autoComplete, dir }: FieldProps) {
  const hintId = hint ? `${id}-hint` : null;
  const errorId = error ? `${id}-error` : null;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const shared = {
    id,
    name,
    value,
    required: true,
    maxLength,
    readOnly: isLocked,
    dir,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] leading-[1.4] font-semibold text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={`${CONTROL} resize-y py-3 leading-normal ar:leading-[1.8]`} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} inputMode={type === "email" ? "email" : undefined} className={`${CONTROL} h-[50px]`} />
      )}
      {hint ? (
        <span id={hintId ?? undefined} className="text-sm text-muted ar:leading-[1.7]">
          {hint}
        </span>
      ) : null}
      {error && errorId ? <FieldError id={errorId} text={error} /> : null}
    </div>
  );
}
