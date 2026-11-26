import { Locator, Page } from '@playwright/test';
import { parseMoney, slug } from '../utils/helpers';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class ProductsPage {
  readonly title: Locator;
  readonly names: Locator;
  readonly prices: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('.title');
    this.names = page.locator('.inventory_item_name');
    this.prices = page.locator('.inventory_item_price');
    this.sortDropdown = page.locator('.product_sort_container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getNames(): Promise<string[]> {
    return this.names.allTextContents();
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.prices.allTextContents();
    return texts.map(parseMoney);
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.locator(`#add-to-cart-${slug(productName)}`).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.page.locator(`#remove-${slug(productName)}`).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
