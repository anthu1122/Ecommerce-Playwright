import { Locator, Page } from '@playwright/test';
import { slug } from '../utils/helpers';

export class CartPage {
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('.cart_item');
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.checkoutButton = page.locator('#checkout');
  }

  async remove(productName: string): Promise<void> {
    await this.page.locator(`#remove-${slug(productName)}`).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
