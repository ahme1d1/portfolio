import { afterEach, describe, expect, it, vi } from "vitest";
import { accessKey, sendMessage, WEB3FORMS_URL } from "./send";

const DATA = { topic: "role", name: "Sara", email: "sara@company.com", message: "Hello" } as const;

const respond = (body: unknown, status = 200) =>
  vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify(body), { status }));

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("sendMessage", () => {
  it("does not try without an access key", async () => {
    const fetchFn = respond({ success: true });
    expect(await sendMessage(DATA, { accessKey: "", fetchFn })).toEqual({ ok: false, reason: "config" });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("posts the form fields to Web3Forms", async () => {
    const fetchFn = respond({ success: true });
    expect(await sendMessage(DATA, { accessKey: "key", fetchFn })).toEqual({ ok: true });
    const [url, init] = fetchFn.mock.calls[0] ?? [];
    expect(url).toBe(WEB3FORMS_URL);
    expect(init?.method).toBe("POST");
    const body = init?.body as FormData;
    expect(Object.fromEntries(body.entries())).toMatchObject({ access_key: "key", ...DATA, botcheck: "" });
    expect(body.get("subject")).toMatch(/role/);
    expect(init?.signal).toBeInstanceOf(AbortSignal);
  });

  it("keeps line breaks out of the subject", async () => {
    const fetchFn = respond({ success: true });
    await sendMessage({ ...DATA, name: "Sara\r\nBcc: x@y.z" }, { accessKey: "key", fetchFn });
    const body = fetchFn.mock.calls[0]?.[1]?.body as FormData;
    expect(body.get("subject")).toBe("Portfolio message (role) from Sara Bcc: x@y.z");
  });

  it("treats a refusal as a failed send", async () => {
    expect(await sendMessage(DATA, { accessKey: "key", fetchFn: respond({ success: false }) })).toEqual({
      ok: false,
      reason: "rejected",
    });
    expect(await sendMessage(DATA, { accessKey: "key", fetchFn: respond({ success: true }, 500) })).toEqual({
      ok: false,
      reason: "rejected",
    });
    const notJson = vi.fn<typeof fetch>().mockResolvedValue(new Response("<html>", { status: 200 }));
    expect(await sendMessage(DATA, { accessKey: "key", fetchFn: notJson })).toEqual({ ok: false, reason: "rejected" });
  });

  it("treats a dropped connection or a timeout as a network failure", async () => {
    const offline = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch"));
    expect(await sendMessage(DATA, { accessKey: "key", fetchFn: offline })).toEqual({ ok: false, reason: "network" });
  });
});

describe("accessKey", () => {
  it("reads the public Web3Forms key", () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY", "abc");
    expect(accessKey()).toBe("abc");
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_KEY", undefined);
    expect(accessKey()).toBe("");
  });
});
