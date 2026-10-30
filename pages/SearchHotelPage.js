import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utilities/screenshot.js';
const { APP_URLS } = require('../utilities/config.js');

class SearchHotelPage {
  constructor(page) {
    this.page = page;
    this.location = page.locator('#location');
    this.hotel = page.locator('#hotels');
    this.roomType = page.locator('#room_type');
    this.numberOfRooms = page.locator('#room_nos');
    this.checkIn = page.locator('#datepick_in');
    this.checkOut = page.locator('#datepick_out');
    this.adults = page.locator('#adult_room');
    this.children = page.locator('#child_room');
    this.searchButton = page.locator('#Submit');
    this.resetButton = page.locator('#Reset');
  }

  async gotoURL() {
    await test.step('Open search page', async () => {
      await this.page.goto(APP_URLS.searchHotel);
      await attachStepScreenshot(this.page, 'Search - After page navigation');
    });
  }

  async searchHotel(details) {
    await test.step('Select location', async () => {
      await this.location.selectOption(details.location);
      await attachStepScreenshot(this.page, 'Search - After location');
    });

    await test.step('Select hotel', async () => {
      await this.hotel.selectOption(details.hotel);
      await attachStepScreenshot(this.page, 'Search - After hotel');
    });

    await test.step('Select room type', async () => {
      await this.roomType.selectOption(details.roomType);
      await attachStepScreenshot(this.page, 'Search - After room type');
    });

    await test.step('Select number of rooms', async () => {
      await this.numberOfRooms.selectOption(details.rooms);
      await attachStepScreenshot(this.page, 'Search - After number of rooms');
    });

    await test.step('Enter check-in date', async () => {
      await this.checkIn.fill(details.checkIn);
      await attachStepScreenshot(this.page, 'Search - After check-in date');
    });

    await test.step('Enter check-out date', async () => {
      await this.checkOut.fill(details.checkOut);
      await attachStepScreenshot(this.page, 'Search - After check-out date');
    });

    await test.step('Select number of adults', async () => {
      await this.adults.selectOption(details.adults);
      await attachStepScreenshot(this.page, 'Search - After number of adults');
    });

    await test.step('Select number of children', async () => {
      await this.children.selectOption(details.children);
      await attachStepScreenshot(this.page, 'Search - After number of children');
    });

    await test.step('Click Search', async () => {
      await this.searchButton.click();
      await attachStepScreenshot(this.page, 'Search - After search click');
    });
  }
}

export default SearchHotelPage;
