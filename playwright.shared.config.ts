import {defineConfig, devices, type PlaywrightTestConfig} from '@playwright/test';

/**
 * Shared Playwright config for all @josh803316 projects.
 *
 * Usage in your playwright.config.ts:
 *
 *   import {sharedPlaywrightConfig} from '@josh803316/shared-test-automation/playwright';
 *   import {mergeConfig} from '@josh803316/shared-test-automation';
 *
 *   export default mergeConfig(sharedPlaywrightConfig, {
 *     testDir: './e2e',
 *     use: {
 *       baseURL: 'http://localhost:3000',
 *     },
 *   });
 */

export const sharedPlaywrightConfig: PlaywrightTestConfig = defineConfig({
  // Look for tests in the `e2e/` directory by default
  testDir: './e2e',

  // Run tests in parallel across workers
  fullyParallel: true,

  // Fail the build if you accidentally left `test.only` in the source
  forbidOnly: !!process.env.CI,

  // Retry flaky tests on CI
  retries: process.env.CI ? 2 : 0,

  // Limit parallelism on CI to avoid resource contention
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    process.env.CI ? ['github'] : ['html', {outputFolder: 'playwright-report', open: 'never'}],
  ],

  use: {
    // Collect trace on first retry
    trace: 'on-first-retry',

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on retry
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },
    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: {...devices['Pixel 5']},
    },
    {
      name: 'Mobile Safari',
      use: {...devices['iPhone 14']},
    },
  ],

  // Run a local dev server before tests (override baseURL to match)
  // webServer: {
  //   command: 'bun run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

export default sharedPlaywrightConfig;
