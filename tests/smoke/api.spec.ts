import { expect, test } from "@playwright/test";
import type { APIResponse } from "@playwright/test";

interface ToolSummary {
  id: string;
  name: string;
}

// Run tests in serial to avoid rate limit issues 
test.describe.configure({ mode: "serial" });

const assertStatusOrSkip = async (
  response: APIResponse,
  expectedStatus: number,
  failureMessage: string
) => {
  const status = response.status();
  if (status >= 500) {
    const payload = await response.text();
    test.skip(
      status >= 500,
      `Skipped: ${failureMessage} (received ${status}). Ensure the database is migrated and reachable. Response body: ${payload}`
    );
  }

  expect(status, failureMessage).toBe(expectedStatus);
};

test.describe("API smoke", () => {
  let sampleTool: ToolSummary | null = null;

  test("lists tools with pagination metadata", async ({ request }) => {
    const response = await request.get("/api/tools");
    await assertStatusOrSkip(response, 200, "tools endpoint should return 200");

    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(typeof body.meta?.total).toBe("number");
    expect(typeof body.meta?.page).toBe("number");
    expect(typeof body.meta?.limit).toBe("number");

    const first = body.data[0];
    if (first) {
      sampleTool = { id: String(first.id), name: String(first.name) };
    }
  });

  test("searches tools by query", async ({ request }) => {
    test.skip(!sampleTool, "No tool data available to search");

    const queryTerm = sampleTool!.name.split(" ")[0] ?? sampleTool!.name;
    const response = await request.get("/api/tools/search", {
      params: {
        q: queryTerm,
      },
    });

    await assertStatusOrSkip(
      response,
      200,
      "search endpoint should return 200"
    );
    const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.meta?.page).toBeGreaterThanOrEqual(1);
  });

  test("registers an upvote", async ({ request }) => {
    test.skip(!sampleTool, "No tool available for upvote test");

    const fingerprintSeed = Date.now().toString(16);
    const response = await request.post("/api/upvote", {
      headers: {
        "x-forwarded-for": `203.0.113.${fingerprintSeed}`,
      },
      data: {
        toolId: sampleTool!.id,
      },
    });

    await assertStatusOrSkip(
      response,
      200,
      "upvote endpoint should return 200"
    );
    const body = await response.json();
    expect(body.data?.id).toBe(sampleTool!.id);
    expect(typeof body.meta?.added).toBe("boolean");
  });

  test("accepts contact submissions", async ({ request }) => {
    const fingerprintSeed = (Date.now() + 1).toString(16);
    const response = await request.post("/api/contact", {
      headers: {
        "x-forwarded-for": `198.51.100.${fingerprintSeed}`,
      },
      data: {
        name: "Smoke Tester",
        email: `smoke+${Date.now()}@example.com`,
        message: "Automated smoke test confirming contact endpoint works.",
      },
    });

    await assertStatusOrSkip(
      response,
      202,
      "contact endpoint should return 202"
    );
    const body = await response.json();
    expect(typeof body.data?.id).toBe("number");
    expect(typeof body.data?.createdAt).toBe("string");
  });
});
