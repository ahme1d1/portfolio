"use client";

import { useCallback, useLayoutEffect, useReducer, useRef, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { contactReducer, initialState } from "@/lib/contact/machine";
import { CONTACT_FIELDS, validateContact, type ContactErrors, type ContactField } from "@/lib/contact/schema";
import { accessKey, sendMessage } from "@/lib/contact/send";
import type { Topic } from "@/lib/contact/topics";

function firstInvalid(errors: ContactErrors): ContactField | undefined {
  return CONTACT_FIELDS.find((field) => field in errors);
}

/**
 * The form's state and its focus moves. Focus moves in event handlers (after flushSync), never in
 * effects: Next keeps visited pages mounted and re-runs their effects when they show again.
 */
export function useContactForm(defaultTopic: Topic | null) {
  const [state, dispatch] = useReducer(contactReducer, defaultTopic, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);
  /** False while Next keeps the page hidden: a send that ends then must not move focus. */
  const isShownRef = useRef(false);

  // With JavaScript the form checks itself and shows its own messages instead of the browser's.
  useLayoutEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  });

  // The page was hidden: a sent message is done, a failed send goes back to the draft.
  useLayoutEffect(() => {
    isShownRef.current = true;
    return () => {
      isShownRef.current = false;
      dispatch({ type: "hidden" });
    };
  }, []);

  function focusField(field: ContactField | undefined) {
    const form = formRef.current;
    if (!form || !field) return;
    const target =
      field === "topic"
        ? (form.querySelector<HTMLInputElement>('input[name="topic"]:checked') ?? form.querySelector<HTMLInputElement>('input[name="topic"]'))
        : form.querySelector<HTMLElement>(`[name="${field}"]`);
    target?.focus();
  }

  function change(field: ContactField, value: string) {
    dispatch({ type: "change", field, value });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "sending") return;
    const result = validateContact(state.values);
    flushSync(() => dispatch({ type: "submit" }));
    if (!result.ok) {
      focusField(firstInvalid(result.errors));
      return;
    }

    const botcheck = event.currentTarget.querySelector<HTMLInputElement>('input[name="botcheck"]');
    const sent = botcheck?.checked ? { ok: true as const } : await sendMessage(result.data, { accessKey: accessKey() });
    if (sent.ok) {
      flushSync(() => dispatch({ type: "succeeded" }));
      if (isShownRef.current) sentHeadingRef.current?.focus();
    } else {
      // The summary is an alert, so it is announced; focus stays on the button, ready to try again.
      dispatch({ type: "failed", reason: sent.reason === "network" ? "network" : "unavailable" });
    }
  }

  /** The topic in the page's link; the reducer decides whether it may replace the current one. */
  const linkTopic = useCallback((topic: Topic | null) => dispatch({ type: "linked", topic }), []);

  function startOver() {
    flushSync(() => dispatch({ type: "reset" }));
    focusField("topic");
  }

  return { state, formRef, sentHeadingRef, change, submit, startOver, linkTopic };
}
