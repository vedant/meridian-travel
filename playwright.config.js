import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 45000,
  use: {
    baseURL: 'http://127.0.0.1:5194',
    headless: true,
    launchOptions: {
      executablePath: '/usr/bin/chromium',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  },
  projects: [
    {
      name: 'ios-iphone-15-pro',
      use: {
        ...devices['iPhone 14 Pro'],
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: 'npx vite preview --host 127.0.0.1 --port 5194',
    port: 5194,
    reuseExistingServer: false,
    timeout: 30000,
  },
});
