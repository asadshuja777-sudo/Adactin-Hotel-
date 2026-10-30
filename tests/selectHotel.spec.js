
import { test, expect } from '../fixtures/testSetup.js';
import SearchHotelPage from '../pages/SearchHotelPage';
import SelectHotelPage from '../pages/SelectHotelPage';
import searchData from '../testData.json/hotelSearchData.json';
const { APP_URLS } = require('../utilities/config.js');
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Select Hotel Page Tests', () => {

  for (const scenario of searchData.scenarios) {
    test(`Select first hotel - ${scenario.name}`, async ({ page }) => {
      const searchPage = new SearchHotelPage(page);
      const selectPage = new SelectHotelPage(page);

      await searchPage.gotoURL();
      await searchPage.searchHotel(scenario.details);

      await test.step('Verify a hotel is available to select', async () => {
        await expect(selectPage.firstHotelRadio).toBeVisible();
        await attachStepScreenshot(page, 'Assertion - First hotel is available');
      });
      await selectPage.selectFirstHotel();

      await test.step('Verify navigation to the booking page', async () => {
        await expect(page).toHaveURL(APP_URLS.bookHotel);
        await attachStepScreenshot(page, 'Assertion - Booking page URL');
      });
    });
  }

  test('Do not continue without selecting a hotel', async ({ page }) => {
    const searchPage = new SearchHotelPage(page);
    const selectPage = new SelectHotelPage(page);

    await searchPage.gotoURL();
    await searchPage.searchHotel(searchData.scenarios[0].details);
    await test.step('Verify a hotel is available before continuing', async () => {
      await expect(selectPage.firstHotelRadio).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - First hotel remains available');
    });

    await selectPage.continueButton.click();

    await test.step('Verify navigation is blocked without a selection', async () => {
      await expect(page).not.toHaveURL(APP_URLS.bookHotel);
      await attachStepScreenshot(page, 'Assertion - Booking page is not opened');
    });

    await test.step('Verify the hotel remains available for selection', async () => {
      await expect(selectPage.firstHotelRadio).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - First hotel remains available');
    });
  });

  test('Display the hotel that matches the search criteria', async ({ page }) => {
    const searchPage = new SearchHotelPage(page);
    const selectPage = new SelectHotelPage(page);
    const scenario = searchData.scenarios[0];

    await searchPage.gotoURL();
    await searchPage.searchHotel(scenario.details);

    await test.step('Verify the displayed hotel matches the search', async () => {
      await expect(selectPage.hotelNames.first()).toHaveValue(scenario.details.hotel);
      await attachStepScreenshot(page, 'Assertion - Search result matches selected hotel');
    });
  });

  test('Leave the hotel unselected until the user chooses it', async ({ page }) => {
    const searchPage = new SearchHotelPage(page);
    const selectPage = new SelectHotelPage(page);

    await searchPage.gotoURL();
    await searchPage.searchHotel(searchData.scenarios[0].details);

    await test.step('Verify the first hotel is not selected by default', async () => {
      await expect(selectPage.firstHotelRadio).not.toBeChecked();
      await attachStepScreenshot(page, 'Assertion - Hotel is initially unselected');
    });
  });

  test('Mark the hotel as selected before continuing', async ({ page }) => {
    const searchPage = new SearchHotelPage(page);
    const selectPage = new SelectHotelPage(page);

    await searchPage.gotoURL();
    await searchPage.searchHotel(searchData.scenarios[0].details);
    await selectPage.firstHotelRadio.check();

    await test.step('Verify the first hotel is selected', async () => {
      await expect(selectPage.firstHotelRadio).toBeChecked();
      await attachStepScreenshot(page, 'Assertion - First hotel is selected');
    });
  });
});
