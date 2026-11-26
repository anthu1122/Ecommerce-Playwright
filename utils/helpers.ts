/** "Sauce Labs Backpack" -> "sauce-labs-backpack" (used in saucedemo button ids). */
export const slug = (productName: string): string => productName.toLowerCase().replace(/ /g, '-');

/** "Item total: $29.99" -> 29.99 */
export const parseMoney = (text: string): number => parseFloat(text.replace(/[^0-9.]/g, ''));
