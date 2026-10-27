import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.STORYBOOK_PORT ?? 6007);
const baseURL = `http://127.0.0.1:${PORT}`;

/**
 * Visual regression tests: screenshot every story in the static Storybook
 * build (`storybook-static/`) and compare with the baselines committed in
 * `visual/__screenshots__/`.
 *
 * Always run these inside the official Playwright Docker image (see
 * `scripts/visual-docker.sh`) so fonts and rendering match the baselines.
 */
export default defineConfig({
  testDir: "./visual",
  testMatch: "**/*.visual.ts",
  outputDir: "./test-results/visual",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI
    ? [["github"], ["html", { outputFolder: "playwright-report/visual", open: "never" }]]
    : [["list"], ["html", { outputFolder: "playwright-report/visual", open: "never" }]],
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  use: {
    baseURL,
    colorScheme: "light",
    viewport: { width: 640, height: 360 },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 640, height: 360 } },
    },
  ],
  webServer: {
    command: `npx http-server storybook-static -a 127.0.0.1 -p ${PORT} -s -c-1`,
    url: `${baseURL}/index.json`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
