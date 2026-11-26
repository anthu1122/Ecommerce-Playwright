import { expect, test } from '../../fixtures/test';

const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';

test.describe('Cart', () => {
  test('TC_CART_01 - adding a product updates the cart badge', { tag: ['@smoke', '@regression'] }, async ({ loggedIn }) => {
    await loggedIn.addToCart(BACKPACK);

    await expect(loggedIn.cartBadge).toHaveText('1');
  });

  test('TC_CART_02 - cart shows every product that was added', { tag: '@regression' }, async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart(BACKPACK);
    await loggedIn.addToCart(BIKE_LIGHT);
    await expect(loggedIn.cartBadge).toHaveText('2');

    await loggedIn.openCart();

    await expect(cartPage.items).toHaveCount(2);
    expect(await cartPage.itemNames.allTextContents()).toEqual(expect.arrayContaining([BACKPACK, BIKE_LIGHT]));
  });

  test('TC_CART_03 - removing the only product empties the cart', { tag: '@regression' }, async ({ loggedIn, cartPage }) => {
    await loggedIn.addToCart(BACKPACK);
    await loggedIn.openCart();

    await cartPage.remove(BACKPACK);

    await expect(cartPage.items).toHaveCount(0);
  });
});
