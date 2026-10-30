#!/bin/sh
set -eu

: "${APP_URL:?APP_URL is required. Set it in the Jenkins job environment.}"
: "${APP_USERNAME:?APP_USERNAME is required. Bind Jenkins credentials to this environment variable.}"
: "${APP_PASSWORD:?APP_PASSWORD is required. Bind Jenkins credentials to this environment variable.}"

export CI=true

npm ci
npx playwright install chromium firefox webkit
npx playwright test
