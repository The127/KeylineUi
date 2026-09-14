import {defineConfig, devices} from '@playwright/test'

export default defineConfig({
    testDir: './tests/e2e',
    forbidOnly: !!process.env.CI,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },
    ],
    webServer: [
        {
            command: 'docker compose -f tests/e2e/compose.yml up',
            url: 'http://localhost:8081/health',
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
            gracefulShutdown: {signal: 'SIGINT', timeout: 10_000},
        },
        {
            command: 'pnpm run build && KEYLINE_API_URL=http://localhost:8081 KEYLINE_HOST=http://localhost:5173 envsubst < dist/env.template.js > dist/env.js && pnpm exec vite preview --port 5173 --strictPort',
            url: 'http://localhost:5173',
            reuseExistingServer: !process.env.CI,
            timeout: 180_000,
        },
    ],
})
