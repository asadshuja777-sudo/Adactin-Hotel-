import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utilities/screenshot.js';
import { APP_URLS } from '../utilities/config.js';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login');
        this.message = page.locator('td.welcome_menu').first();
    }

    // Still used by auth.setup.js and BASIC login.spec.js (they don't use hooks)
    async gotoURL() {
        await test.step('Open login page', async () => {
            await this.page.goto(APP_URLS.login, { waitUntil: 'domcontentloaded' });
            await attachStepScreenshot(this.page, 'Login - After page navigation');
        });
    }

    async login(user) {
        await test.step('Enter username', async () => {
            await this.username.fill(user.username);
            await attachStepScreenshot(this.page, '02 - After username');
        });

        await test.step('Enter password', async () => {
            await this.password.fill(user.password);
            await attachStepScreenshot(this.page, '03 - After password');
        });

        await test.step('Click Login', async () => {
            await this.loginButton.click();
            await attachStepScreenshot(this.page, '04 - After login click');
        });
    }
}

export default LoginPage;
