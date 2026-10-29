
import { test, expect } from '../fixtures/testSetup.js';
import SelectHotelPage from '../pages/SelectHotelPage';
import SearchHotelPage from '../pages/SearchHotelPage';
import searchData from '../testdata/hotelSearchData.json';
import { APP_URLS, hasLoginCredentials } from '../utilities/config.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe('Search Hotel Page Tests', () => {
  test.skip(!hasLoginCredentials(), 'Set APP_USERNAME and APP_PASSWORD to run authenticated tests.');



  for (const scenario of searchData.scenarios) {
    test(`Search hotels - ${scenario.name}`, async ({ page }) => {
      test.setTimeout(90_000);

      const searchPage = new SearchHotelPage(page);
      const selectPage = new SelectHotelPage(page);

      await searchPage.gotoURL();
      await searchPage.searchHotel(scenario.details);

      await test.step('Verify search results are displayed', async () => {
        await expect(selectPage.firstHotelRadio).toBeVisible();
        await attachStepScreenshot(page, 'Assertion - First hotel result is visible');
      });
      await selectPage.selectFirstHotel();
    });
  }

  test('Do not search when no location is selected', async ({ page }) => {
    const searchPage = new SearchHotelPage(page);
    const selectPage = new SelectHotelPage(page);

    await searchPage.gotoURL();
    await searchPage.searchButton.click();

    await test.step('Verify the page remains on hotel search', async () => {
      await expect(page).toHaveURL(APP_URLS.searchHotel);
      await attachStepScreenshot(page, 'Assertion - Search hotel page URL');
    });

    await test.step('Verify no results are displayed without a location', async () => {
      await expect(selectPage.firstHotelRadio).not.toBeVisible();
      await attachStepScreenshot(page, 'Assertion - No hotel results without location');
    });
  });

  test('Show the hotel search form controls', async ({ page }) => {
    const searchPage = new SearchHotelPage(page);

    await searchPage.gotoURL();

    await test.step('Verify the required search controls are visible', async () => {
      await expect(searchPage.location).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Location control is visible');

      await expect(searchPage.hotel).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Hotel control is visible');

      await expect(searchPage.roomType).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Room type control is visible');

      await expect(searchPage.checkIn).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Check-in field is visible');

      await expect(searchPage.checkOut).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Check-out field is visible');

      await expect(searchPage.searchButton).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Search button is visible');
    });
  });

  test('Return the requested hotel for the Sydney search', async ({ page }) => {
    const searchPage = new SearchHotelPage(page);
    const selectPage = new SelectHotelPage(page);
    const scenario = searchData.scenarios[0];

    await searchPage.gotoURL();
    await searchPage.searchHotel(scenario.details);

    await test.step('Verify the result matches the requested hotel', async () => {
      await expect(selectPage.hotelNames.first()).toHaveValue(scenario.details.hotel);
      await attachStepScreenshot(page, 'Assertion - Sydney result matches requested hotel');
    });

    await test.step('Verify the result can be selected', async () => {
      await expect(selectPage.firstHotelRadio).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Sydney result can be selected');
    });
  });

  test('Return the requested hotel for the Melbourne search', async ({ page }) => {
    const searchPage = new SearchHotelPage(page);
    const selectPage = new SelectHotelPage(page);
    const scenario = searchData.scenarios[1];

    await searchPage.gotoURL();
    await searchPage.searchHotel(scenario.details);

    await test.step('Verify the result matches the requested hotel', async () => {
      await expect(selectPage.hotelNames.first()).toHaveValue(scenario.details.hotel);
      await attachStepScreenshot(page, 'Assertion - Melbourne result matches requested hotel');
    });

    await test.step('Verify the result can be selected', async () => {
      await expect(selectPage.firstHotelRadio).toBeVisible();
      await attachStepScreenshot(page, 'Assertion - Melbourne result can be selected');
    });
  });
});
