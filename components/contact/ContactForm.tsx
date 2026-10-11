"use client";

import { Suspense, useId } from "react";
import { Button } from "@/components/ui/Button";
import { SpinnerIcon } from "@/components/ui/icons";
import type { FormCopy } from "@/content/contact";
import type { ContactState } from "@/lib/contact/machine";
import { MAX_LENGTH } from "@/lib/contact/schema";
import { accessKey, WEB3FORMS_URL } from "@/lib/contact/send";
import type { Topic } from "@/lib/contact/topics";
import { ErrorSummary } from "./ErrorSummary";
import { Field } from "./Field";
import { ReplyNote } from "./ReplyNote";
import { SentPanel } from "./SentPanel";
import { TopicFromUrl } from "./TopicFromUrl";
import { TopicTiles } from "./TopicTiles";
import { useContactForm } from "./useContactForm";

type ContactFormProps = {
  copy: FormCopy;
  reply: string;
  /** The form's accessible name ("Contact form") when it has no visible title. */
  label: string;
  /** A visible h2 above the fields that also names the form (Contact page). */
  title?: string;
  /** The topic to start from; nothing is picked without it. */
  defaultTopic?: Topic | null;
  /** Take the topic from the page's link (`?topic=role`), as the Contact page does. */
  linkTopic?: boolean;
  /** The "Message sent." heading sits one level under the section around the form. */
  sentHeadingLevel?: 2 | 3;
};

function summaryText(copy: FormCopy, state: ContactState): string | null {
  if (state.failure === null) return null;
  if (state.failure === "fields") return Object.keys(state.errors).length > 1 ? copy.summary.many : copy.summary.one;
  return copy.summary[state.failure];
}

/**
 * The one contact form (Home band and Contact page): idle → sending → sent, or an error. It posts to
 * Web3Forms from the browser; without JavaScript the same form posts there directly.
 */
export function ContactForm({
  copy,
  reply,
  label,
  title,
  defaultTopic = null,
  linkTopic = false,
  sentHeadingLevel = 3,
}: ContactFormProps) {
  const id = useId();
  const form = useContactForm(defaultTopic);
  const urlTopic = linkTopic ? (
    <Suspense fallback={null}>
      <TopicFromUrl onTopic={form.linkTopic} />
    </Suspense>
  ) : null;

  return (
    <>
      {urlTopic}
      <FormBody id={id} form={form} copy={copy} reply={reply} label={label} title={title} sentHeadingLevel={sentHeadingLevel} />
    </>
  );
}

type FormBodyProps = Pick<ContactFormProps, "copy" | "reply" | "label" | "title"> & {
  id: string;
  form: ReturnType<typeof useContactForm>;
  sentHeadingLevel: 2 | 3;
};

function FormBody({ id, form, copy, reply, label, title, sentHeadingLevel }: FormBodyProps) {
  const { state, formRef, sentHeadingRef, change, submit, startOver } = form;
  const isSending = state.status === "sending";
  const message = (field: keyof ContactState["errors"]) => {
    const code = state.errors[field];
    return code ? copy.errors[code] : null;
  };

  if (state.status === "sent") {
    return <SentPanel copy={copy.sent} headingLevel={sentHeadingLevel} headingRef={sentHeadingRef} onAgain={startOver} />;
  }

  const summary = summaryText(copy, state);
  const titleId = `${id}-title`;
  const required = <p className="m-0 type-small text-muted">{copy.required}</p>;

  return (
    <form
      ref={formRef}
      action={WEB3FORMS_URL}
      method="post"
      aria-label={title ? undefined : label}
      aria-labelledby={title ? titleId : undefined}
      onSubmit={submit}
      className={`flex flex-col gap-4 lg:gap-[18px] ${state.hasStartedOver ? "animate-state-in" : ""}`}
    >
      <input type="hidden" name="access_key" value={accessKey()} />
      <input type="hidden" name="subject" value="Portfolio message" />
      <input type="hidden" name="from_name" value="Ahmed Gabal portfolio" />
      {/* Web3Forms' bot trap: people never see it, bots tick it. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" hidden />

      {title ? (
        <div className="flex flex-col gap-1.5 lg:gap-3">
          <h2 id={titleId} className="type-h2-panel">
            {title}
          </h2>
          {required}
        </div>
      ) : (
        required
      )}
      {summary ? <ErrorSummary text={summary} /> : null}

      <TopicTiles
        id={`${id}-topic`}
        copy={copy.topic}
        value={state.values.topic}
        onChange={(topic) => change("topic", topic)}
        isLocked={isSending}
        error={message("topic")}
      />
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-3.5">
        <Field
          id={`${id}-name`}
          name="name"
          label={copy.name}
          value={state.values.name}
          onChange={(value) => change("name", value)}
          maxLength={MAX_LENGTH.name}
          isLocked={isSending}
          error={message("name")}
          autoComplete="name"
          dir="auto"
        />
        <Field
          id={`${id}-email`}
          name="email"
          type="email"
          label={copy.email}
          value={state.values.email}
          onChange={(value) => change("email", value)}
          maxLength={MAX_LENGTH.email}
          isLocked={isSending}
          error={message("email")}
          autoComplete="email"
          dir="ltr"
        />
      </div>
      <Field
        id={`${id}-message`}
        name="message"
        label={copy.message}
        hint={copy.messageHint}
        multiline
        value={state.values.message}
        onChange={(value) => change("message", value)}
        maxLength={MAX_LENGTH.message}
        isLocked={isSending}
        error={message("message")}
        dir="auto"
      />

      <div className="flex flex-col gap-4 lg:mt-1 lg:flex-row lg:flex-wrap lg:items-center">
        <Button type="submit" variant="cobalt" busy={isSending} className="w-full lg:w-auto lg:px-7">
          {/* The sending state fades in like every other state change. */}
          {isSending ? (
            <span className="grid animate-state-in">
              <SpinnerIcon size={18} />
            </span>
          ) : null}
          {isSending ? <span className="animate-state-in">{copy.sending}</span> : copy.submit}
        </Button>
        <ReplyNote text={reply} className="justify-center text-sm lg:justify-start lg:text-[15px]" />
      </div>
      <p role="status" className="sr-only">
        {isSending ? copy.sendingStatus : ""}
      </p>
    </form>
  );
}
