import { test, expect } from './pages/fixtures.js';
import { API_ENDPOINTS, INVALID_ENDPOINTS, STATUS, TEST_REQUESTS } from './pages/test-data.js';

test.describe('List users', () => {
  test('returns a non-empty user list', async ({ usersApi }) => {
    const response = await usersApi.getAllUsers();
    const responseBody = await response.json();

    await test.step('Verify the users request succeeds', () => {
      expect(response.status()).toBe(STATUS.OK);
    });
    await test.step('Verify the response contains a user array', () => {
      expect(responseBody.data).toBeInstanceOf(Array);
    });
    await test.step('Verify the user array is not empty', () => {
      expect(responseBody.data.length).toBeGreaterThan(0);
    });
  });

  test('returns not found for an invalid endpoint', async ({ usersApi }) => {
    const response = await usersApi.get(INVALID_ENDPOINTS.getAllUsersAlternative);
    await test.step('Verify the invalid endpoint is not found', () => {
      expect(response.status()).toBe(STATUS.NOT_FOUND);
    });
  });

  test('returns an error for an unsupported method', async ({ usersApi }) => {
    const response = await usersApi.post(
      API_ENDPOINTS.allUsers,
      TEST_REQUESTS.unsupportedMethod
    );
    await test.step('Verify the unsupported method returns an expected error', () => {
      expect([STATUS.NOT_FOUND, STATUS.METHOD_NOT_ALLOWED]).toContain(response.status());
    });
  });

  test('accepts a malformed authorization header without a server error', async ({ usersApi }) => {
    const response = await usersApi.getAllUsers(TEST_REQUESTS.invalidAuthorizationHeader);

    await test.step('Verify the request succeeds with the malformed authorization header', () => {
      expect(response.status()).toBe(STATUS.OK);
    });
  });
});
