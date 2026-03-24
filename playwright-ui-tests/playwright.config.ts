import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  retries: 1,

  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },

  // reporter: [
  //   ['html'],
  //   ['list']
  // ],
  reporter: [
  ['html', { open: 'on-failure' }],
  ['list']
],

  timeout: 30000,

});
