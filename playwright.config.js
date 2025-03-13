const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    webServer: {
        command: 'npm run dev',
        port: 5173,
        reuseExistingServer: true
    }
});
