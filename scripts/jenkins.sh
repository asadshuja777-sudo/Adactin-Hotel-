#!/bin/sh
set -euo pipefail

: "${APP_URL:?Set APP_URL in the Jenkins job environment.}"
: "${APP_USERNAME:?Bind the APP_USERNAME Jenkins credential to this environment variable.}"
: "${APP_PASSWORD:?Bind the APP_PASSWORD Jenkins credential to this environment variable.}"

npm ci
npx playwright install --with-deps
npx playwright test
