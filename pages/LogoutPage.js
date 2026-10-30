import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utilities/screenshot.js';
const { APP_PATHS } = require('../utilities/config.js');

class LogoutPage {
  constructor(page) {
    this.page = page;
    this.logoutLink = page.locator(`a[href="${APP_PATHS.logout}"]`);
    this.logoutMessage = page.locator('td.reg_success');
    this.loginAgainLink = page.locator(`a[href="${APP_PATHS.login}"]`);
  }

  async logout() {
    await test.step('Click Logout', async () => {
      await this.logoutLink.click();
      await attachStepScreenshot(this.page, 'Logout - After logout click');
    });
  }
}

export default LogoutPage;
