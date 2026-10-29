import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class BookingConfirmationPage {
  constructor(page) {
    this.page = page;
    this.orderNumber = page.locator('#order_no');
    this.myItineraryButton = page.locator('#my_itinerary');
    this.searchHotelButton = page.locator('#search_hotel');
    this.logoutButton = page.locator('#logout');
    this.firstNameCell = page.getByRole('cell', { name: 'First Name', exact: true });
    this.lastNameCell = page.getByRole('cell', { name: 'Last Name', exact: true });
  }

  async getOrderNumber() {
    return await test.step('Read order number', async () => {
      const orderNo = (await this.orderNumber.inputValue()).trim();
      await attachStepScreenshot(this.page, 'Confirmation 01 - Order number');
      return orderNo;
    });
  }

  async openMyItinerary() {
    await test.step('Open My Itinerary', async () => {
      await this.myItineraryButton.click();
      await attachStepScreenshot(this.page, 'Confirmation 02 - After My Itinerary click');
    });
  }
}

export default BookingConfirmationPage;
