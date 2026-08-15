import type {Page} from '@playwright/test';
import {expect} from '@playwright/test';

/** Wait for a network response matching a URL pattern */
export async function waitForResponse(page: Page, urlPattern: string | RegExp, timeout = 10_000) {
  return await page.waitForResponse(urlPattern, {timeout});
}

/** Wait for navigation to a URL matching the given pattern */
export async function waitForNavigation(page: Page, urlPattern: string | RegExp) {
  return await page.waitForURL(urlPattern);
}

/** Take a named screenshot, saved to test-results/screenshots/ */
export async function screenshot(page: Page, name: string) {
  await page.screenshot({path: `test-results/screenshots/${name}.png`, fullPage: true});
}

/** Assert an element is visible with a helpful error message */
export async function assertVisible(page: Page, selector: string, message?: string) {
  await expect(page.locator(selector), message ?? `Expected "${selector}" to be visible`).toBeVisible();
}

/** Assert an element contains specific text */
export async function assertText(page: Page, selector: string, text: string) {
  await expect(page.locator(selector)).toContainText(text);
}

/** Retry an async operation up to `maxAttempts` times */
export async function retry<T>(fn: () => Promise<T>, maxAttempts = 3, delayMs = 500): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  throw lastError;
}
