import { expect, test } from '../../fixtures/test';
import data from '../../test-data/users.json';

test.describe('Login', () => {
  test('TC_LOGIN_01 - valid user can log in', { tag: ['@smoke', '@regression'] }, async ({ loginPage, productsPage }) => {
    await loginPage.open();
    await loginPage.login(data.standardUser.username, data.standardUser.password);

    await expect(productsPage.title).toHaveText('Products');
  });

  // TC_LOGIN_02..05 - data-driven from test-data/users.json
  for (const c of data.invalidLogins) {
    test(`${c.id} - ${c.name}`, { tag: '@regression' }, async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.login(c.username, c.password);

      await expect(loginPage.error).toContainText(c.error);
    });
  }

  test('TC_LOGIN_06 - user can log out', { tag: '@regression' }, async ({ loggedIn, loginPage }) => {
    await loggedIn.logout();

    await expect(loginPage.loginButton).toBeVisible();
  });
});
