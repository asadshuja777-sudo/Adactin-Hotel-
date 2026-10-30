import { test, expect } from '../fixtures/testSetup.js';
import SearchHotelPage from '../pages/SearchHotelPage.js';
import SelectHotelPage from '../pages/SelectHotelPage.js';
import BookHotelPage from '../pages/BookHotelPage.js';
import BookingConfirmationPage from '../pages/BookingConfirmationPage.js';
import searchData from '../testData/hotelSearchData.json';
import bookingData from '../testData/bookingDetailsData.json';
const { APP_URLS } = require('../utilities/config.js');
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Booking Confirmation Page Tests', () => {


  for (const searchScenario of searchData.scenarios) {
    for (const bookingScenario of bookingData.scenarios) {
      test(`Verify confirmation - ${searchScenario.name} - ${bookingScenario.name}`, async ({ page }) => {
        test.setTimeout(90_000);

        const searchPage = new SearchHotelPage(page);
        const selectPage = new SelectHotelPage(page);
        const bookingPage = new BookHotelPage(page);
        const confirmationPage = new BookingConfirmationPage(page);

        await searchPage.gotoURL();

        await searchPage.searchHotel(searchScenario.details);
        await selectPage.selectFirstHotel();

        await bookingPage.enterBookingDetails(bookingScenario.details);
        await bookingPage.bookNow();

        await test.step('Verify the confirmation order number is visible', async () => {
          await expect(confirmationPage.orderNumber).toBeVisible({ timeout: 50000 });
          await attachStepScreenshot(page, 'Assertion - Order number is visible');
        });

        const orderNumber = await confirmationPage.getOrderNumber();
        await test.step('Verify the order number is not empty', async () => {
          expect(orderNumber).not.toBe('');
          await attachStepScreenshot(page, 'Assertion - Order number is not empty');
        });

        await confirmationPage.openMyItinerary();

        await test.step('Verify navigation to the itinerary page', async () => {
          await expect(page).toHaveURL(APP_URLS.bookedItinerary, { timeout: 60000 });
          await attachStepScreenshot(page, 'Assertion - Itinerary page URL');
        });

        await test.step('Verify the first-name column is visible', async () => {
          await expect(confirmationPage.firstNameCell).toBeVisible();
          await attachStepScreenshot(page, 'Assertion - First-name column is visible');
        });

        await test.step('Verify the last-name column is visible', async () => {
          await expect(confirmationPage.lastNameCell).toBeVisible();
          await attachStepScreenshot(page, 'Assertion - Last-name column is visible');
        });
      });
    }
  }
});