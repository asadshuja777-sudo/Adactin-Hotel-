import { test } from '@playwright/test';

/** During-test attachment (Allure / HTML report). Only call inside a running test. */
export async function attachStepScreenshot(page, name, screenshotOptions = {}) {
  await test.info().attach(name, {
    body: await page.screenshot(screenshotOptions),
    contentType: 'image/png',
  });
}

/** Post-test screenshots for reports; call from the afterEach part of the fixture. */
export async function attachScreenshotAfterEach(page, testInfo) {
  await testInfo.attach('Final Screenshot', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('Failure Screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  }
}
