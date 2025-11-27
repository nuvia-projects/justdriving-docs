---
sidebar_position: 5
---

# Deployment and Hosting

This page describes how the Just Driving platform is deployed and hosted. It focuses on the typical environment layout, core services, and deployment workflow, so new developers understand where their code runs and what to be careful about when deploying changes.

## Environments

Just Driving is typically deployed to multiple environments:

- **Local** – developer machines using Laravel Herd, MySQL, Redis, Mailtrap, Twilio sandbox, and Stripe test keys.
- **Staging** – optional environment used to test changes with production‑like configuration before going live.
- **Production** – live environment used by real schools and students.

Each environment has its own `.env` configuration, especially for database, email, SMS, and payment provider credentials.

## Hosting stack

The production stack follows a standard Laravel deployment pattern:

- **Web server** (for example, Nginx or Apache) serving the Laravel application from the `public/` directory behind PHP‑FPM.
- **PHP 7.x** running Laravel 8.
- **MySQL** as the primary database for application data.
- **Redis** for queues (and optionally caching).
- **Supervisor or a similar process manager** to keep queue workers running (for example, `php artisan queue:work`).

Static assets (compiled JavaScript and CSS) are built during deployment and served from the `public/` directory.

## Deployment workflow

A typical deployment workflow looks like this:

1. **Prepare code**  
   - Merge changes into the main branch designated for deployment.
   - Tag a release if your process uses version tags.

2. **Update code on the server**  
   - Pull the latest code from the repository on the target server (or deploy an artifact).
   - Install PHP dependencies with `composer install --no-dev --optimize-autoloader`.
   - Install/build frontend assets (for example, `npm ci` and `npm run prod`, or use pre-built assets).

3. **Run database changes**  
   - Run `php artisan migrate` to apply any new database migrations.

4. **Optimize application**  
   - Run Laravel optimization commands, such as:
     ```
     php artisan config:cache
     php artisan route:cache
     php artisan view:cache
     ```

5. **Restart workers and services**  
   - Restart queue workers (for example, via Supervisor) so they load the new code.
   - Reload/restart the web server if needed.

## Configuration and secrets

Sensitive configuration is never committed to the repository. Instead:

- Each server has its own `.env` file with:
  - Database credentials
  - Redis connection details
  - Mail provider credentials (SparkPost in production, Mailtrap in development)
  - Twilio credentials for SMS
  - Stripe API keys and webhook secrets
- Application configuration is derived from these environment variables via Laravel’s `config/` files.

Changes to environment configuration should be coordinated carefully and, if possible, documented alongside deployment notes.

## Logging and monitoring

The application writes logs to the standard Laravel log files (for example, in `storage/logs/`). In production, these logs should be:

- Rotated and retained for debugging issues.
- Monitored for errors (for example, using external log aggregation or alerting tools).

Queue workers and scheduled tasks (if any) should also be monitored to ensure they are running and processing jobs correctly.

