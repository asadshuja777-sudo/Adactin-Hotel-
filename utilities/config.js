
import 'dotenv/config';

const configuredAppUrl = process.env.APP_URL ;

export const APP_URL = `${configuredAppUrl.replace(/\/+$/, '')}/`;

export const APP_PATHS = Object.freeze({
  login: 'index.php',
  searchHotel: 'SearchHotel.php',
  logout: 'Logout.php',
  bookHotel: 'BookHotel.php',
  bookedItinerary: 'BookedItinerary.php',
});

export const APP_URLS = Object.freeze({
  login: APP_URL,
  searchHotel: new URL(APP_PATHS.searchHotel, APP_URL).href,
  logout: new URL(APP_PATHS.logout, APP_URL).href,
  bookHotel: new URL(APP_PATHS.bookHotel, APP_URL).href,
  bookedItinerary: new URL(APP_PATHS.bookedItinerary, APP_URL).href,
});

export function hasLoginCredentials() {
  return !!(process.env.APP_USERNAME && process.env.APP_PASSWORD);
}

export function getLoginCredentials() {
  const username = process.env.APP_USERNAME;
  const password = process.env.APP_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'Set APP_USERNAME and APP_PASSWORD in .env or as environment variables before running authenticated tests.'
    );
  }

  return { username, password };
}