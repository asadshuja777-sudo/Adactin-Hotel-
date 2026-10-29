import { randomUUID } from 'node:crypto';
import testData from './api-test-data.json';

export const STATUS = Object.freeze(testData.STATUS);
export const API_ENDPOINTS = Object.freeze(testData.API_ENDPOINTS);
export const TEST_REQUESTS = Object.freeze(testData.TEST_REQUESTS);
export const TEST_USER = Object.freeze(testData.TEST_USER);
export const INVALID_ENDPOINTS = Object.freeze(testData.INVALID_ENDPOINTS);

export function createUniqueUserData(prefix = 'playwright') {
  const id = randomUUID().replaceAll('-', '');
  const displayName = prefix === 'playwright' ? 'Playwright' : prefix;
  const usernamePrefix = prefix === 'playwright' ? 'pw' : prefix;

  return {
    fullname: `${displayName} ${id}`,
    email: `${prefix}-${id}@example.com`,
    username: `${usernamePrefix}_${id}`,
    password: testData.TEST_USER.password
  };
}

export function createReplaceAccountData(user) {
  return {
    fullname: 'Updated User',
    email: `updated-${user.email}`,
    username: `updated_${user.username}`
  };
}

export function createPatchAccountData(user) {
  return {
    fullname: 'Updated User',
    email: `updated-${user.email}`
  };
}

export function createInvalidLoginData() {
  return createUniqueUserData('invalid');
}
