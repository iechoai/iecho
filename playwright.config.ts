import { defineConfig } from "@playwright/test";

const PORT = process.env.PORT ?? "3000";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "tests/smoke",
  fullyParallel: false,
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
  },
  webServer: {
    command: "pnpm dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      PORT,
    },
  },
  workers: 1,
});
