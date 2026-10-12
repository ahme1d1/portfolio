import { AlertCircleIcon } from "@/components/ui/icons";
import { Rich } from "@/components/ui/Rich";
import { EMAIL } from "@/content/links";

/** "Your message wasn't sent." with what to do next and the email address to write to instead. */
export function ErrorSummary({ text }: { text: string }) {
  return (
    <div
      role="alert"
      className="flex animate-state-in items-start gap-3 rounded-control border-2 border-error bg-page px-4 py-4"
    >
      <AlertCircleIcon size={20} className="mt-0.5 shrink-0 text-error" />
      <p className="m-0 type-body text-ink">
        <Rich
          text={text}
          slots={{
            email: (
              <a href={`mailto:${EMAIL}`} className="font-semibold text-ink underline decoration-1 underline-offset-3">
                <bdi dir="ltr" lang="en">
                  {EMAIL}
                </bdi>
              </a>
            ),
          }}
        />
      </p>
    </div>
  );
}
