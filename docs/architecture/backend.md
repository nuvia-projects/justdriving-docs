---
sidebar_position: 2
---

# Backend Structure

This page describes how the backend of Just Driving is structured. It focuses on the main Laravel components (controllers, models, jobs, etc.) and how they are organized into areas that match the different users and features of the system.

## Overview

The backend is a Laravel 8 application. It follows Laravel’s standard directory layout, with some additional structure around controllers and views to separate concerns by user type and area of the system.

At a high level:

- Controllers are grouped into namespaces based on who uses a given part of the system (Admin, School, Student, Web, Api).
- Views follow the same grouping so it is easy to find the templates that belong to a given controller.
- REST-style controllers are used where possible, with conventional actions like `index`, `show`, `create`, `store`, `edit`, `update`, and `destroy`.

## Controllers

Controllers live under `App\Http\Controllers` and are grouped by area:

- `App\Http\Controllers\Admin`  
  Controllers for the global admin area (platform administration and configuration).

- `App\Http\Controllers\Api`  
  Controllers that expose JSON APIs for internal and external integrations.

- `App\Http\Controllers\School`  
  Controllers for features used by school staff (school owners, office staff, teachers under a school).

- `App\Http\Controllers\Student`  
  Controllers for the student-facing part of the application (student dashboards, bookings, payments).

- `App\Http\Controllers\Web`  
  Controllers for public-facing pages that do not require authentication (marketing pages, public signup flows, etc.).

New controllers should be placed in the namespace that matches the primary user and route area they serve.

## Views

Views are implemented using Blade templates and are structured to mirror the controller namespaces:

- `resources/views/admin/...`
- `resources/views/school/...`
- `resources/views/student/...`
- `resources/views/web/...`

When you add a new controller action that returns a view, its template should be placed in the matching directory so it is easy to locate from the controller.

## Models and domains

Eloquent models represent the main business entities in the database, such as:

- Schools, departments, teachers, and students.
- Bookings, booking types, and classes.
- Lesson plans, modules, pensum, and education content.
- Invoices, invoice items, student balances, and payments.
- Notifications and settings for email/SMS.

Models live under `App\Models` (or `App\` in older parts of the codebase) and are linked together using Eloquent relationships (for example, a school has many students and teachers, a student has many bookings and invoices, etc.). When adding new logic, prefer to reuse existing models and relationships instead of duplicating queries.

## Jobs, events, and queues

Background work is handled using Laravel’s queue system (with Redis as the queue backend). Typical use cases include:

- Sending emails and SMS notifications.
- Processing asynchronous tasks that should not block HTTP requests.

Jobs normally live under `App\Jobs`, and may be dispatched from controllers, event listeners, or model hooks. When you introduce work that is potentially slow or external (e.g. network calls), consider wrapping it in a job and running it via the queue.

## Configuration and services

Configuration for external services (Twilio, Stripe, Mailtrap, SparkPost, etc.) is managed via environment variables (`.env`) and Laravel config files in `config/`. Service classes, if present, wrap third-party SDKs or APIs to keep controllers and jobs focused on application logic rather than low-level integration details.

When adding new integrations:

- Add configuration keys under `config/` and `.env.example`.
- Encapsulate external API calls in dedicated classes or services.
- Use jobs where appropriate so slow calls are done in the background.

