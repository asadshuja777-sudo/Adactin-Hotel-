import { test, expect } from './pages/fixtures.js';
import { createPatchAccountData, STATUS, TEST_USER } from './pages/test-data.js';

test.describe('Update account (PATCH)', () => {
  test('updates an authenticated user account', async ({ usersApi, createTestUser }) => {
    const user = await createTestUser();
    const loginResponse = await usersApi.login(user);
    await test.step('Verify the user login succeeds', () => {
      expect(loginResponse.status()).toBe(STATUS.OK);
    });

    const response = await usersApi.updateAccount(createPatchAccountData(user));
    await test.step('Verify the account update succeeds', () => {
      expect(response.status()).toBe(STATUS.OK);
    });
  });

  test('requires authentication', async ({ usersApi }) => {
    const response = await usersApi.updateAccount(TEST_USER.unauthenticatedPatchAccount);
    await test.step('Verify unauthenticated account updates are rejected', () => {
      expect(response.status()).toBe(STATUS.UNAUTHORIZED);
    });
  });
});
