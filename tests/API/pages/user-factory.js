import { expect, test } from '@playwright/test';
import { createUniqueUserData, STATUS } from './test-data.js';

export async function createTestUser(usersApi) {
  const user = createUniqueUserData();
  const response = await usersApi.register(user);

  await test.step('Verify the test user is created', () => {
    expect(response.status()).toBe(STATUS.CREATED);
  });
  return user;
}
