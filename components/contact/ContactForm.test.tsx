import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Activity } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getContactCopy } from "@/content/contact";
import { ContactForm } from "./ContactForm";

const { form: copy, reply } = getContactCopy("en");

function renderForm(props: Partial<Parameters<typeof ContactForm>[0]> = {}) {
  return render(<ContactForm copy={copy} reply={reply} label={copy.label} {...props} />);
}

async function fillIn(user: ReturnType<typeof userEvent.setup>, email = "sara@company.com") {
  await user.click(screen.getByRole("radio", { name: "A project" }));
  await user.type(screen.getByRole("textbox", { name: "Name" }), "Sara Ahmed");
  await user.type(screen.getByRole("textbox", { name: "Email" }), email);
  await user.type(screen.getByRole("textbox", { name: "Message" }), "A booking app.");
}

/** A fetch that resolves only when the test says so, to look at the sending state. */
function heldFetch() {
  let release: (response: Response) => void = () => undefined;
  const fetchFn = vi.fn<typeof fetch>(() => new Promise<Response>((resolve) => (release = resolve)));
  return { fetchFn, release: (body: unknown) => release(new Response(JSON.stringify(body))) };
}

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY", "test-key");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("is a labelled form whose fields are all required, with no topic picked", () => {
    renderForm();
    const form = screen.getByRole("form", { name: "Contact form" });
    expect(within(form).getByText("All fields are required.")).toBeInTheDocument();
    for (const name of ["Name", "Email", "Message"]) expect(screen.getByRole("textbox", { name })).toBeRequired();
    expect(screen.getAllByRole("radio").filter((radio) => (radio as HTMLInputElement).checked)).toHaveLength(0);
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveAccessibleDescription(
      "The role, or the product you want built.",
    );
  });

  it("picks the topic it was opened with", () => {
    renderForm({ defaultTopic: "role" });
    expect(screen.getByRole("radio", { name: "A role" })).toBeChecked();
  });

  it("still posts to Web3Forms without JavaScript", () => {
    const { container } = renderForm();
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "https://api.web3forms.com/submit");
    expect(form).toHaveAttribute("method", "post");
    expect(container.querySelector('input[name="access_key"]')).toHaveValue("test-key");
    expect(container.querySelector('input[name="botcheck"]')).not.toBeVisible();
  });

  it("shows what to fix, moves focus to the first field and keeps what was typed", async () => {
    const fetchFn = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchFn);
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByRole("textbox", { name: "Email" }), "sara@company");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Your message wasn't sent. Fix the fields below, or email me directly at ahmedadel8045@gmail.com.",
    );
    expect(screen.getByRole("radio", { name: "A role" })).toHaveFocus();
    const email = screen.getByRole("textbox", { name: "Email" });
    expect(email).toHaveValue("sara@company");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription("Add the part after the @, like company.com");
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("uses the one-field summary and clears it once the field is fixed", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillIn(user, "sara@company");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix the field below");
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveFocus();
    await user.type(screen.getByRole("textbox", { name: "Email" }), ".com");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).not.toHaveAttribute("aria-invalid");
  });

  it("locks the form while sending, then confirms and focuses the heading", async () => {
    const { fetchFn, release } = heldFetch();
    vi.stubGlobal("fetch", fetchFn);
    const user = userEvent.setup();
    renderForm();
    await fillIn(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    const button = screen.getByRole("button", { name: "Sending…" });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("readonly");
    expect(screen.getByRole("radio", { name: "A role" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Sending your message…");
    await user.click(button);
    expect(fetchFn).toHaveBeenCalledTimes(1);

    await act(async () => release({ success: true }));
    const heading = screen.getByRole("heading", { name: "Message sent." });
    expect(heading).toHaveFocus();
    expect(heading.tagName).toBe("H3");
    expect(screen.getByText("Thanks. I'll reply within 24 hours at the email you gave.")).toBeInTheDocument();
  });

  it("starts a fresh message from the sent state", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: true }))));
    const user = userEvent.setup();
    renderForm();
    await fillIn(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    await user.click(await screen.findByRole("button", { name: "Send another message" }));
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("");
    expect(screen.getByRole("radio", { name: "A role" })).toHaveFocus();
  });

  it("says when the connection failed, focuses the summary and keeps the message", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch")));
    const user = userEvent.setup();
    renderForm();
    await fillIn(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Check your connection and try again");
    expect(screen.getByRole("button", { name: "Send message" })).toHaveFocus();
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveValue("A booking app.");
  });

  it("says so when the form has no access key, without sending", async () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY", "");
    const fetchFn = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchFn);
    const user = userEvent.setup();
    renderForm();
    await fillIn(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("The form isn't working right now.");
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("says the form cannot send when Web3Forms refuses the message", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: false }))));
    const user = userEvent.setup();
    renderForm();
    await fillIn(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("The form isn't working right now.");
  });

  it("pretends to send when the bot trap is ticked", async () => {
    const fetchFn = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchFn);
    const user = userEvent.setup();
    const { container } = renderForm();
    await fillIn(user);
    (container.querySelector('input[name="botcheck"]') as HTMLInputElement).click();
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(await screen.findByRole("heading", { name: "Message sent." })).toBeInTheDocument();
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("forgets a sent message but keeps a draft when its page is hidden", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ success: true }))));
    const user = userEvent.setup();
    const form = (mode: "visible" | "hidden") => (
      <Activity mode={mode}>
        <ContactForm copy={copy} reply={reply} label={copy.label} />
      </Activity>
    );
    const { rerender } = render(form("visible"));
    await user.type(screen.getByRole("textbox", { name: "Name" }), "Sara");
    rerender(form("hidden"));
    rerender(form("visible"));
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Sara");

    await fillIn(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    await screen.findByRole("heading", { name: "Message sent." });
    rerender(form("hidden"));
    rerender(form("visible"));
    expect(screen.queryByRole("heading", { name: "Message sent." })).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("");
  });

  it("speaks Arabic on Arabic pages", () => {
    const ar = getContactCopy("ar");
    render(<ContactForm copy={ar.form} reply={ar.reply} label={ar.form.label} />);
    expect(screen.getByRole("form", { name: "نموذج التواصل" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "البريد الإلكتروني" })).toHaveAttribute("dir", "ltr");
    expect(screen.getByRole("textbox", { name: "الاسم" })).toHaveAttribute("dir", "auto");
  });
});
