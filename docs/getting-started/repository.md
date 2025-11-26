---
sidebar_position: 1
---

# Repository structure

The Just Driving platform uses a standard Laravel project structure, which separates application logic, configuration, public assets, and resources in a clear and conventional way. This makes the codebase easy to navigate for any Laravel-experienced developer and simplifies maintenance, testing, and deployment.

A high-level overview of the Laravel-based repository structure:

- `/app` – Core application code (models, controllers, jobs, policies, etc.).
- `/bootstrap` – Framework bootstrap files and cache bootstrap.
- `/config` – All configuration files for the application and services.
- `/database` – Migrations, seeders, and factories for managing the database schema and test data.
- `/public` – Public web root (index.php, compiled assets, and entry point for HTTP traffic).
- `/resources` – Views (Blade, Inertia/Vue), language files, and frontend assets before build.
- `/routes` – Route definitions (web, API, console, etc.).
- `/storage` – Logs, cached views, compiled files, and uploaded files.
- `/tests` – Automated tests (feature and unit tests).
- `/vendor` – Composer dependencies (managed automatically).

