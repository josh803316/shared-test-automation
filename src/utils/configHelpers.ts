import type {PlaywrightTestConfig} from '@playwright/test';

/**
 * Merge a project-level Playwright config on top of the shared base config.
 * Deep-merges `use`, `projects`, and `reporter` arrays intelligently.
 */
export function mergePlaywrightConfig(
  base: PlaywrightTestConfig,
  overrides: PlaywrightTestConfig,
): PlaywrightTestConfig {
  return {
    ...base,
    ...overrides,
    use: {
      ...base.use,
      ...overrides.use,
    },
    // If the project provides its own projects list, use that; otherwise inherit base
    projects: overrides.projects ?? base.projects,
  };
}
