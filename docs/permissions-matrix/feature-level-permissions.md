---
sidebar_position: 4
---

# Feature-Level Permissions

This page describes permissions at the level of specific features and actions. It builds on the role descriptions and high-level matrices, but focuses on concrete “who can do what” for key parts of the system.

## Bookings

**Create bookings**

- Global Admin: can create bookings for any school.
- School Admin/Owner: can create bookings for their own school (any department/teacher).
- Teacher: can create bookings they teach (and sometimes for colleagues, depending on configuration).
- Student: can request or self‑book available slots if the school allows student self‑booking.

**Edit and cancel bookings**

- Global Admin: can edit and cancel any booking.
- School Admin/Owner: can edit and cancel bookings in their school.
- Teacher: can edit and cancel bookings they are responsible for (or within their department), subject to business rules (e.g. not after the booking has started).
- Student: can cancel their own bookings only if allowed by rules such as:
  - Minimum notice period.
  - No cancellation for certain booking types.

## Classes and lesson plans

**Manage classes (course groups)**

- Global Admin: can manage classes for any school if needed.
- School Admin/Owner: can create, edit, and close classes in their school.
- Teacher: can view and manage the classes they teach (e.g. add/remove students) if allowed.
- Student: cannot manage classes; can only view and join the classes they are enrolled in.

**Manage lesson plans and modules**

- Global Admin: can manage global/default lesson plans and modules.
- School Admin/Owner: can manage lesson plans and modules for their own school (e.g. attach plans to classes and booking types).
- Teacher: can view and use lesson plans, and may edit certain details if the school allows it.
- Student: can only view their own progress through lesson plans; cannot edit plans or modules.

## Signatures and progress

**Teacher signatures**

- Global Admin: can sign or correct signatures in exceptional cases (administrative overrides).
- School Admin/Owner: can sign in special cases (e.g. when covering for teachers) and correct mistakes.
- Teacher: can sign lesson modules they have taught, confirming that the content was delivered.
- Student: cannot sign as a teacher.

**Student signatures**

- Global Admin / School Admin / Teacher: cannot sign as the student.
- Student: must sign modules that require student acknowledgment or confirmation.

## Finance: invoices and payments

**Create and edit invoices**

- Global Admin: can view and edit invoices across schools (mainly for support).
- School Admin/Owner: can create and edit invoices and corrections for students in their school.
- Teacher: usually has no access to invoice creation; in some setups may create draft invoices (to be approved by school admin).
- Student: cannot create or edit invoices.

**Register payments**

- Global Admin: can register or correct payments across schools (support tasks).
- School Admin/Owner: can register payments (e.g. cash, bank transfer) and reconcile with Stripe data.
- Teacher: usually cannot register payments unless acting as office staff.
- Student: pays invoices online via Stripe; does not register payments manually.

**View financial information**

- Global Admin: can view financial data for all schools, including reports.
- School Admin/Owner: can view all financial data for their school, including reports, balances, and statistics.
- Teacher: may see limited financial information related to their students or own salary, depending on school policy.
- Student: can only see their own invoices, payments, and balances.

## Notifications (email and SMS)

**Trigger notifications**

- Global Admin: can trigger system-wide or school-specific notifications (e.g. maintenance messages).
- School Admin/Owner: can trigger notifications for their school (e.g. bulk messages to students or teachers).
- Teacher: can trigger notifications related to their own bookings and students (e.g. reschedule messages, reminders).
- Student: cannot trigger notifications to others; may resend their own confirmation emails if such a feature exists.

**Configure templates**

- Global Admin: can manage global/default templates.
- School Admin/Owner: can customize templates at school level (where supported).
- Teacher and Student: cannot change templates.

## User management and access

**User creation and invites**

- Global Admin: can create admins, schools, and initial school users.
- School Admin/Owner: can create or invite teachers and students to their school.
- Teacher: may invite students in some setups (e.g. send invitation emails), but usually cannot create admin accounts.
- Student: cannot create other users.

**Account changes**

- Global Admin: can reset passwords and lock/unlock accounts across the platform.
- School Admin/Owner: can reset passwords and manage status for users in their school (except global admins).
- Teacher: usually cannot change other users’ accounts; may help initiate password reset flows.
- Student: can change their own profile and password via self‑service features.

---

When implementing new features:

- Start from the role matrices and these feature‑level rules.
- Decide which roles can:
  - See the screen.
  - Perform create/update/delete actions.
  - Trigger related notifications or side effects.
- Enforce rules both in authorization (policies, gates, middleware) and in queries (ensure only allowed data is returned).
