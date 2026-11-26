import { expect, test } from '@playwright/test';

test.describe('User API', () => {
  test('TC_API_06 - verifyLogin with unknown user returns 404', { tag: '@regression' }, async ({ request }) => {
    const response = await request.post('verifyLogin', {
      form: { email: `no_such_user_${Date.now()}@example.com`, password: 'wrong' },
    });
    const body = await response.json();

    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('TC_API_07 - verifyLogin without email returns 400', { tag: '@regression' }, async ({ request }) => {
    const body = await (await request.post('verifyLogin', { form: { password: 'secret' } })).json();

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('email or password parameter is missing');
  });

  test('TC_API_08 - DELETE /verifyLogin is not supported', { tag: '@regression' }, async ({ request }) => {
    const body = await (await request.delete('verifyLogin')).json();

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });

  test('TC_API_09 - create, verify and delete a user account', { tag: ['@smoke', '@regression'] }, async ({ request }) => {
    const email = `qa_${Date.now()}@example.com`;
    const password = 'Test@12345';
    const account = {
      name: 'QA Tester',
      email,
      password,
      title: 'Mr',
      birth_date: '1',
      birth_month: 'January',
      birth_year: '1995',
      firstname: 'QA',
      lastname: 'Tester',
      company: 'Demo Co',
      address1: '1 Test Street',
      address2: 'Suite 2',
      country: 'Singapore',
      zipcode: '123456',
      state: 'Test State',
      city: 'Test City',
      mobile_number: '0900000000',
    };

    let created = false;
    try {
      const createBody = await (await request.post('createAccount', { form: account })).json();
      expect(createBody.responseCode).toBe(201);
      expect(createBody.message).toBe('User created!');
      created = true;

      const loginBody = await (await request.post('verifyLogin', { form: { email, password } })).json();
      expect(loginBody.responseCode).toBe(200);
      expect(loginBody.message).toBe('User exists!');
    } finally {
      // Always clean up the account we created
      if (created) {
        const deleteBody = await (await request.delete('deleteAccount', { form: { email, password } })).json();
        expect(deleteBody.responseCode).toBe(200);
        expect(deleteBody.message).toBe('Account deleted!');
      }
    }
  });
});
