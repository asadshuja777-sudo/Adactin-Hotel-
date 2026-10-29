import { test, expect } from './pages/fixtures.js';
import { INVALID_ENDPOINTS, STATUS, TEST_USER } from './pages/test-data.js';

test.describe('Delete account', () => {
  test('deletes an authenticated user account', async ({ usersApi, createTestUser }) => {
    const user = await createTestUser();
    const loginResponse = await usersApi.login(user);
    await test.step('Verify the user login succeeds', () => {
      expect(loginResponse.status()).toBe(STATUS.OK);
    });

    const deleteResponse = await usersApi.deleteAccount();
    await test.step('Verify the authenticated account is deleted', () => {
      expect(deleteResponse.status()).toBe(STATUS.OK);
    });
  });

  test('requires authentication', async ({ usersApi }) => {
    const deleteResponse = await usersApi.deleteAccount();
    await test.step('Verify unauthenticated account deletion is rejected', () => {
      expect(deleteResponse.status()).toBe(STATUS.UNAUTHORIZED);
    });
  });

  test('does not allow deletion after a failed login', async ({ usersApi, createTestUser }) => {
    const user = await createTestUser();
    const loginResponse = await usersApi.login({ ...user, password: TEST_USER.wrongPassword });
    await test.step('Verify login with an incorrect password is rejected', () => {
      expect(loginResponse.status()).toBe(STATUS.UNAUTHORIZED);
    });

    const deleteResponse = await usersApi.deleteAccount();
    await test.step('Verify account deletion remains unauthorized', () => {
      expect(deleteResponse.status()).toBe(STATUS.UNAUTHORIZED);
    });
  });

  test('returns not found for an invalid endpoint', async ({ usersApi }) => {
    const response = await usersApi.delete(INVALID_ENDPOINTS.deleteAccount);
    await test.step('Verify the invalid delete endpoint is not found', () => {
      expect(response.status()).toBe(STATUS.NOT_FOUND);
    });
  });
});