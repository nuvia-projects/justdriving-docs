---
sidebar_position: 4
---

# Workflows

This page describes the main workflows supported by the financial management module, from the moment a student signs up until their balance is settled and exported to accounting.

## Create and send an invoice

1. Trigger  
   - A student signs up, purchases a package, books certain services, or a fee needs to be charged.

2. Prepare the invoice  
   - Select the student and school (and department if relevant).  
   - Add line items for packages, individual lessons, materials, or fees.  
   - Set due date and any payment terms.

3. Review and finalize  
   - Check totals, taxes, and discounts.  
   - Save as draft if further review is needed, or mark as ready.

4. Send to the student  
   - Deliver via email (and optionally SMS link) from within the system.  
   - Make the invoice visible in the student portal so they can review and pay.

## Register a payment

1. Trigger  
   - The student pays online through a payment gateway, or  
   - The school receives a manual payment (cash, bank transfer, mobile payment).

2. Capture the payment  
   - For online payments, the system receives confirmation from the gateway and links it automatically to the invoice and student.  
   - For manual payments, staff record the payment, selecting method, amount, date, and related invoice(s).

3. Update finance state  
   - The invoice status is updated (paid, partially paid).  
   - The student’s balance is recalculated.  
   - A receipt or confirmation can be sent automatically to the student.

## Handle overdue invoices

1. Identify overdue items  
   - Use finance overviews to list invoices past their due date, grouped by school or department.  
   - Prioritize based on amount and age (how long they have been overdue).

2. Take follow-up actions  
   - Send reminder emails and/or SMS with a link to pay.  
   - Log or schedule manual follow-up (phone calls, discussions with the student).

3. Apply school policy  
   - Depending on policy, restrict further bookings or services for severely overdue accounts.  
   - Consider payment plans or partial settlements where appropriate.

4. Keep records updated  
   - Record all follow-up actions and changes to status (for example, moved to “under collection” or “on hold”).

## Adjust, refund, or correct

1. Trigger  
   - A service was cancelled, changed, or charged incorrectly.  
   - A student withdraws or changes package.  
   - An error was made in the original invoice or payment allocation.

2. Decide the correction path  
   - Adjust the existing invoice (correct line items, discounts).  
   - Issue a credit note or negative invoice when needed.  
   - Record a refund payment or reallocate an existing payment to another invoice.

3. Apply the change  
   - Make the correction in a way that preserves history (no destructive overwrites).  
   - Ensure linked payments and balances are updated accordingly.

4. Communicate  
   - Notify the student about the change and updated amounts.  
   - If relevant, inform accounting so external books stay aligned.

## Period-end review and export

1. Prepare the period  
   - Choose the reporting period (month, quarter, year).  
   - Ensure all invoices and payments for that period are recorded and reconciled.

2. Review internal data  
   - Check totals for invoices issued, payments received, and outstanding balances.  
   - Resolve obvious inconsistencies or missing entries.

3. Export or sync  
   - Generate exports for the accounting system (invoices and payments) or run the configured synchronization.  
   - Store references between internal records and external accounting entries.

4. Archive and report  
   - Save or archive reports for audit and compliance.  
   - Use summaries to inform school owners about performance and trends.

These workflows together describe how the financial management module supports real-world school operations, from first invoice to final reconciliation.
