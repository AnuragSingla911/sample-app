// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const FRONTEND_URL = process.env.E2E_BASE_URL || 'http://localhost:3000';

/**
 * Playwright config for the sample full-stack app.
 * Runs the same locally (Devin) and in CI: the `webServer` block boots the
 * Express backend and the React dev server, then Playwright drives a real
 * browser against them. Locally, an already-running app is reused.
 */
module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: FRONTEND_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: [
    {
      command: 'node server.js',
      cwd: './backend',
      port: 5000,
      reuseExistingServer: !process.env.CI,
      timeout: 60 * 1000,
    },
    {
      command: 'npm start',
      cwd: './frontend',
      env: { BROWSER: 'none', PORT: '3000' },
      port: 3000,
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  ],
});
