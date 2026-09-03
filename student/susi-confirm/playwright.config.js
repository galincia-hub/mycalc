const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: 'qa.spec.js',
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:4177',
    locale: 'ko-KR',
  },
  webServer: {
    command: 'python3 -m http.server 4177 --bind 127.0.0.1 --directory ../..',
    url: 'http://127.0.0.1:4177/student/susi-confirm/',
    reuseExistingServer: true,
    timeout: 15000,
  },
});
