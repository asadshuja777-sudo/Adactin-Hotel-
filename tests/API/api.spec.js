import { test, expect } from './pages/fixtures.js';
import {
  API_ENDPOINTS,
  INVALID_ENDPOINTS,
  STATUS,
  TEST_REQUESTS
} from './pages/test-data.js';

test.describe('Users API routing', () => {
  test('serves the users collection', async ({ usersApi }) => {
    const response = await usersApi.getAllUsers();
    await test.step('Verify the users collection request succeeds', () => {
      expect(response.status()).toBe(STATUS.OK);
    });
  });

  test('returns not found for an invalid endpoint', async ({ usersApi }) => {
    const response = await usersApi.get(INVALID_ENDPOINTS.getAllUsers);
    await test.step('Verify the invalid endpoint is not found', () => {
      expect(response.status()).toBe(STATUS.NOT_FOUND);
    });
  });

  test('rejects POST requests to the users collection', async ({ usersApi }) => {
    const response = await usersApi.post(
      API_ENDPOINTS.allUsers,
      TEST_REQUESTS.unsupportedMethod
    );
    await test.step('Verify POST to the collection is rejected', () => {
      expect(response.status()).toBeGreaterThanOrEqual(STATUS.BAD_REQUEST);
    });
  });
});
