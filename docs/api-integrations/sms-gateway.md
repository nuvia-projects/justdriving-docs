---
sidebar_position: 5
---

# SMS Gateway

This page describes how Just Driving integrates with an SMS gateway to send text messages to students, teachers, and other users. The goal is to centralize SMS sending, keep provider details encapsulated, and ensure messages are sent reliably and securely.

The primary provider is an external SMS gateway service (for example, Twilio), but the design should allow other gateways to be plugged in later.

## Purpose of SMS integration

SMS is used for time‑sensitive communication, such as:

- Booking confirmations and reminders.
- Last‑minute changes or cancellations.
- Important announcements from the school.
- Occasionally, onboarding or login‑related messages if configured.

Email covers most non‑urgent communication; SMS is reserved for messages where timely delivery matters.

## SMS gateway abstraction

Just Driving treats the SMS provider as a “gateway” behind a simple contract, rather than letting application code call the provider directly.

Conceptually, the gateway is responsible for:

- Accepting message requests that include:
  - Recipient phone number.
  - Message body (usually a short, plain‑text message).
  - Context information (for example, booking ID, school ID) if needed for logging.
- Normalizing phone numbers where possible (country codes, formats) or assuming they are validated earlier.
- Submitting messages to the external SMS service.
- Returning or recording the result (sent, queued, failed).

The rest of the system talks to this gateway abstraction, not to any specific provider SDK or API. This makes it possible to:

- Swap providers without changing business logic.
- Route messages differently per environment (for example, real SMS in production, no‑op or test inbox in development).

## Typical SMS flows

Common flows that trigger SMS messages include:

- A booking is created or changed:
  - Students and/or teachers receive confirmation and reminder messages.
- A booking is cancelled:
  - A cancellation SMS is sent to affected users.
- A school sends a bulk announcement:
  - Messages are sent to a filtered group of recipients (for example, all students in a class or department).

In each case, the application:

1. Decides that an SMS should be sent based on business rules and user preferences.
2. Constructs a short, clear text message.
3. Passes the message to the SMS gateway layer, together with recipient and context.
4. Schedules the actual sending via background jobs so that web requests remain fast.

## Environments and safety

To avoid accidentally sending real SMS messages in non‑production environments:

- **Production**:
  - Uses the real SMS gateway provider and real sender numbers.
- **Development and staging**:
  - Either do not send SMS at all (messages are logged only), or
  - Use a test mode or sandbox provided by the gateway, or
  - Route all messages to a fixed test phone number.

Configuration for each environment is kept outside of source control (for example, environment variables and configuration files).

## Configuration and school settings

Two levels of configuration usually exist:

- **Global configuration**:
  - API credentials for the SMS provider (account IDs, tokens, sender numbers).
  - Default behavior (for example, which sender ID to use).

- **Per‑school settings**:
  - Whether SMS features are enabled for that school.
  - Whether specific types of SMS (reminders, cancellations, announcements) are allowed.
  - Potential sender name overrides where regulations and the provider allow it.

When sending an SMS, the system combines global settings and school‑specific settings to decide:

- Whether the message should be sent at all.
- Which sender ID or number to use.
- Which gateway configuration to apply.

## Reliability, logging, and compliance

Because SMS is used for important messages, reliability and traceability are important:

- **Logging**:
  - Each SMS attempt should be recorded with:
    - Recipient number.
    - Message type (for example, booking reminder, cancellation).
    - Timestamp.
    - Status (queued, sent, failed).
    - Error message from the provider if available.
- **Retries**:
  - Temporary failures (for example, network issues or gateway downtime) should be retried via the job/queue system when appropriate.
- **Delivery status**:
  - If the provider supports delivery receipts, the system can optionally update the status when messages are delivered or permanently fail.

From a data protection perspective:

- Store only what is necessary for audit and support.
- Avoid storing full message content for longer than needed if it contains sensitive information.
- Respect user and school preferences for opting in/out of SMS communications where applicable.

## Adding or switching SMS providers

To introduce a new provider or change the existing one, the recommended approach is:

1. Keep the public interface of the SMS gateway layer stable.
2. Implement a new provider adapter that:
   - Accepts normalized message requests from the application.
   - Translates them into the provider’s specific API or protocol.
   - Maps provider responses into a unified internal status.
3. Update configuration so that:
   - Non‑production environments can test the new provider safely.
   - Production can switch over at a controlled time.
4. Validate that all key use cases (reminders, cancellations, bulk messages) behave as expected.

