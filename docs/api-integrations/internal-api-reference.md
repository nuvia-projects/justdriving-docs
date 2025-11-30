---
sidebar_position: 1
---

# Internal API Reference

This page documents the internal API used by the Just Driving web interface and other trusted internal consumers. It is not a public API; endpoints and contracts can change as long as frontend and backend are kept in sync.

The examples below assume a JSON-based API under `/api/...` protected by the usual Laravel authentication and authorization layers.

## Conventions

- Base path: `/api`
- Format: JSON requests and responses
- Authentication:
  - Web UI: session/cookie-based auth with CSRF protection.
  - Scripted/internal clients: token- or key-based auth if implemented (for example `Authorization: Bearer <token>`).
- Errors:
  - `401 Unauthorized` – user not authenticated.
  - `403 Forbidden` – user authenticated but not allowed to access the resource.
  - `404 Not Found` – resource does not exist or is outside the user’s scope.
  - `422 Unprocessable Entity` – validation errors.

Resource naming generally follows REST: `GET /resource`, `GET /resource/{id}`, `POST /resource`, `PUT/PATCH /resource/{id}`, `DELETE /resource/{id}`.

## Authentication and current user

Typical endpoints (adjust paths to match your routes):

- `POST /api/login`  
  Logs a user in and starts a session or returns a token.  
  Body fields usually include `email` and `password`.

- `POST /api/logout`  
  Logs the current user out.

- `GET /api/me`  
  Returns basic information about the current user:
  - `id`, `name`, `email`
  - `role` (admin, school_admin, teacher, student)
  - `school_ids` / `current_school_id`
  - Allowed actions or feature flags, if exposed.

## Schools and departments

Used mainly by admins and school staff.

- `GET /api/schools`  
  Returns a list of schools visible to the current user (all for global admin, usually one for school staff).

- `GET /api/schools/{school}`  
  Returns details for a single school, including basic configuration.

- `GET /api/schools/{school}/departments`  
  Lists departments/branches for a school.

- `POST /api/schools`  
  Create a new school (admin only).

- `PUT /api/schools/{school}`  
  Update a school.

## Teachers and students

Scoped by school and, optionally, department.

- `GET /api/schools/{school}/teachers`  
  List teachers in a school (school admin; teachers may see a subset).

- `GET /api/teachers/{teacher}`  
  Fetch a single teacher’s details.

- `GET /api/schools/{school}/students`  
  List students in a school; may support filters like `?q=...`, `?status=...`, `?department_id=...`.

- `GET /api/students/{student}`  
  Fetch a single student’s details, including linked school, department, and basic progress.

- `POST /api/schools/{school}/students`  
  Create a new student under a school.

- `PUT /api/students/{student}`  
  Update a student.

## Classes and bookings

Scheduling-related endpoints for classes and individual bookings.

- `GET /api/schools/{school}/classes`  
  List classes (course groups) for a school.

- `GET /api/classes/{class}`  
  Fetch details for a class, including enrolled students and linked lesson plan.

- `POST /api/schools/{school}/classes`  
  Create a new class.

- `PUT /api/classes/{class}`  
  Update a class (rename, dates, status, etc.).

- `GET /api/schools/{school}/bookings`  
  List bookings with optional filters:
  - `?teacher_id=...`
  - `?student_id=...`
  - `?from=YYYY-MM-DD&to=YYYY-MM-DD`
  - `?status=...`

- `GET /api/bookings/{booking}`  
  Fetch booking details (time, teacher, students, booking type, status).

- `POST /api/schools/{school}/bookings`  
  Create a booking.

- `PUT /api/bookings/{booking}`  
  Update a booking (time, teacher, status, etc.).

- `DELETE /api/bookings/{booking}`  
  Cancel or delete a booking, subject to business rules.

- `POST /api/bookings/{booking}/students`  
  Attach students to a booking.

- `DELETE /api/bookings/{booking}/students/{student}`  
  Remove a student from a booking.

## Lesson plans and progress

Endpoints for lesson plans, modules, and signatures.

- `GET /api/schools/{school}/lesson-plans`  
  List lesson plans available in a school.

- `GET /api/lesson-plans/{lessonPlan}`  
  Fetch lesson plan with modules.

- `GET /api/students/{student}/lesson-progress`  
  Fetch the student’s progress through assigned lesson plans/modules.

- `POST /api/lesson-plan-modules/{module}/signatures`  
  Create or update signatures when a module is completed:
  - Teacher signature (when teaching is completed).
  - Student signature (when the student confirms).

## Finance (invoices and payments)

Endpoints for student finance; access is heavily role- and scope-based.

- `GET /api/students/{student}/invoices`  
  List invoices for a student.

- `GET /api/invoices/{invoice}`  
  Fetch a single invoice with line items.

- `POST /api/students/{student}/invoices`  
  Create an invoice for a student.

- `PUT /api/invoices/{invoice}`  
  Update invoice metadata or line items (while allowed).

- `GET /api/students/{student}/payments`  
  List payments for a student.

- `POST /api/students/{student}/payments`  
  Record a payment (typically for manual payment methods).

- `GET /api/students/{student}/balance`  
  Fetch calculated balance for the student.

Online payments via Stripe will usually go through dedicated endpoints or webhooks (for example, `/api/payments/stripe/webhook`) rather than generic payment endpoints.

## Notifications

Endpoints for sending and listing notifications.

- `POST /api/notifications/email`  
  Trigger a specific email (for example, custom reminder or bulk message). Only for allowed roles.

- `POST /api/notifications/sms`  
  Trigger an SMS via Twilio, again restricted by role and scope.

- `GET /api/users/{user}/notifications`  
  List notifications sent to a user, if exposed in the UI.

## General guidelines for adding new internal endpoints

- Always check:
  - Authentication (user must be logged in or have a valid token).
  - Authorization (user’s role and school/department must allow access).
  - Scoping (queries constrained by `school_id`, `department_id`, and user identity).
- Use consistent JSON structures:
  - Wrap single resources and collections in predictable keys, or use Laravel API Resources.
  - Return validation errors in a structured format (field → message).
- Prefer RESTful patterns:
  - Use HTTP verbs and resource-like URLs where possible.
  - Reserve special endpoints only for actions that don’t fit CRUD well (e.g. `/bookings/{booking}/cancel` if needed).

<!-- If you share a few concrete route examples or existing controller method names, this reference can be tightened to match your actual paths and payloads. -->
