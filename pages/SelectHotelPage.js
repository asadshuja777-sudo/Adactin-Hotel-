import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class SelectHotelPage {
  constructor(page) {
    this.page = page;
    this.firstHotelRadio = page.locator('#radiobutton_0');
    this.continueButton = page.locator('#continue');
    this.hotelNames = page.locator('input[name="hotel_name_0"]');
  }

  async selectFirstHotel() {
    await test.step('Select first hotel', async () => {
      await this.firstHotelRadio.check();
      await attachStepScreenshot(this.page, 'Select 01 - After selecting first hotel');
    });

    await test.step('Click Continue', async () => {
      await this.continueButton.click();
      await attachStepScreenshot(this.page, 'Select 02 - After continue click');
    });
  }
}

export default SelectHotelPage;
