import { test, expect } from '../fixtures/testSetup.js';
import LoginPage from '../pages/LoginPage.js';
import LogoutPage from '../pages/LogoutPage.js';
import { APP_URLS, getLoginCredentials } from '../utilities/config.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Logout Page Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Successfully log out the user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const logoutPage = new LogoutPage(page);

    await loginPage.gotoURL();
    await loginPage.login(getLoginCredentials());

    await test.step('Verify login succeeds', async () => {
      await expect(page).toHaveURL(APP_URLS.searchHotel);
      await attachStepScreenshot(page, 'Assertion - Search hotel page URL');
    });

    await logoutPage.logout();

    await test.step('Verify logout confirmation is displayed', async () => {
      await expect(page).toHaveURL(APP_URLS.logout);
      await attachStepScreenshot(page, 'Assertion - Logout page URL');

      await expect(logoutPage.logoutMessage).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Logout message is visible');

      await expect(logoutPage.logoutMessage).toContainText(
        'You have successfully logged out'
      );
      await attachStepScreenshot(page, 'Assertion - Logout message text');
    });

    await test.step('Verify the login-again link is displayed', async () => {
      await expect(logoutPage.loginAgainLink).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Login again link is visible');

      await expect(logoutPage.loginAgainLink).toContainText(
        'Click here to login again'
      );
      await attachStepScreenshot(page, 'Assertion - Login again link text');
    });
  });
});
