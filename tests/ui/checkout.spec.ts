import { expect, test } from '../../fixtures/test';
import data from '../../test-data/users.json';

const BACKPACK = 'Sauce Labs Backpack'; // $29.99
const BIKE_LIGHT = 'Sauce Labs Bike Light'; // $9.99

test.describe('Checkout', () => {
  test('TC_CHK_01 - user can complete an order', { tag: ['@smoke', '@regression'] }, async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addToCart(BACKPACK);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation('An', 'Nguyen', '70000');
    await checkoutPage.continue();

    expect(await checkoutPage.getItemTotal()).toBeCloseTo(29.99, 2);

    await checkoutPage.finish();
    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
  });

  test('TC_CHK_02 - total equals item total plus tax', { tag: '@regression' }, async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addToCart(BACKPACK);
    await loggedIn.addToCart(BIKE_LIGHT);
    await loggedIn.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation('An', 'Nguyen', '70000');
    await checkoutPage.continue();

    const itemTotal = await checkoutPage.getItemTotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(itemTotal).toBeCloseTo(39.98, 2);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  });

  // TC_CHK_03..05 - data-driven from test-data/users.json
  for (const c of data.checkoutMissingFields) {
    test(`${c.id} - form requires "${c.error}"`, { tag: '@regression' }, async ({ loggedIn, cartPage, checkoutPage }) => {
      await loggedIn.addToCart(BACKPACK);
      await loggedIn.openCart();
      await cartPage.checkout();
      await checkoutPage.fillInformation(c.first, c.last, c.zip);
      await checkoutPage.continue();

      await expect(checkoutPage.error).toContainText(c.error);
    });
  }
});
