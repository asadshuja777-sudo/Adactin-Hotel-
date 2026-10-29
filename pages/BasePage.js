import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class BasePage {

constructor(page) {

    this.page = page;

}
async navigate(url) {

    await test.step('Open page', async () => {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await attachStepScreenshot(this.page, 'Page - After navigation');
    });

}

}
export default BasePage;