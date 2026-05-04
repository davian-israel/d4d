import { defineConfig, devices } from "@playwright/test";

/**
 * Live / production smoke tests — not part of default `npm run test:e2e`.
 * Requires PLAYWRIGHT_PROD_ADMIN_PASSWORD for admin scenarios.
 * Does not complete real checkout (no thank-you assertion on production).
 */
const baseURL = process.env.PLAYWRIGHT_PROD_BASE_URL ?? "https://destiny4d.xyz";

export default defineConfig({
  testDir: "e2e/production",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 90_000,
  expect: { timeout: 25_000 },
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    viewport: { width: 1280, height: 900 },
    actionTimeout: 20_000,
    navigationTimeout: 45_000,
    ignoreHTTPSErrors: false,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
