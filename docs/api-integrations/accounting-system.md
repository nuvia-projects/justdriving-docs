---
sidebar_position: 4
---

# Accounting Systems

This page describes how Just Driving can integrate with external accounting systems. The goal is to keep the core finance data (invoices, payments, balances) inside Just Driving while making it possible to synchronize that data with bookkeeping tools used by schools or the platform operator.

## Purpose of accounting integrations

Many schools use separate accounting software (for example, local bookkeeping tools, cloud accounting platforms, or an external accountant). The accounting integration layer in Just Driving is intended to:

- Export key financial data (invoices, payments, refunds, fees) in a consistent format.
- Reduce double data entry for school staff and accountants.
- Support reconciliation between Just Driving’s records and the school’s official accounts.

The exact accounting system can vary from school to school; the integration layer should be flexible enough to support multiple providers over time.

## Data exchanged with accounting systems

Regardless of the specific accounting tool, the same core data usually needs to be shared:

- **Invoices**  
  - Invoice number and date  
  - Student (customer) information  
  - School (supplier) information  
  - Line items (products/services, quantities, unit prices, VAT)  
  - Totals (net, VAT, gross)  
  - Status (open, paid, cancelled)

- **Payments**  
  - Payment date  
  - Amount and currency  
  - Payment method (card, cash, bank transfer, etc.)  
  - Reference to the related invoice(s)

- **Adjustments and refunds**  
  - Credit notes or negative invoices  
  - Partial or full refunds of previous payments

- **Accounts and categories** (optional, depending on system)  
  - Revenue accounts per product/service type  
  - VAT codes and rates

Just Driving should be the “source of truth” for the operational side (which student paid what, when), while the accounting system is the “source of truth” for official financial reporting and compliance.

## Integration patterns

Accounting integrations can be implemented in several ways, often in combination:

- **File exports**  
  - Export invoices and payments as CSV, XML, or another format that can be imported into the accounting system.  
  - Often run manually by staff on a daily, weekly, or monthly basis.

- **API-based synchronization**  
  - Use the accounting system’s API to push invoices and payments directly from Just Driving.  
  - Can be near real‑time (for example, when an invoice is issued or paid) or batched.

- **Hybrid approach**  
  - Core data is synchronized via API, while detailed or edge cases are handled with periodic exports.

The choice depends on what accounting systems the schools use and how much automation they want.

## School-level configuration

Each school can have its own accounting setup, for example:

- Which accounting system it uses (or no integration at all).
- How customers (students) should be represented:
  - As individual customer records.
  - Grouped under a generic “students” customer where local rules allow.
- Which accounts and VAT codes should be used for:
  - Different invoice services (lesson packages, fees, materials).  
  - Additional charges such as cancellation fees.

Configuration is typically stored per school and might include:

- Selected accounting provider (if any).
- API credentials or export preferences.
- Mappings from internal invoice services to external account codes.

## Synchronization flows

Conceptually, typical accounting flows look like this:

- **Invoice export or sync**  
  - New or updated invoices in Just Driving are either:
    - Exported in a file for later import, or  
    - Pushed to the accounting system via API.  
  - Each invoice is either created as:
    - An invoice document in the accounting system, or  
    - A combination of journal entries, depending on the provider.

- **Payment export or sync**  
  - When a payment is registered or confirmed in Just Driving, a corresponding payment or journal entry is created in the accounting system.  
  - Matching logic may link payments to open invoices in the external system.

- **Reconciliation**  
  - Periodically, staff or accountants compare summaries (totals per day, week, or month) between Just Driving and the accounting system.  
  - Discrepancies (for example, missing invoices or payments) are investigated and corrected.

The integration layer should keep clear references (IDs, invoice numbers, payment references) so entries can be matched on both sides.

## Error handling and audit trail

For accounting integrations, reliability and traceability are critical:

- **Error handling**  
  - If an export or API sync fails, the system should:
    - Record the failure and reason.  
    - Allow a retry once the problem is fixed (for example, incorrect credentials, temporary provider outage).

- **Idempotency**  
  - Re‑sending the same invoice or payment should not create duplicates in the accounting system.  
  - Integrations should track which internal records have already been exported or synchronized.

- **Audit trail**  
  - Keep logs or flags on invoices and payments showing:
    - When they were exported or synced.  
    - Which user or automated job triggered the export.  
    - Any external IDs returned by the accounting system.

These measures help accountants and support staff understand what has been sent and what still needs attention.

## Extending to new accounting systems

When adding support for a new accounting provider, the recommended approach is:

- Define which data will be exchanged (invoices only, or also payments, refunds, and balances).  
- Implement a provider‑specific adapter that:
  - Reads internal invoices and payments.  
  - Transforms them into the provider’s expected format (file or API payload).  
  - Handles provider‑specific rules (rounding, VAT handling, customer identification).  
- Keep provider logic separate so that adding or changing providers does not impact the core finance models.

