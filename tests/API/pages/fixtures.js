import { test as base, expect } from '@playwright/test';
import { UsersApi } from './users-api.js';
import { createTestUser as createUser } from './user-factory.js';

export const test = base.extend({
  usersApi: async ({ request }, use, testInfo) => {
    await use(new UsersApi(request, testInfo));
  },
  createTestUser: async ({ usersApi }, use) => {
    await use(() => createUser(usersApi));
  }
});

export { expect };
