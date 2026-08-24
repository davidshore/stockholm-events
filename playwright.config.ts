import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./grader",
  testMatch: "mobile.grade.spec.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: "list",
  retries: process.env.CI ? 1 : 0,
  use: {
    ...devices["iPhone 13"],
    baseURL: "http://127.0.0.1:3100",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm start -- -p 3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: "http://127.0.0.1:3100",
  },
});
