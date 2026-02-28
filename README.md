# @josh803316/shared-test-automation

Shared test infrastructure for all `@josh803316` projects.

Supports: **Playwright** (E2E), **Vitest** (unit/integration), **Bun test** (unit).

Used by: `lll-experience`, `elysia-playground`, `how-ad-tech-works`.

---

## Installation

```sh
bun add -D @josh803316/shared-test-automation @playwright/test vitest
```

---

## Playwright (E2E)

### Shared config

In your `playwright.config.ts`:

```ts
import {mergePlaywrightConfig, sharedPlaywrightConfig} from '@josh803316/shared-test-automation/playwright';

export default mergePlaywrightConfig(sharedPlaywrightConfig, {
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  // Enable webServer if you want Playwright to start your dev server
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Page Objects

Extend `BasePage` for each page in your app:

```ts
import {BasePage} from '@josh803316/shared-test-automation';
import type {Page} from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, '/login');
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', {name: 'Sign in'}).click();
    await this.assertOnPage(); // redirect to dashboard
  }
}
```

### Custom fixtures

```ts
import {test, expect} from '@josh803316/shared-test-automation';

test('dashboard shows username', async ({authenticatedPage}) => {
  await authenticatedPage.goto('/dashboard');
  await expect(authenticatedPage.getByTestId('username')).toBeVisible();
});
```

---

## Vitest (unit / integration)

In your `vitest.config.ts`:

```ts
import {mergeConfig} from 'vitest/config';
import {sharedVitestConfig} from '@josh803316/shared-test-automation/vitest';

export default mergeConfig(sharedVitestConfig, {
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom', // override to jsdom for React components
  },
});
```

Run tests:

```sh
bun run test:vitest
bun run test:vitest -- --coverage
bun run test:vitest -- --ui
```

---

## Bun test (unit)

Bun's built-in test runner works out of the box. Add to `package.json`:

```json
{
  "scripts": {
    "test": "bun test",
    "test:watch": "bun test --watch"
  }
}
```

Write tests using Bun's built-in matchers (compatible with Jest syntax):

```ts
import {describe, it, expect} from 'bun:test';

describe('myFunction', () => {
  it('returns expected value', () => {
    expect(myFunction(1)).toBe(2);
  });
});
```

---

## Helpers

```ts
import {waitForResponse, assertVisible, assertText, retry} from '@josh803316/shared-test-automation';

// Wait for an API call
await waitForResponse(page, /\/api\/users/);

// Assert element with readable error
await assertVisible(page, '[data-testid="header"]');

// Retry a flaky operation
const result = await retry(() => fetchSomething(), 3, 500);
```
