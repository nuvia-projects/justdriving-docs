---
sidebar_position: 3
---

# Key Logic

This page explains the core logic and processes underlying the financial management module: how invoices, payments, and balances are calculated, linked, and kept in sync with school operations.

## Invoice and payment matching

- Every invoice is tied to a student and school, possibly also a department.
- Invoices may have multiple line items (lessons, packages, materials, fees).
- Payments are linked to invoices wherever possible:
  - Full payments close out the invoice.
  - Partial payments leave a remaining balance and update status.
  - Multiple payments can settle one invoice over time.
- Manual payments (cash, bank transfer) and online payments (card, gateway) are treated equally in core logic, but carry identifiers for source and method.
- Overpayments and adjustments create credits or require staff review.

## Balance calculation and aging

- A student’s balance is calculated as:  
  - Sum of open invoices (total owed), minus sum of confirmed payments.
- Aging logic tracks how long invoices are overdue and can flag accounts for follow-up or limit access if debt increases past certain thresholds.
- Balances can be calculated for entire schools or departments for reporting and analytical purposes.

## Event-driven updates

- Bookings and lesson delivery trigger invoice creation or update:
  - Rules ensure correct billing for actual attended lessons, cancellations, or package changes.
- Payment events (confirmed by gateway or entered manually) automatically update invoice status and student balances.
- Cancellations, refunds, and corrections propagate through linked invoices and payments to keep records accurate.

## Integration and data flow

- Payment gateway confirmation (via webhook or API) drives reliable financial updates:
  - Successful payment => immediate invoice update.
  - Failed payment triggers reminders or alternate follow-up.
- Accounting system exports and syncs are driven by invoice and payment logic:
  - Data is mapped to external codes and structures as per school settings.
- Notifications (email/SMS) are powered by core financial events:
  - Reminder schedule tied to due dates, overdue status, and payments recorded.

## Error handling and rollback

- Idempotency logic ensures duplicate payment notifications or bookings don't create duplicated financial records.
- All corrections, voids, and refunds are fully auditable and never destroy core financial history—adjustments build on top of original records.

## Security and access control

- Only authorized roles (admin, school owner, office staff) can view or modify financial details.
- All actions are scoped to a school (and department, if used), preventing cross-school data leakage.
- Sensitive actions (issuing refunds, voiding invoices) require explicit confirmation and trigger audit logs.

This key logic keeps the financial picture in Just Driving accurate, transparent, and aligned with real teaching and school activity, no matter how complex the operational scenarios become.
