import { TOPICS, type Topic } from "@/lib/contact/topics";
import type { FormCopy } from "@/content/contact";
import { FieldError } from "./FieldError";

/**
 * The whole tile is the target; arrow keys move the choice (native radios). While sending the
 * radios stay focusable (aria-disabled, changes ignored), like the busy button.
 */
const TILE =
  "flex h-12 cursor-pointer items-center gap-2.5 rounded-control border border-strong bg-page px-3.5 text-[15px] text-ink transition-fast hover:border-ink-2 active:scale-[0.97] has-checked:border-accent has-checked:font-semibold has-checked:shadow-[inset_0_0_0_1px_var(--accent)] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent has-aria-disabled:cursor-default has-aria-disabled:border-line has-aria-disabled:bg-disabled has-aria-disabled:text-ink-2 has-aria-disabled:hover:border-line has-aria-disabled:active:scale-100 has-[:checked[aria-disabled=true]]:border-strong has-[:checked[aria-disabled=true]]:shadow-[inset_0_0_0_1px_var(--strong)] lg:justify-center lg:gap-2 lg:px-0";

type TopicTilesProps = {
  id: string;
  copy: FormCopy["topic"];
  value: string;
  onChange: (topic: Topic) => void;
  isLocked: boolean;
  error: string | null;
};

export function TopicTiles({ id, copy, value, onChange, isLocked, error }: TopicTilesProps) {
  const errorId = `${id}-error`;
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-2.5 p-0 text-[15px] leading-[1.4] font-semibold text-ink">{copy.legend}</legend>
      <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3">
        {TOPICS.map((topic, index) => (
          <label key={topic} className={TILE}>
            <input
              type="radio"
              name="topic"
              value={topic}
              checked={value === topic}
              required={index === 0}
              aria-disabled={isLocked || undefined}
              aria-describedby={error ? errorId : undefined}
              onChange={() => {
                if (!isLocked) onChange(topic);
              }}
              className="m-0 size-[18px] shrink-0 accent-accent focus-visible:outline-none"
            />
            {copy.options[topic]}
          </label>
        ))}
      </div>
      {error ? (
        <div className="mt-2">
          <FieldError id={errorId} text={error} />
        </div>
      ) : null}
    </fieldset>
  );
}
