---
sidebar_position: 3
---

# Environments

The Just Driving platform uses standard Laravel environments to separate local development from live traffic and external integrations. Each environment is configured through its own `.env` file (or server-level environment variables) while sharing the same Laravel codebase.

## Local (development)

- Purpose: Day-to-day development, debugging, and testing new features.
- Typical settings:
  - `APP_ENV=local`
  - `APP_DEBUG=true`
  - `APP_URL=http://just-driving.test` (for example, via Laravel Herd)
  - `DB_CONNECTION=mysql` pointing to a local MySQL instance
  - Test or sandbox credentials for any external services (never production keys).
- Characteristics:
  - Verbose logging and error pages enabled.
  - Caching, queues, and mail often use simple/local drivers (e.g. `log`, `sync`).

## Staging / test (optional but recommended)

- Purpose: Pre-production environment that mirrors production as closely as possible.
- Typical settings:
  - `APP_ENV=staging`
  - `APP_DEBUG=false` (or limited)
  - `APP_URL=https://staging.just-driving.example`
  - MySQL database separate from production, with safe test data.
  - Staging/sandbox keys for external services.
- Characteristics:
  - Same PHP, MySQL, and build setup as production.
  - Used to validate releases, migrations, and integrations before going live.

## Production

- Purpose: Live environment for real driving schools and students.
- Typical settings:
  - `APP_ENV=production`
  - `APP_DEBUG=false`
  - `APP_URL=https://just-driving.dk` (or your actual live domain)
  - MySQL instance with production data and backups.
  - Production credentials for all external integrations.
- Characteristics:
  - Full optimizations enabled (config cache, route cache, optimized builds).
  - Restricted access to logs and diagnostics.
  - Strict security and backup/monitoring in place.

## Environment configuration notes

- Each environment uses its own `.env` values, but all share the same `config/*.php` files.
- Never commit real secrets (API keys, passwords) to the repository; keep them only in environment variables.
- When documenting the project, you can add example files such as `.env.local.example`, `.env.staging.example`, and `.env.production.example` to show which variables must be set in each environment.


