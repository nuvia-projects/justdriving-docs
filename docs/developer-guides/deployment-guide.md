---
sidebar_position: 3
---

# Deployment Guide

This guide describes how to deploy Just Driving safely to a production environment. It focuses on the steps and checks needed for a typical Laravel-based stack with queues, scheduled jobs, and external integrations.

The same principles apply whether you deploy manually via SSH, through a CI/CD pipeline, or using a hosting panel.

## Environments

Just Driving should run in at least these environments:

- Local development – for day‑to‑day coding and feature work.
- Staging – mirrors production as closely as possible for final testing.
- Production – live system for real schools and students.

Each environment has its own configuration (database, caches, mail/SMS/payment credentials) and should not share sensitive secrets.

## Pre‑deployment checklist

Before deploying to production:

- All tests for the changed modules pass.
- Database migrations have been reviewed:
  - No destructive operations without a plan (dropping columns, large data changes).
  - Long‑running migrations are tested on realistic data where possible.
- External integrations are configured for the target environment:
  - Payment gateway keys (test vs live).
  - Email and SMS providers.
  - Any theory or discovery platform integrations.
- A backup or rollback strategy exists:
  - Recent database backup.
  - Ability to roll back to the previous application version if needed.

## Standard deployment steps

A typical deployment consists of:

1. Fetch the new code  
   - Pull or deploy the new version from version control.  
   - Ensure you are on the intended branch/tag.

2. Install and update dependencies  
   - Update backend dependencies.  
   - Update frontend assets if they are built on the server (or upload built assets if built in CI).

3. Run database migrations  
   - Apply new migrations once per environment.  
   - Monitor for slow or failing migrations and be ready to intervene.

4. Optimize configuration and caches  
   - Reload configuration, routes, and views so the app runs with the latest settings.  
   - Clear and rebuild caches if needed.

5. Restart long‑running processes  
   - Queue workers.  
   - Horizon or equivalent process managers.  
   - Any websocket or real‑time services if used.

6. Health check  
   - Confirm the app responds correctly on the main URL.  
   - Verify critical flows (login, key dashboards) load without errors.

These steps can be scripted or automated to reduce mistakes and keep deployments repeatable.

## Zero‑downtime considerations

To avoid interruptions for users during deployment:

- Use a process manager or supervisor that:
  - Starts new worker processes using the new code.
  - Stops old workers gracefully.  
- Avoid clearing caches or restarting services in a way that causes long pauses.  
- Where supported, use atomic symlink switches or similar strategies so the app directory changes in one step.

If your hosting setup does not support full zero‑downtime deployment, aim to keep maintenance windows short and schedule deployments during low‑traffic periods.

## Configuration and secrets

All environment‑specific settings and secrets should be:

- Stored outside the codebase (for example, environment variables or secure parameter stores).
- Different per environment:
  - Separate databases.
  - Separate mail/SMS/payment credentials.
  - Separate keys for external APIs.
- Documented so new environments can be brought up consistently.

Never commit secrets to version control. When adding a new integration or config value, update:

- The environment configuration for each environment.
- Any deployment or provisioning scripts that need to set the new value.

## Queues, schedules, and background jobs

Just Driving relies on background jobs and scheduled tasks for:

- Sending emails and SMS.
- Processing external webhooks.
- Running regular clean‑ups or reports.

For each environment:

- Ensure queue workers are running and supervised (so they restart on failure).
- Ensure the task scheduler (for example, a cron entry) is configured to trigger scheduled tasks at the expected interval.
- After deployment, confirm that:
  - New jobs are being processed.
  - Scheduled tasks are still running (for example, daily reminders, balance updates).

If you change queue configurations or add new job types, update worker and scheduler configuration accordingly.

## Rollback and incident handling

If a deployment causes problems:

- Be ready to roll back quickly:
  - Redeploy the previous known‑good version of the code.
  - If necessary, roll back database changes or apply corrective migrations.
- Communicate with affected users where appropriate (for example, if bookings or payments were temporarily affected).
- After stabilizing:
  - Review logs and monitoring to understand what went wrong.
  - Add or improve tests to prevent the same issue from happening again.
  - Adjust the deployment or migration process if needed.

Keeping a simple, well‑documented deployment procedure and rollback plan reduces stress and downtime when changes go wrong.

## Deployment to new schools or regions

When onboarding a new school or hosting environment:

- Start from the staging or production configuration as a template.
- Verify:
  - Domains and SSL certificates.
  - Timezone, locale, and currency settings.
  - Integrations required for that school (payments, SMS, email, external platforms).
- Run through key workflows end‑to‑end:
  - Registration.
  - Bookings.
  - Invoices and payments.
  - Notifications.

Only after all critical flows work as expected should the environment be opened to real users.
