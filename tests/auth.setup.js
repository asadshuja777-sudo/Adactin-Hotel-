import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
const { getLoginCredentials } = require('../utilities/config.js');
import fs from 'fs';

test('Login and save session', async ({ page }) => {

    const login = new LoginPage(page);

    await login.gotoURL();

    await login.login(getLoginCredentials());

    await expect(login.message).toBeVisible();

    // Create folder if it doesn't exist
    fs.mkdirSync('playwright/.auth', { recursive: true });

    // Save login session
    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});