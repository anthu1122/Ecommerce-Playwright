import { Locator, Page } from '@playwright/test';
import { parseMoney } from '../utils/helpers';

/** Covers the 3 checkout screens: information -> overview -> complete. */
export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly error: Locator;

  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly confirmationHeader: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.error = page.locator('[data-test="error"]');

    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.confirmationHeader = page.locator('.complete-header');
  }

  async fillInformation(first: string, last: string, zip: string): Promise<void> {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async getItemTotal(): Promise<number> {
    return parseMoney(await this.subtotal.innerText());
  }

  async getTax(): Promise<number> {
    return parseMoney(await this.tax.innerText());
  }

  async getTotal(): Promise<number> {
    return parseMoney(await this.total.innerText());
  }
}
