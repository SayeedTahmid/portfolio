import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
/**
 * Set PLAYWRIGHT_BASE_URL to run the suite against a deployed site instead of a
 * local production build, e.g.
 *   PLAYWRIGHT_BASE_URL=https://your-site.vercel.app npx playwright test
 */
const remote = process.env["PLAYWRIGHT_BASE_URL"];

/**
 * End-to-end, accessibility and layout tests. Locally they run against the
 * production build (`npm run test:e2e:full` builds first). First run on a new
 * machine: `npx playwright install chromium`.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env["CI"]),
  retries: process.env["CI"] ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: remote ?? `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  ...(remote
    ? {}
    : {
        webServer: {
          command: `npm run start -- --port ${PORT}`,
          url: `http://localhost:${PORT}`,
          reuseExistingServer: !process.env["CI"],
          timeout: 60_000,
        },
      }),
});
