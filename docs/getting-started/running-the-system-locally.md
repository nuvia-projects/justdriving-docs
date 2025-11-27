---
sidebar_position: 4
---

# Running Locally

This page focuses on the day-to-day commands used to run the Just Driving application in a local development environment. It assumes you have already completed the steps in the **Dependencies** and **Environment Setup** guides.

## Starting the web application

The recommended way to run the application locally is using Laravel Herd.

1. Make sure Laravel Herd is installed and running.
2. Add a new site in Herd pointing to the project's `public/` directory, for example:

   - Project path: `/path/to/justdriving`
   - Public directory: `/path/to/justdriving/public`
   - Local domain: `justdriving.test`

3. Ensure the configured domain matches `APP_URL` in your `.env` file:
```bash
APP_URL=http://justdriving.test
```

4. Open `http://just-driving.test` in your browser to access the application.

If you prefer not to use Herd, you can alternatively run:
```bash
php artisan serve
```

and use the URL shown in the console, but Herd is the recommended approach.

## Running the queue worker

Background jobs (such as sending notifications and other asynchronous tasks) are processed via a Laravel queue worker. For local development you should have at least one worker running.

From the project root:
```bash
php artisan queue:work
```

Keep this process running in a separate terminal window or tab while you develop. If you change queue configuration or environment variables related to queues, restart the worker.

## Running frontend assets

For frontend development, you should run the asset build tool in watch mode so changes are recompiled automatically:
```bash
npm run watch
```

This will:

- Compile the CSS and JavaScript assets.
- Rebuild them when source files change.

If you just need a one-time build (for example, before a test run), you can use:
```bash
npm run dev
```


## Logging in locally

Local environments typically use seeded or test users (for example, admin, teacher, and student accounts) created by migrations, seeders, or manual setup. Because credentials can change over time, they are not hard-coded in this documentation.

To find or create users in a local environment, you can:

- Check any database seeders provided by the project.
- Use the application’s registration or admin screens to create test accounts.
- Create users manually via database tools or framework commands if necessary.

Your team’s internal onboarding or secure channels should provide the current default test credentials, if they exist. Use those credentials to log in via the normal login screens at your local application URL.




