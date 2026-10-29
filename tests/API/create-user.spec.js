import { test, expect } from './pages/fixtures.js';
import { createUniqueUserData, STATUS, TEST_USER } from './pages/test-data.js';

test.describe('User registration', () => {
  test('registers a user with valid data', async ({ usersApi }) => {
    const response = await usersApi.register(createUniqueUserData());
    await test.step('Verify registration succeeds', () => {
      expect(response.status()).toBe(STATUS.CREATED);
    });
  });

  test('rejects a registration missing the password', async ({ usersApi }) => {
    const response = await usersApi.register(TEST_USER.missingPasswordRegistration);
    await test.step('Verify registration without a password is rejected', () => {
      expect(response.status()).toBe(STATUS.BAD_REQUEST);
    });
  });

  test('rejects an invalid email format', async ({ usersApi }) => {
    const response = await usersApi.register(TEST_USER.invalidEmailRegistration);
    await test.step('Verify registration with an invalid email is rejected', () => {
      expect(response.status()).toBe(STATUS.CONFLICT);
    });
  });

  test('rejects a duplicate user', async ({ usersApi, createTestUser }) => {
    const existingUser = await createTestUser();
    const response = await usersApi.register(existingUser);
    await test.step('Verify duplicate registration is rejected', () => {
      expect(response.status()).toBe(STATUS.CONFLICT);
    });
  });
});