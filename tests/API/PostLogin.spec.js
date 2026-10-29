import { test, expect } from './pages/fixtures.js';
import {
  API_ENDPOINTS,
  createInvalidLoginData,
  INVALID_ENDPOINTS,
  STATUS,
  TEST_REQUESTS,
  TEST_USER
} from './pages/test-data.js';

test.describe('User login', () => {
  test('authenticates a registered user', async ({ usersApi, createTestUser }) => {
    const user = await createTestUser();
    const response = await usersApi.login(user);
    await test.step('Verify login succeeds for a registered user', () => {
      expect(response.status()).toBe(STATUS.OK);
    });
  });

  test('rejects an incorrect password', async ({ usersApi, createTestUser }) => {
    const user = await createTestUser();
    const response = await usersApi.login({ ...user, password: TEST_USER.wrongPassword });
    await test.step('Verify login rejects an incorrect password', () => {
      expect(response.status()).toBe(STATUS.UNAUTHORIZED);
    });
  });

  test('rejects a request missing the password', async ({ usersApi }) => {
    const response = await usersApi.login(TEST_USER.loginMissingPassword);
    await test.step('Verify login rejects a request without a password', () => {
      expect(response.status()).toBe(STATUS.BAD_REQUEST);
    });
  });

  test('rejects an unregistered user', async ({ usersApi }) => {
    const response = await usersApi.login(createInvalidLoginData());
    await test.step('Verify login rejects an unregistered user', () => {
      expect(response.status()).toBe(STATUS.NOT_FOUND);
    });
  });

  test('rejects an empty password', async ({ usersApi, createTestUser }) => {
    const user = await createTestUser();
    const response = await usersApi.login({ ...user, password: TEST_REQUESTS.emptyPassword });
    await test.step('Verify login rejects an empty password', () => {
      expect(response.status()).toBe(STATUS.BAD_REQUEST);
    });
  });

  test('rejects an empty request body', async ({ usersApi }) => {
    const response = await usersApi.login(TEST_REQUESTS.emptyBody);
    await test.step('Verify login rejects an empty request body', () => {
      expect(response.status()).toBe(STATUS.BAD_REQUEST);
    });
  });

  test('does not expose a GET login endpoint', async ({ usersApi }) => {
    const response = await usersApi.get(API_ENDPOINTS.login);
    await test.step('Verify GET is not available on the login endpoint', () => {
      expect(response.status()).toBe(STATUS.NOT_FOUND);
    });
  });

  test('rejects a PUT request to the login endpoint', async ({ usersApi }) => {
    const response = await usersApi.put(API_ENDPOINTS.login, TEST_REQUESTS.emptyBody);
    await test.step('Verify PUT requests to the login endpoint are rejected', () => {
      expect(response.status()).toBeGreaterThanOrEqual(STATUS.BAD_REQUEST);
    });
  });

  test('returns not found for an invalid endpoint', async ({ usersApi }) => {
    const response = await usersApi.post(INVALID_ENDPOINTS.login, createInvalidLoginData());
    await test.step('Verify the invalid login endpoint is not found', () => {
      expect(response.status()).toBe(STATUS.NOT_FOUND);
    });
  });
});