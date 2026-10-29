import { test, expect } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

import SearchHotelPage from '../pages/SearchHotelPage.js';
import SelectHotelPage from '../pages/SelectHotelPage.js';
import BookHotelPage from '../pages/BookHotelPage.js';
import BookingConfirmationPage from '../pages/BookingConfirmationPage.js';
import searchData from '../testdata/hotelSearchData.json';
import bookingData from '../testdata/bookingDetailsData.json';
import { hasLoginCredentials } from '../utilities/config.js';

test.skip(!hasLoginCredentials(), 'Set APP_USERNAME and APP_PASSWORD to run authenticated tests.');

for (const searchScenario of searchData.scenarios) {
  for (const bookingScenario of bookingData.scenarios) {
    test(`Complete hotel booking - ${searchScenario.name} - ${bookingScenario.name}`, async ({ page }) => {
      test.setTimeout(90_000);
      
       
      const search = new SearchHotelPage(page);
      await search.gotoURL();
      await search.searchHotel(searchScenario.details);

      const select = new SelectHotelPage(page);
      await select.selectFirstHotel();

      const booking = new BookHotelPage(page);
      await booking.enterBookingDetails(bookingScenario.details);
      await booking.bookNow();

      const confirmation = new BookingConfirmationPage(page);
      const orderNumber = await confirmation.getOrderNumber();

      await test.step('Verify order number is created', async () => {
        await expect(orderNumber).not.toBe('');
        await attachStepScreenshot(page, 'Assertion - Order number is created');
      });
    });
  }
}

test('Reject booking when the first name is missing', async ({ page }) => {
  const search = new SearchHotelPage(page);
  await search.gotoURL();
  await search.searchHotel(searchData.scenarios[0].details);

  const select = new SelectHotelPage(page);
  await select.selectFirstHotel();

  const booking = new BookHotelPage(page);
  await booking.enterBookingDetails({
    ...bookingData.scenarios[0].details,
    firstName: '',
  });

  await booking.bookNow();

  await test.step('Verify validation message is shown', async () => {
    await expect(page.getByText('Please Enter your First Name', { exact: true })).toBeVisible();
    await attachStepScreenshot(page, 'Assertion - Validation message is visible');
  });

  await test.step('Verify first-name field remains visible', async () => {
    await expect(booking.firstName).toBeVisible();
    await attachStepScreenshot(page, 'Assertion - First-name field is visible');
  });
});
