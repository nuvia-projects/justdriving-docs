---
sidebar_position: 3
---

# Payment Gateways

This page describes how payment gateways are used in Just Driving. It explains the general abstraction, which payment options are supported, and how payments are connected to invoices, students, and schools.

The payment gateway layer aims to:

- Provide a consistent way to start and complete payments.
- Keep provider-specific logic encapsulated.
- Allow adding or switching gateways with minimal impact on the rest of the system.

## Supported payment options

Currently, the system is designed around two main categories:

- **Online card payments** via a provider such as Stripe.
- **Manual payments**, for methods handled outside the system (for example, cash, bank transfer, MobilePay).

The architecture should allow more providers (for example, local payment service providers) to be added later.

## Conceptual gateway abstraction

Instead of letting controllers or views talk directly to a payment provider, Just Driving treats each provider as a “gateway” hidden behind a simple contract.

Conceptually, each gateway can:

- Start a payment for a given invoice (for example, create a payment intent or payment link).
- Finalize a payment when the provider confirms it (via redirects or webhooks).
- Optionally initiate refunds or partial refunds.

A central component is responsible for deciding which gateway to use in a given situation. That decision can depend on:

- The school’s configuration (for example, whether online payments are enabled and which provider is selected).
- The type of payment (online card payment versus manual registration).

This keeps the rest of the code working with a generic “payment gateway” concept rather than with a specific provider.

## Mapping to internal finance models

Regardless of the chosen gateway, internal finance always revolves around the same core entities:

- **StudentInvoice** – represents what a student owes.
- **StudentPayment** – represents a completed or attempted payment.
- **StudentBalance** – represents the net result of invoices and payments.

A typical online payment flow looks like this at a conceptual level:

1. A user (usually a student) chooses to pay a specific invoice.
2. The system determines which gateway to use based on school configuration.
3. The gateway starts a payment with the external provider and returns whatever information is needed by the frontend (for example, a client secret or payment URL).
4. The student completes the payment through the provider’s UI.
5. When the provider confirms success (typically via webhook), the system:
   - Creates or updates a payment record.
   - Marks the invoice as paid when appropriate.
   - Recalculates the student’s balance.
   - Triggers any relevant confirmations or receipts (email/SMS).

From the rest of the application’s perspective, it only cares that a payment was successfully registered for a given invoice and student.

## School-level configuration

Each school can have its own payment settings, such as:

- Whether online card payments are enabled at all.
- Which online gateway is used (for example, Stripe or another provider in future).
- Specific configuration options for that gateway (keys, account IDs, branding options).

There are usually both:

- **Global defaults** (set in configuration files and environment variables).
- **Per-school overrides** stored in the database.

When a payment is started, the system combines these to decide which gateway should handle the request and which settings apply.

## Manual payments

Manual payments cover any payment that is settled outside the online gateway, such as:

- Cash at the school office.
- Bank transfer to the school’s bank account.
- Mobile payment apps where the transaction happens outside Just Driving.

In these cases:

- A staff user records the payment in the system.
- The system creates a payment entry linked to the student and invoice.
- The invoice and student balance are updated in the same way as for online payments.

Because manual and online payments use the same internal entities, financial overviews and reports do not need to treat them differently beyond indicating the method used.

## Adding or changing gateways

When introducing a new payment gateway or changing the existing one, the recommended process is:

1. **Define the contract**  
   Ensure the gateway abstraction covers everything needed (start payment, finalize payment, handle refunds if required).

2. **Implement provider-specific logic behind the abstraction**  
   All API calls, authentication, and provider-specific rules live in a dedicated implementation, not scattered across controllers or views.

3. **Wire up configuration**  
   Add any necessary configuration options and allow schools to choose or be assigned the new gateway where appropriate.

4. **Connect to existing finance models**  
   Make sure the gateway implementation correctly creates and updates internal invoices, payments, and balances so reporting remains consistent.

5. **Test thoroughly**  
   Use test modes and sandbox environments from the provider to verify:
   - Successful payments.
   - Failed or declined payments.
   - Edge cases such as partial refunds or timeouts.

## Error handling and robustness

To keep payments reliable:

- **Idempotency**  
  The system should treat repeated notifications about the same external payment as the same event, avoiding duplicate payment records or double updates.

- **Validation**  
  All payment confirmations must be checked against internal expectations:
  - The invoice and student referenced by the external provider must match an existing internal record.
  - The amount reported by the provider must match the expected amount for the invoice.

- **Logging and monitoring**  
  Interactions that affect money (payment creation, confirmations, failures, refunds) should be logged clearly so problems can be traced later.

- **Graceful failure handling**  
  If a payment fails or a provider is temporarily unavailable, the system should:
  - Record the failure.
  - Keep the invoice open.
  - Allow the user to retry or choose an alternative method.


