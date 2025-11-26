---
sidebar_position: 4
---

# Feature-level permissions

This section describes which specific features are available to each role in Just Driving. Use it as a reference when checking or changing authorization rules.

## Booking & schedule features

- Admin
  - Create, edit, and cancel any booking.
  - Override booking status (confirm, complete, no‑show, cancel).
  - Create and manage booking types (duration, price, category).
  - View all calendars (school-wide, per teacher, per class).
- Teacher
  - View own calendar and bookings.
  - Create bookings for own students (if school policy allows).
  - Propose or perform reschedules and cancellations for their bookings.
  - Mark attendance and completion for lessons.
- Student
  - Create booking requests or self-service bookings (where allowed).
  - View, cancel, or reschedule own bookings within allowed time windows.
  - Cannot modify other users’ bookings or global booking types.

## Class, lesson plan, and student management

- Admin
  - Create/edit/delete classes (hold) and assign teachers and lesson plans.
  - Enroll or remove students from classes.
  - Manage lesson plans and templates used by classes.
  - Edit student records (contact info, school-related data).
- Teacher
  - View classes they are assigned to and the enrolled students.
  - Update lesson progress/notes for students in their classes.
  - (Optional) Adjust lesson plan progress for the classes they teach.
- Student
  - View classes they are enrolled in and related schedules.
  - Cannot edit class definitions or lesson plans.
  - May update their own profile information only.

## Financial and reporting features

- Admin
  - View payments and (where implemented) invoices and summaries.
  - Export financial data for accounting/payroll use.
  - Configure payment-related settings (e.g. enabling online payments).
- Teacher
  - View financial data relevant to their own lessons if enabled (e.g. earnings summary).
  - Cannot change global payment or accounting configuration.
- Student
  - View and pay their own outstanding amounts.
  - See history of their own payments and bookings.
  - No access to other users’ financial data.

## Communication & notifications

- Admin
  - Configure email/SMS templates and reminder settings (per school).
  - Trigger bulk notifications (e.g. to a class or teacher’s students).
- Teacher
  - Send or trigger notifications related to their bookings/classes (e.g. reschedule notices, follow-up messages).
- Student
  - Receive notifications and configure limited preferences (e.g. opt-in/out where available).
  - Cannot send system-wide messages.

## Configuration & administration

- Admin
  - Manage school profile, departments, and global settings.
  - Manage users (create/disable accounts, reset roles, etc.).
  - Configure external integrations (payment, SMS, accounting, e‑teori.dk, findkoreskole.dk).
- Teacher
  - Manage only personal settings (e.g. notification preferences, personal availability).
- Student
  - Manage only personal profile settings (contact info, password).

