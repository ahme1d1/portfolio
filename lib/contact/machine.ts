import { validateContact, validateField, type ContactErrors, type ContactField, type ContactValues } from "./schema";
import type { Topic } from "./topics";

export type ContactStatus = "idle" | "sending" | "sent" | "error";

/**
 * fields: something to fix in the form. network: the message never reached Web3Forms (offline,
 * timeout). unavailable: the form cannot send at all (no access key, or Web3Forms refused it).
 */
export type Failure = "fields" | "network" | "unavailable";

export type ContactState = {
  status: ContactStatus;
  values: ContactValues;
  errors: ContactErrors;
  failure: Failure | null;
  /** The topic from the link that opened the form; "Send another message" starts from it again. */
  defaultTopic: Topic | null;
};

export type ContactAction =
  | { type: "change"; field: ContactField; value: string }
  | { type: "submit" }
  | { type: "succeeded" }
  | { type: "failed"; reason: Exclude<Failure, "fields"> }
  | { type: "reset" }
  /** The page was hidden (Next keeps visited pages mounted). */
  | { type: "hidden" };

export function initialState(defaultTopic: Topic | null): ContactState {
  return {
    status: "idle",
    values: { topic: defaultTopic ?? "", name: "", email: "", message: "" },
    errors: {},
    failure: null,
    defaultTopic,
  };
}

function change(state: ContactState, field: ContactField, value: string): ContactState {
  const values = { ...state.values, [field]: value };
  if (!(field in state.errors)) return { ...state, values };
  const problem = validateField(field, value);
  const { [field]: _fixed, ...rest } = state.errors;
  const errors: ContactErrors = problem ? { ...rest, [field]: problem } : rest;
  const isFixed = state.failure === "fields" && Object.keys(errors).length === 0;
  return isFixed ? { ...state, values, errors, status: "idle", failure: null } : { ...state, values, errors };
}

/** Nothing typed is ever lost: every transition keeps `values` unless the person starts over. */
export function contactReducer(state: ContactState, action: ContactAction): ContactState {
  switch (action.type) {
    case "change":
      return state.status === "sending" || state.status === "sent" ? state : change(state, action.field, action.value);
    case "submit": {
      if (state.status === "sending") return state;
      const result = validateContact(state.values);
      return result.ok
        ? { ...state, status: "sending", errors: {}, failure: null }
        : { ...state, status: "error", errors: result.errors, failure: "fields" };
    }
    case "succeeded":
      return { ...state, status: "sent", errors: {}, failure: null };
    case "failed":
      return { ...state, status: "error", errors: {}, failure: action.reason };
    case "reset":
      return initialState(state.defaultTopic);
    case "hidden":
      if (state.status === "sent") return initialState(state.defaultTopic);
      if (state.status === "error") return { ...state, status: "idle", errors: {}, failure: null };
      return state;
  }
}
