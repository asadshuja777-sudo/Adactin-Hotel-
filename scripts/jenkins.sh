#!/bin/sh
set -eu

: "${APP_URL:?APP_URL is required. Set it in the Jenkins job environment.}"

export CI=true

npm ci
npx playwright install chromium firefox webkit
npx playwright test
