# Running the tests in Jenkins

The test suite requires the application URL and login credentials as environment
variables. The repository's `.env` file is intentionally ignored by Git, so
Jenkins must provide these values itself:

- `APP_URL`: base URL of the Adactin application.
- `APP_USERNAME` and `APP_PASSWORD`: application login credentials. Store these
  as Jenkins credentials and bind them to environment variables with these names;
  do not put credentials in the job's shell command or source code.

In the job configuration, set `APP_URL`, bind the two credentials, and use this
as the **Execute shell** build step:

```sh
bash scripts/jenkins.sh
```

The script installs Node dependencies, installs Playwright browsers and their
Linux dependencies, then runs the tests. The Jenkins agent must be allowed to
install the required Linux packages (for example, run the build in a suitable
Playwright container or provision the agent with Playwright's Linux
dependencies). The script stops on the first failure so Jenkins reports a
failed build instead of archiving a report and marking the job successful.
