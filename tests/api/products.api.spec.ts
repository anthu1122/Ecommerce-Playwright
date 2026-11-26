import { expect, test } from '@playwright/test';

/**
 * automationexercise.com always answers HTTP 200 and puts the "real" status in the
 * JSON field `responseCode`, so these tests assert on the body.
 */
test.describe('Products API', () => {
  test('TC_API_01 - GET /productsList returns products', { tag: ['@smoke', '@regression'] }, async ({ request }) => {
    const response = await request.get('productsList');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0]).toHaveProperty('name');
    expect(body.products[0]).toHaveProperty('price');
  });

  test('TC_API_02 - POST /productsList is not supported', { tag: '@regression' }, async ({ request }) => {
    const body = await (await request.post('productsList')).json();

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });

  test('TC_API_03 - GET /brandsList returns brands', { tag: '@regression' }, async ({ request }) => {
    const body = await (await request.get('brandsList')).json();

    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
  });

  test('TC_API_04 - POST /searchProduct returns matching products', { tag: '@regression' }, async ({ request }) => {
    const body = await (await request.post('searchProduct', { form: { search_product: 'top' } })).json();

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('TC_API_05 - POST /searchProduct without search_product returns 400', { tag: '@regression' }, async ({ request }) => {
    const body = await (await request.post('searchProduct')).json();

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('search_product parameter is missing');
  });
});
