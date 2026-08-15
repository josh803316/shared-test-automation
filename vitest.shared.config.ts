import {defineConfig, type ViteUserConfig} from 'vitest/config';

/**
 * Shared Vitest config for all @josh803316 projects.
 *
 * Usage in your vitest.config.ts:
 *
 *   import {mergeConfig} from 'vitest/config';
 *   import {sharedVitestConfig} from '@josh803316/shared-test-automation/vitest';
 *
 *   export default mergeConfig(sharedVitestConfig, defineConfig({
 *     test: {
 *       include: ['src/**\/*.test.ts'],
 *     },
 *   }));
 */

export const sharedVitestConfig: ViteUserConfig = defineConfig({
  test: {
    // Globals (describe, it, expect, etc.) without importing
    globals: true,

    // jsdom for browser-like env; use 'node' for pure server code
    environment: 'node',

    // Source files to include in coverage
    include: ['src/**/*.{test,spec}.{ts,tsx}'],

    // Exclude build output and node_modules
    exclude: ['dist/**', 'node_modules/**', 'e2e/**'],

    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/index.ts'],
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },

    // Show slow tests
    slowTestThreshold: 1000,

    // Timeout per test
    testTimeout: 10000,

    // Re-run on file changes in watch mode
    watch: false,
  },
});

export default sharedVitestConfig;
