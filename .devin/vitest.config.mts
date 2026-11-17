import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: fileURLToPath(new URL('../', import.meta.url)),
  oxc: { jsx: { runtime: 'automatic' } },
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    include: ['src/**/*.test.{ts,tsx}'],
    globals: false,
    setupFiles: ['src/testing/setup.ts'],
    clearMocks: true,
    restoreMocks: true,
    isolate: true,
    allowOnly: !process.env.CI,
    passWithNoTests: false,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/index.tsx', 'src/**/*.d.ts', 'src/**/*.test.{ts,tsx}', 'src/testing/**'],
      thresholds: {
        perFile: true,
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
        autoUpdate: false,
      },
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      reportOnFailure: true,
      clean: true,
    },
  },
});
