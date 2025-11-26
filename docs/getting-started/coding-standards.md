---
sidebar_position: 5
---

# Coding standards

This project follows common Laravel/PHP 7 conventions to keep the codebase readable and maintainable. Treat these as defaults unless explicitly documented otherwise in the repo.

## General code style

- Follow PSR-style conventions for PHP (PSR-1/PSR-12 style: braces on new line for classes, same line for control structures, 4-space indentation).
- Use strict typing where possible (`declare(strict_types=1);` at the top of new files if the project is already using it).
- Prefer early returns over deeply nested `if` / `else` chains.
- Keep controllers thin; move complex logic to services, actions, or domain classes.
- Avoid “God classes”; split responsibilities into smaller, focused classes.

## Naming conventions

- Classes: `PascalCase` (e.g. `StudentController`, `BookingService`, `DrivingSchoolRepository`).
- Interfaces: `PascalCase` with `Interface` suffix only if needed (e.g. `PaymentGatewayInterface`).
- Methods and functions: `camelCase` (e.g. `createBooking`, `sendReminderEmail`).
- Variables and properties: `camelCase` (e.g. `$drivingSchool`, `$lessonCount`, `$bookingRequest`).
- Database tables: plural `snake_case` (e.g. `driving_schools`, `students`, `lesson_bookings`).
- Columns: `snake_case` (e.g. `first_name`, `lesson_date`, `driving_school_id`).
- Route names: `snake_case` or `dot.notation` describing resource and action (e.g. `students.index`, `bookings.store`).
- Config keys and env keys: `UPPER_SNAKE_CASE` for env (`APP_ENV`, `DB_HOST`), `snake_case` for config array keys (`default_driver`, `queue_connection`).

## Laravel-specific patterns

- Controllers:
  - Use RESTful controllers for resources (`index`, `show`, `store`, `update`, `destroy`).
  - Use dedicated controllers for clearly separated areas (e.g. `Admin\StudentController`, `Teacher\LessonController`).
- Models:
  - One Eloquent model per table, named in singular `PascalCase` (e.g. `Student`, `DrivingSchool`, `LessonBooking`).
  - Put relationships (`hasMany`, `belongsTo`, etc.) directly on models.
- Form requests:
  - Use custom `FormRequest` classes for validation instead of in-controller `validate()` when rules are non-trivial.
- Services / actions:
  - Extract non-trivial business logic into service classes or “action” classes (e.g. `CreateBookingAction`, `SyncStudentFromFindKoreskole`).
  - Keep service method names descriptive (e.g. `handle`, `execute`, or domain-specific verbs).

## Frontend (Laravel Mix / Webpack) conventions

- JavaScript:
  - Use `camelCase` for variables and functions, `PascalCase` for components (e.g. `LessonCalendar.vue`).
  - Keep each component focused; avoid very large, multi-purpose components.
  - Organize code under folders like `resources/js/components`, `resources/js/pages`, `resources/js/services`.
- CSS/Sass:
  - Prefer utility-first or BEM-style naming if not using a utility framework.
  - Keep global styles small; prefer component-scoped styles where possible.

## Comments and documentation

- Prefer self-explanatory names over excessive comments.
- Use PHPDoc on public methods when:
  - The intent, parameters, or return type are not obvious.
  - There are important side effects to document.
- Keep TODOs actionable with a clear description or ticket reference.


