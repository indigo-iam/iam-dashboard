import { defineConfig, devices } from "@playwright/test";

const basePath = process.env.IAM_DASHBOARD_BASE_PATH ?? "/ui";
const baseURL = `https://iam.test.example${basePath}/`; // trailing '/' is required

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // https://github.com/microsoft/playwright/issues/22592#issuecomment-1519991484
    // trailing '/' is required!!
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    clientCertificates: [
      {
        origin: "https://iam.test.example",
        certPath: "./assets/trust/star_test_example.cert.pem",
        keyPath: "./assets/trust/star_test_example.key.pem",
      },
    ],
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // Remember to export NODE_EXTRA_CA_CERTS=assets/trust/star_test_example_ca.pem
  webServer: {
    command: process.env.IAM_DEVCONTAINER
      ? "npm run dev"
      : "docker compose up -d",
    url: "https://iam.test.example",
    reuseExistingServer: true,
    timeout: 10 * 60000,
    gracefulShutdown: { signal: "SIGTERM", timeout: 5000 },
  },
});
