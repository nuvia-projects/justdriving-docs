---
sidebar_position: 2
---

# Admin vs Teacher vs Student

This section compares the three main roles in Just Driving.

## Scope and visibility

- Admin
  - System- and school-level view.
  - Sees all schools (if multi-school) or the entire school, including all teachers, students, classes, bookings, payments, and settings.
- Teacher
  - Instructor-level view.
  - Sees own calendar, assigned classes, and the students associated with their bookings/classes.
- Student
  - Personal view.
  - Sees only their own profile, bookings, payments, and class participation.

## Primary responsibilities

- Admin
  - Onboarding and managing teachers and students.
  - Creating and configuring classes, booking types, and lesson plans.
  - Overseeing bookings (resolving conflicts, handling edge cases).
  - Managing integrations (payment, SMS, email templates) and reviewing financial data.
- Teacher
  - Delivering lessons and managing their schedule.
  - Managing attendance and lesson outcomes.
  - Communicating with students (e.g. rescheduling, notes).
- Student
  - Managing their own bookings (request, confirm, cancel/reschedule).
  - Keeping contact information up to date.
  - Paying for lessons and providing feedback/ratings.

## Permissions and limitations

- Admin
  - Full CRUD over core entities (schools, teachers, students, classes, bookings, booking types, lesson plans).
  - Can override or adjust bookings and payments.
  - Can configure system/school-level settings that affect all users.
- Teacher
  - Limited CRUD:
    - Can manage own bookings within policy (create/adjust for assigned students).
    - Can update lesson-specific data (status, notes, progress).
    - Cannot change global school settings or other teachers’ data.
- Student
  - Self-service only:
    - Can manage own profile and bookings within allowed rules.
    - Can initiate payments for own bookings.
    - Cannot modify other users, classes, or global settings.
