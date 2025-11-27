---
sidebar_position: 5
---

# Coding Standards

This page describes the basic coding conventions used in the Just Driving project. The goal is not to enforce a strict style guide, but to give new developers a clear idea of how controllers, routes, and views are typically organized and how to keep new code consistent with the existing codebase.

## Controller and view structure

Controllers (and matching views) are organized by area of responsibility:

- `App\Http\Controllers\Admin`  
  Controllers for the global admin area (platform administration, high-level configuration, etc.).

- `App\Http\Controllers\Api`  
  Controllers that expose API endpoints, typically returning JSON responses for internal or external integrations.

- `App\Http\Controllers\School`  
  Controllers for features used by school staff (school owners, office staff, teachers acting inside a given school).

- `App\Http\Controllers\Student`  
  Controllers for the logged-in student experience (student dashboard, bookings, payments, progress view, etc.).

- `App\Http\Controllers\Web`  
  Controllers for public-facing pages that do not require authentication (marketing pages, public signups, landing pages, etc.).

Blade views follow the same structure so that each controller area has a matching view directory. For example:

- `resources/views/admin/...`
- `resources/views/school/...`
- `resources/views/student/...`
- `resources/views/web/...`

When adding new features, place controllers and views in the area that matches the primary user of that functionality.

## RESTful controller actions

Controllers generally follow a REST-style convention for resourceful endpoints. The typical actions are:

- `index` – list resources.
- `show` – show a single resource.
- `create` – show the form for creating a new resource.
- `store` – handle creation of a new resource.
- `edit` – show the form for editing an existing resource.
- `update` – handle updates to an existing resource.
- `destroy` – delete or deactivate a resource.

When possible:

- Use these standard action names instead of custom names.
- Group related routes using resource controllers or route groups.
- Keep controller methods focused on coordinating requests and responses, and avoid putting complex domain logic directly in controllers where it becomes hard to test or reuse.

## Routes and areas

Routes are typically grouped by area to match the controller structure:

- Admin routes → `Admin` controllers.
- API routes → `Api` controllers.
- School routes → `School` controllers.
- Student routes → `Student` controllers.
- Public routes → `Web` controllers.

When adding new routes:

- Place them in the route file that fits the audience and authentication requirements (for example: web routes for Blade views, API routes for JSON-only endpoints).
- Point them to the appropriate controller namespace (`Admin`, `School`, `Student`, `Web`, or `Api`).

## General PHP/Laravel conventions

There is no strict external style guide enforced (such as PSR-12 tooling), but new code should:

- Follow Laravel’s common patterns and naming conventions (for example, Eloquent models in `App\Models`, controllers in `App\Http\Controllers`, etc.).
- Use clear, descriptive names for classes, methods, and variables.
- Keep controllers reasonably small; if a controller action becomes very complex, consider extracting parts of the logic into dedicated classes (services, jobs, actions) to keep things maintainable.

## Git and workflow

There is no tightly enforced Git workflow documented here, but in general:

- Use feature branches for new work.
- Keep commits focused and write short, descriptive commit messages.
- Make sure new changes fit the existing controller/view structure and REST conventions.


