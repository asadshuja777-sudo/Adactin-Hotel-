import { test, expect } from './pages/fixtures.js';
import {
  createReplaceAccountData,
  INVALID_ENDPOINTS,
  STATUS,
  TEST_USER
} from './pages/test-data.js';

test.describe('Replace account (PUT)', () => {
  test('replaces an authenticated user account', async ({ usersApi, createTestUser }) => {
    const user = await createTestUser();
    const loginResponse = await usersApi.login(user);
    await test.step('Verify the user login succeeds', () => {
      expect(loginResponse.status()).toBe(STATUS.OK);
    });

    const response = await usersApi.replaceAccount(createReplaceAccountData(user));
    await test.step('Verify the account replacement succeeds', () => {
      expect(response.status()).toBe(STATUS.OK);
    });
  });

  test('requires authentication', async ({ usersApi }) => {
    const response = await usersApi.replaceAccount(TEST_USER.unauthenticatedReplaceAccount);
    await test.step('Verify unauthenticated account replacement is rejected', () => {
      expect(response.status()).toBe(STATUS.UNAUTHORIZED);
    });
  });

  test('rejects a request missing required fields', async ({ usersApi, createTestUser }) => {
    const user = await createTestUser();
    const loginResponse = await usersApi.login(user);
    await test.step('Verify the user login succeeds', () => {
      expect(loginResponse.status()).toBe(STATUS.OK);
    });

    const response = await usersApi.replaceAccount(TEST_USER.incompleteReplaceAccount);
    await test.step('Verify account replacement rejects missing required fields', () => {
      expect(response.status()).toBe(STATUS.BAD_REQUEST);
    });
  });

  test('returns not found for an invalid endpoint', async ({ usersApi }) => {
    const response = await usersApi.put(
      INVALID_ENDPOINTS.replaceAccount,
      TEST_USER.unauthenticatedReplaceAccount
    );
    await test.step('Verify the invalid replacement endpoint is not found', () => {
      expect(response.status()).toBe(STATUS.NOT_FOUND);
    });
  });
});