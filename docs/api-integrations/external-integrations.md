---
sidebar_position: 2
---

# External Integrations

This page describes how Just Driving integrates with external services and platforms. These integrations provide payments, messaging, and extended learning/discovery features beyond the core application.

The main external integrations are:

- Stripe – payments
- Twilio – SMS
- SparkPost and Mailtrap – email delivery
- e-teori.dk – theory content platform
- findkoreskole.dk – public school discovery and lead generation

## Stripe (payments)

Stripe is used to handle online payments from students.

### Typical flows

- Creating payment links/intents when a student pays an invoice online.
- Receiving webhook events for successful payments, failed charges, and refunds.
- Updating internal records (student payments, invoices, balances) based on webhook events.

### Configuration

- API keys (test and live) are stored in `.env` and used via Laravel config:
  - Public key
  - Secret key
  - Webhook signing secret
- Separate keys are used for test and production environments.

### Implementation notes

- Payment flows are usually initiated from the web UI (student portal) and completed via Stripe’s hosted pages or JS SDK.
- Webhook endpoints in the app:
  - Validate signatures using the webhook secret.
  - Map Stripe objects (e.g. `payment_intent`, `charge`) to internal invoices and payments.
  - Handle idempotency to avoid double‑processing events.

## Twilio (SMS)

Twilio is used to send SMS notifications to students and teachers.

### Typical flows

- Booking confirmations and reminders.
- Last‑minute changes or cancellations.
- Important school notifications.

### Configuration

- Twilio account SID, auth token, and sender number are stored in `.env`.
- SMS sending code reads configuration via Laravel’s config system.

### Implementation notes

- SMS sending is generally wrapped in queued jobs so HTTP requests do not wait for Twilio.
- Error handling and logging are important to detect delivery issues and API failures.
- Some environments (development) may disable real SMS or route to test numbers only.

## SparkPost and Mailtrap (email)

Email is used for confirmations, reminders, onboarding, and system communication.

### SparkPost (production)

- Used as the primary production email provider.
- Configured either via SMTP or HTTP API using credentials stored in `.env`.
- Handles high‑volume and reliable delivery.

### Mailtrap (development/test)

- Used in non‑production environments to catch emails in a safe inbox.
- Ensures no real users receive test emails.
- SMTP credentials are stored in `.env` for local development and staging.

### Implementation notes

- Laravel’s mail system is used to send emails with Blade templates.
- Different environments select different mailers via config (Mailtrap for dev, SparkPost for prod).
- Queued jobs are typically used to send emails asynchronously.

## e-teori.dk (theory content)

e-teori.dk provides online theory content and tests that integrate with Just Driving.

### Typical flows

- Provisioning or linking students so they can access theory content.
- (Optional) Syncing or importing student progress, results, or completion status.

### Configuration

- API keys/tokens and base URLs are stored in `.env` and referenced via config.
- Each school may have its own integration settings (e.g. which package is available).

### Implementation notes

- Calls to e-teori.dk should be isolated in service classes so controllers/workflows remain simple.
- Network requests should be retried or handled via jobs when appropriate.
- Any data pulled back (results, progress) should be mapped to internal tables for reporting.

## findkoreskole.dk (school discovery)

findkoreskole.dk is used to make schools discoverable and to generate leads.

### Typical flows

- Publishing or syncing school data (name, address, offerings, prices).
- Receiving leads or registrations from findkoreskole.dk and mapping them to schools and students.

### Configuration

- API credentials and endpoints are stored in `.env` and exposed via config.
- Some schools may opt in/out of exposure on findkoreskole.dk.

### Implementation notes

- Outgoing sync jobs should be idempotent to avoid duplicates.
- Incoming leads/registrations should be validated and linked to the correct school.
- Logging is useful to trace lead flow and troubleshoot integration issues.

## General integration guidelines

When working with any external integration:

- **Configuration**
  - Never hardcode secrets; always use environment variables and config files.
  - Keep separate credentials for development/test and production.

- **Error handling**
  - Expect failures from external APIs (timeouts, 4xx/5xx errors).
  - Log errors and, where appropriate, retry via jobs or allow manual retry.

- **Security**
  - Validate incoming webhook signatures and payloads (Stripe, others).
  - Avoid exposing sensitive internal IDs or data in public‑facing endpoints.

- **Testing**
  - Use provider test modes (Stripe test keys, Mailtrap, Twilio test credentials) in non‑production environments.
  - Add integration tests or manual test checklists for critical flows (payments, signups, SMS/email notifications).

