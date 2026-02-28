import type {Page, Locator} from '@playwright/test';
import {expect} from '@playwright/test';

/**
 * Base class for all Page Objects.
 *
 * Provides common navigation, assertion, and interaction helpers so that
 * individual page objects stay focused on page-specific selectors and actions.
 *
 * Usage:
 *   class LoginPage extends BasePage {
 *     readonly emailInput: Locator;
 *     constructor(page: Page) {
 *       super(page, '/login');
 *       this.emailInput = page.getByLabel('Email');
 *     }
 *   }
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly path: string;

  constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
  }

  /** Navigate to this page's path */
  async goto(options?: Parameters<Page['goto']>[1]): Promise<void> {
    await this.page.goto(this.path, options);
  }

  /** Assert the current URL matches this page's path */
  async assertOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(this.path));
  }

  /** Get a locator for a data-testid attribute */
  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  /** Wait for the page to reach a network-idle state */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Take a screenshot named after this page */
  async screenshot(suffix?: string): Promise<void> {
    const name = `${this.constructor.name}${suffix ? `-${suffix}` : ''}`;
    await this.page.screenshot({path: `test-results/screenshots/${name}.png`, fullPage: true});
  }
}
