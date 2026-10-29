import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class BookHotelPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.address = page.locator('#address');
    this.creditCardNumber = page.locator('#cc_num');
    this.creditCardType = page.locator('#cc_type');
    this.expiryMonth = page.locator('#cc_exp_month');
    this.expiryYear = page.locator('#cc_exp_year');
    this.cvv = page.locator('#cc_cvv');
    this.bookNowButton = page.locator('#book_now');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('.reg_error');
  }

  async enterBookingDetails(details) {
    await test.step('Enter first name', async () => {
      await this.firstName.fill(details.firstName);
      await attachStepScreenshot(this.page, 'Book - After first name');
    });

    await test.step('Enter last name', async () => {
      await this.lastName.fill(details.lastName);
      await attachStepScreenshot(this.page, 'Book - After last name');
    });

    await test.step('Enter billing address', async () => {
      await this.address.fill(details.address);
      await attachStepScreenshot(this.page, 'Book - After billing address');
    });

    await test.step('Enter credit card number', async () => {
      await this.creditCardNumber.fill(details.creditCardNumber);
      await attachStepScreenshot(this.page, 'Book - After credit card number', {
        mask: [this.creditCardNumber, this.cvv],
      });
    });

    await test.step('Select credit card type', async () => {
      await this.creditCardType.selectOption(details.creditCardType);
      await attachStepScreenshot(this.page, 'Book - After credit card type', {
        mask: [this.creditCardNumber, this.cvv],
      });
    });

    await test.step('Select expiry month', async () => {
      await this.expiryMonth.selectOption(details.expiryMonth);
      await attachStepScreenshot(this.page, 'Book - After expiry month', {
        mask: [this.creditCardNumber, this.cvv],
      });
    });

    await test.step('Select expiry year', async () => {
      await this.expiryYear.selectOption(details.expiryYear);
      await attachStepScreenshot(this.page, 'Book - After expiry year', {
        mask: [this.creditCardNumber, this.cvv],
      });
    });

    await test.step('Enter CVV', async () => {
      await this.cvv.fill(details.cvv);
      await attachStepScreenshot(this.page, 'Book - After CVV', {
        mask: [this.creditCardNumber, this.cvv],
      });
    });
  }

  async bookNow() {
    await test.step('Click Book Now', async () => {
      await this.bookNowButton.click();
      await attachStepScreenshot(this.page, 'Book 03 - After Book Now click');
    });
  }
}

export default BookHotelPage;
