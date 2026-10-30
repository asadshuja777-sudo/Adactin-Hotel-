
import { test, expect } from '../fixtures/testSetup.js';
import LoginPage from '../pages/LoginPage';
import testData from '../testData/testData.json';
import { APP_URLS, getLoginCredentials } from '../utilities/config.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Login Page Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  const validUsers = [
    { ...getLoginCredentials(), ExpectedMsg: 'Welcome to Adactin Group of Hotels' },
    ...testData.validUsers,
  ];

  for (const user of validUsers) {
    test(`Login with ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.gotoURL();
      await loginPage.login(user);

      if (user.ExpectedMsg) {
        await test.step('Verify successful login message', async () => {
          await expect(loginPage.message).toContainText(user.ExpectedMsg);
          await attachStepScreenshot(page, 'Assertion - Successful login message');
        });
      } else {
        await test.step('Verify successful login navigation', async () => {
          await expect(page).toHaveURL(APP_URLS.searchHotel);
          await attachStepScreenshot(page, 'Assertion - Search hotel page URL');
        });
      }
    });
  }

  for (const scenario of testData.invalidLoginScenarios) {
    test(`Reject login - ${scenario.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.gotoURL();
      await loginPage.login(scenario);

      await test.step('Verify invalid login does not navigate to search', async () => {
        await expect(page).not.toHaveURL(APP_URLS.searchHotel);
        await attachStepScreenshot(page, 'Assertion - Invalid login stays on login page');
      });

      await test.step('Verify username field is visible', async () => {
        await expect(loginPage.username).toBeVisible();
        await attachStepScreenshot(page, 'Assertion - Username field is visible');
      });

      await test.step('Verify password field is visible', async () => {
        await expect(loginPage.password).toBeVisible();
        await attachStepScreenshot(page, 'Assertion - Password field is visible');
      });

      await test.step('Verify login button is visible', async () => {
        await expect(loginPage.loginButton).toBeVisible();
        await attachStepScreenshot(page, 'Assertion - Login button is visible');
      });
    });
  }

});
