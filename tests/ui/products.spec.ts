import { expect, test } from '../../fixtures/test';

test.describe('Products', () => {
  test('TC_PROD_01 - product list shows 6 products', { tag: '@regression' }, async ({ loggedIn }) => {
    await expect(loggedIn.names).toHaveCount(6);
  });

  test('TC_PROD_02 - sort by price low to high', { tag: '@regression' }, async ({ loggedIn }) => {
    const expected = [...(await loggedIn.getPrices())].sort((a, b) => a - b);

    await loggedIn.sortBy('lohi');

    await expect.poll(() => loggedIn.getPrices()).toEqual(expected);
  });

  test('TC_PROD_03 - sort by name Z to A', { tag: '@regression' }, async ({ loggedIn }) => {
    const expected = [...(await loggedIn.getNames())].sort().reverse();

    await loggedIn.sortBy('za');

    await expect(loggedIn.names).toHaveText(expected);
  });
});
