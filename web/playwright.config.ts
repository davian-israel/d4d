import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  testIgnore: ["**/e2e/production/**"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    viewport: { width: 390, height: 844 },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    // Prefer reusing a local dev server; set PW_FORCE_WEBSERVER=1 to always start a fresh `npm run start`.
    reuseExistingServer: process.env.PW_FORCE_WEBSERVER !== "1",
    cwd: __dirname,
    env: {
      ...process.env,
      MOCK_PAYMENTS: "true",
      AUTH_TRUST_HOST: "true",
      AUTH_SECRET: process.env.AUTH_SECRET ?? "playwright-test-secret-min-32-characters-long",
    },
  },
});
