import { expect, test } from "@playwright/test";
import { CV_PATH } from "../content/links";

test("the CV the header links to is a PDF", async ({ request }) => {
  const response = await request.get(CV_PATH);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
});
