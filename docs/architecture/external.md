---
sidebar_position: 4
---

# External systems

The Just Driving platform can integrate with several categories of external systems to support real-world operations like payments, messaging, and bookkeeping. This section describes the integration points at a high level so you can plug in specific providers (Stripe, Twilio, local SMS gateways, accounting tools, etc.) as needed.

## Payment providers

- Used for: collecting lesson fees, deposits, package payments, or subscription-style charges.
- Typical options: Stripe, PayPal, local payment gateways, or provider-specific SDKs.
- Integration pattern:
  - Backend: payment service class (e.g. `App\Services\Payments\PaymentGateway`) wrapping the provider SDK and exposing methods like `createPaymentIntent`, `chargeCustomer`, `refund`, etc.
  - Frontend: checkout or payment UI (card details, wallet, etc.) calling backend endpoints.
  - Database: records for transactions, invoices, refunds, and payment status linked to bookings/students.
- Configuration:
  - API keys and secrets stored in `.env` (`PAYMENT_PROVIDER_KEY`, `PAYMENT_PROVIDER_SECRET`, etc.).
  - Optional webhook endpoint (e.g. `/webhook/payments`) to receive asynchronous updates (success, failure, refund).

## SMS providers

- Used for: lesson reminders, booking confirmations, cancellations, and important announcements to students/instructors.
- Typical options: Twilio, local SMS gateways, or an SMS aggregation service.
- Integration pattern:
  - Laravel notifications or a dedicated SMS service class (e.g. `App\Services\Sms\SmsSender`).
  - Single interface method such as `send(to, message)` which hides provider-specific details.
  - Queue jobs for sending SMS asynchronously to avoid slowing down HTTP requests.
- Configuration:
  - Provider credentials in `.env` (e.g. `SMS_PROVIDER_KEY`, `SMS_PROVIDER_SECRET`, `SMS_FROM_NUMBER`).
  - Optional per-environment toggles to disable real SMS in local/staging (`SMS_ENABLED=false` in non-prod).

## Email and notifications

- Used for: welcome emails, booking confirmations, password resets, and administrative notifications.
- Integration pattern:
  - Laravel’s mail and notification system, plus any external email service (e.g. SMTP, Mailgun, SendGrid).
  - Template-based emails stored in `resources/views/emails`.
- Configuration:
  - `.env` variables (`MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, etc.).
  - Separate settings for staging vs production to avoid mailing real users from non-production environments.

## Accounting and bookkeeping (optional)

- Used for: syncing financial data (invoices, payments, refunds) into an accounting system.
- Typical options: local accounting tools, cloud accounting (e.g. Xero, QuickBooks), or exported CSV integrations.
- Integration pattern:
  - Service class (e.g. `App\Services\Accounting\AccountingClient`) responsible for:
    - Creating or updating customers (driving schools, individual students if applicable).
    - Sending invoice/payment records or periodic summaries.
  - Scheduled commands to run sync jobs (e.g. daily, hourly).
- Configuration:
  - API credentials in `.env` (`ACCOUNTING_API_KEY`, etc.).
  - Feature flags to enable/disable accounting sync per environment.

## Design principles for external integrations

- All external systems are accessed through dedicated service classes or adapters (no raw SDK calls scattered across controllers).
- Configuration and credentials live in environment variables, never in source control.
- Webhooks (for payments or other providers) terminate in specific controllers and delegate to domain logic (e.g. updating booking payment status).
- Logging and error handling are centralized to make it easy to diagnose integration problems without exposing sensitive data.
