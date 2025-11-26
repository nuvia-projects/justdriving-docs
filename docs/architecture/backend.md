---
sidebar_position: 2
---

# Backend structure

The backend for Just Driving is a Laravel (PHP 7.*) application organized using standard Laravel conventions, with additional separation for business logic and integrations. This section describes the main backend layers and how they fit together.

## Core Laravel directories

- `app/Models`  
  - Eloquent models for core entities such as `Student`, `DrivingSchool`, `Lesson`, `Booking`, `User`.  
  - Defines relationships (e.g. `DrivingSchool hasMany Lesson`, `Student hasMany Booking`).

- `app/Http/Controllers`  
  - Controllers handling HTTP requests for Admin, Teacher, and Student areas.  
  - Typically grouped by area, for example:
    - `App\Http\Controllers\Admin\*`
    - `App\Http\Controllers\Teacher\*`
    - `App\Http\Controllers\Student\*`

- `app/Http/Middleware`  
  - Middleware for authentication, authorization, role checks, and common web concerns.  
  - Example: role-based middleware to restrict admin routes to admin users.

- `routes/web.php`  
  - Web routes for dashboards, management screens, booking flows, etc.  
  - May use route groups for prefixes like `/admin`, `/teacher`, `/student` with corresponding middleware.

- `routes/api.php` (if used)  
  - API endpoints (e.g. for AJAX calls, future integrations, or mobile apps).

## Application and domain logic

Depending on how you’ve structured your code, you can document:

- `app/Services`  
  - Application services that coordinate complex operations (e.g. `BookingService`, `DrivingSchoolService`).  
  - Used by controllers to keep them thin and focused.

- `app/Actions` or `app/UseCases` (if you use them)  
  - Single-purpose classes for specific operations (e.g. `CreateBooking`, `AssignTeacherToStudent`).  
  - Help make business flows explicit and testable.

- `app/Repositories` (if present)  
  - Abstraction over Eloquent queries for more complex read logic.  
  - For example `BookingRepository` or `DrivingSchoolRepository`.

## Integrations and external platforms

- `app/Services/Integrations` or similar  
  - Classes encapsulating communication with external systems:
    - `e-teori.dk` (theory practice platform).
    - `findkoreskole.dk` (driving school discovery).  
  - Typically use an HTTP client (e.g. Guzzle) and expose clear methods like `syncStudent`, `sendLead`, etc.

## Supporting layers

- `database/migrations`  
  - Migrations that define the schema for users, schools, lessons, bookings, etc.

- `database/seeders`  
  - Seeders for initial test data (e.g. demo schools, demo users).

- `app/Console` (optional)  
  - Artisan commands for recurring tasks (e.g. sending reminders, syncing external data).
