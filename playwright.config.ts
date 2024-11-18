import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests', // Directory containing test files
  timeout: 25000, // Global timeout for a test (25 seconds)
  expect: {
    timeout: 10000, // Timeout for assertions (10 seconds)
  },
  retries: 0, // Number of retries for failed tests
  reporter: 'html', // Test report format (options: 'dot', 'line', 'list', 'html')
  use: {
    baseURL: process.env.BASE_URL || 'https://app.staging.systima.no', // Base URL for the tests
    headless: false, // Run tests in headless mode (false = browser visible)
    viewport: { width: 1280, height: 720 }, // Browser window size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'on-first-retry', // Record video only on first retry
  },
  projects: [
    {
      name: 'Chromium', // Run tests in Chromium browser
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment the following to run tests in other browsers:
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});