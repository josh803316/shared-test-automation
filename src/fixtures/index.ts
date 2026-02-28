import {test as base} from '@playwright/test';
import type {Page} from '@playwright/test';

/**
 * Extended test fixtures for @josh803316 projects.
 *
 * Adds a `authenticatedPage` fixture that wraps the standard `page`
 * with any pre-auth steps your app needs.
 *
 * Usage in your tests:
 *   import {test, expect} from '@josh803316/shared-test-automation';
 *
 *   test('dashboard loads', async ({authenticatedPage}) => {
 *     await authenticatedPage.goto('/dashboard');
 *     ...
 *   });
 */

export type Fixtures = {
  /** A page that has been authenticated via storage state (if available) */
  authenticatedPage: Page;
};

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({page}, use) => {
    // Projects can set PLAYWRIGHT_STORAGE_STATE to a saved auth file.
    // If not set, just use the regular page (useful during initial setup).
    await use(page);
  },
});

export {expect} from '@playwright/test';
