import { describe, expect, it } from "vitest";
import { contactReducer, initialState, type ContactState } from "./machine";

const filled = (state: ContactState): ContactState =>
  [
    { type: "change", field: "topic", value: "role" },
    { type: "change", field: "name", value: "Sara" },
    { type: "change", field: "email", value: "sara@company.com" },
    { type: "change", field: "message", value: "Hello" },
  ].reduce((s, action) => contactReducer(s, action as Parameters<typeof contactReducer>[1]), state);

describe("contactReducer", () => {
  it("starts idle, with the topic from the link if there is one", () => {
    expect(initialState(null)).toMatchObject({ status: "idle", values: { topic: "", name: "", email: "", message: "" } });
    expect(initialState("project").values.topic).toBe("project");
  });

  it("goes to sending when everything is valid", () => {
    const state = contactReducer(filled(initialState(null)), { type: "submit" });
    expect(state.status).toBe("sending");
    expect(state.errors).toEqual({});
  });

  it("goes to the field error state and keeps what was typed", () => {
    const typed = contactReducer(initialState(null), { type: "change", field: "email", value: "sara@company" });
    const state = contactReducer(typed, { type: "submit" });
    expect(state).toMatchObject({ status: "error", failure: "fields", values: { email: "sara@company" } });
    expect(state.errors).toEqual({
      topic: "topicMissing",
      name: "nameMissing",
      email: "emailNoDomain",
      message: "messageMissing",
    });
  });

  it("re-checks a field with an error as it is fixed, and clears the summary once all are fixed", () => {
    let state = contactReducer(filled(initialState(null)), { type: "change", field: "email", value: "sara" });
    state = contactReducer(state, { type: "submit" });
    expect(state.errors).toEqual({ email: "emailNoAt" });
    state = contactReducer(state, { type: "change", field: "email", value: "sara@company.com" });
    expect(state).toMatchObject({ status: "idle", failure: null, errors: {} });
  });

  it("does not check a field that had no error while it is typed", () => {
    const state = contactReducer(initialState(null), { type: "change", field: "email", value: "s" });
    expect(state.errors).toEqual({});
  });

  it("ignores a second send while sending", () => {
    const sending = contactReducer(filled(initialState(null)), { type: "submit" });
    expect(contactReducer(sending, { type: "submit" })).toBe(sending);
    expect(contactReducer(sending, { type: "change", field: "name", value: "X" })).toBe(sending);
  });

  it("ends in sent, or in an error that keeps the message", () => {
    const sending = contactReducer(filled(initialState(null)), { type: "submit" });
    expect(contactReducer(sending, { type: "succeeded" }).status).toBe("sent");
    expect(contactReducer(sending, { type: "failed", reason: "network" })).toMatchObject({
      status: "error",
      failure: "network",
      values: { message: "Hello" },
    });
    expect(contactReducer(sending, { type: "failed", reason: "unavailable" })).toMatchObject({
      status: "error",
      failure: "unavailable",
    });
  });

  it("starts over from sent with an empty form", () => {
    const sent = contactReducer(contactReducer(filled(initialState("role")), { type: "submit" }), { type: "succeeded" });
    expect(contactReducer(sent, { type: "reset" })).toEqual({ ...initialState("role"), hasStartedOver: true });
  });

  it("marks only a form that came back after a sent message, so only that one fades in", () => {
    expect(initialState("role").hasStartedOver).toBe(false);
    const sent = contactReducer(contactReducer(filled(initialState(null)), { type: "submit" }), { type: "succeeded" });
    expect(contactReducer(sent, { type: "hidden" }).hasStartedOver).toBe(false);
  });

  it("when the page is hidden: forgets a sent message, keeps a draft, leaves a send running", () => {
    const draft = filled(initialState(null));
    expect(contactReducer(draft, { type: "hidden" })).toBe(draft);
    const failed = contactReducer(contactReducer(draft, { type: "submit" }), { type: "failed", reason: "network" });
    expect(contactReducer(failed, { type: "hidden" })).toMatchObject({ status: "idle", failure: null, values: draft.values });
    const sending = contactReducer(draft, { type: "submit" });
    expect(contactReducer(sending, { type: "hidden" })).toBe(sending);
    const sent = contactReducer(sending, { type: "succeeded" });
    expect(contactReducer(sent, { type: "hidden" })).toEqual(initialState(null));
  });
});

describe("the topic from the link (linked)", () => {
  it("picks the topic on a form the person hasn't touched", () => {
    const state = contactReducer(initialState(null), { type: "linked", topic: "role" });
    expect(state.values.topic).toBe("role");
    expect(state.defaultTopic).toBe("role");
  });

  it("follows a new link while the topic is still the one the last link picked", () => {
    const linked = contactReducer(initialState(null), { type: "linked", topic: "role" });
    expect(contactReducer(linked, { type: "linked", topic: "project" }).values.topic).toBe("project");
    expect(contactReducer(linked, { type: "linked", topic: null }).values.topic).toBe("");
  });

  it("keeps a topic the person chose, but starts over from the link", () => {
    const chosen = contactReducer(initialState(null), { type: "change", field: "topic", value: "other" });
    const state = contactReducer(chosen, { type: "linked", topic: "project" });
    expect(state.values.topic).toBe("other");
    expect(contactReducer(state, { type: "reset" }).values.topic).toBe("project");
  });

  it("changes nothing when the same link is read again", () => {
    const linked = contactReducer(initialState(null), { type: "linked", topic: "role" });
    expect(contactReducer(linked, { type: "linked", topic: "role" })).toBe(linked);
  });

  it("leaves a message that is sending alone", () => {
    const sending = contactReducer(filled(initialState(null)), { type: "submit" });
    const state = contactReducer(sending, { type: "linked", topic: "project" });
    expect(state.values).toEqual(sending.values);
    expect(state.status).toBe("sending");
  });

  it("clears the missing-topic error when the link picks one", () => {
    const failed = contactReducer(initialState(null), { type: "submit" });
    const state = contactReducer(failed, { type: "linked", topic: "project" });
    expect(state.values.topic).toBe("project");
    expect(state.errors).not.toHaveProperty("topic");
  });
});
