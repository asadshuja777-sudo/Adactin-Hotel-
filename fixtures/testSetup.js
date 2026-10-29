import { test as base, expect } from '@playwright/test';
import BasePage from '../pages/BasePage.js';
import { attachScreenshotAfterEach } from '../utilities/screenshot.js';
import { APP_URL } from '../utilities/config.js';
let hookPage;


base.beforeAll(async ({ browser }) => {
  hookPage = await browser.newPage();
  await hookPage.goto(APP_URL, { waitUntil: 'domcontentloaded' });
  await hookPage.reload({ waitUntil: 'domcontentloaded' });
});

base.afterAll(async () => {
  if (hookPage) {
    await hookPage.close();
  }
});

base.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.navigate(APP_URL);
});

base.afterEach(async ({ page }, testInfo) => {
  await attachScreenshotAfterEach(page, testInfo);
});

export const test = base;
export { expect };
