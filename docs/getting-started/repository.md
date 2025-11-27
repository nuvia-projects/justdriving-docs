---
sidebar_position: 1
---

# Repository

This page gives new developers a quick overview of the main repository for the Just Driving platform and how it is structured.

## Overview

The Just Driving application is built as a Laravel-based web application. The repository contains the full backend (HTTP/API, console commands, jobs, etc.), the web frontend rendered through Laravel, and configuration for integrations such as payments, SMS, and external platforms.

The repository is intended to be the single source of truth for core business logic around schools, students, teachers, bookings, finance, and notifications. Other connected platforms (such as e-teori.dk and findkoreskole.dk) integrate with this application through defined interfaces and APIs, but are not part of this repository.

## Location and access

- The main repository is hosted in a Git-based source control system (for example GitHub or a self-hosted Git service).
- Access is granted per developer and may require membership of the correct organization or group.
- Branch protection and deployment flows are defined in the project’s branching and deployment documentation (see the Deployment Guide in the Developer Guides section).

(Adjust this section with the actual Git URL, organization, and any specific access requirements.)

## High-level structure

The repository follows the standard Laravel directory structure, with some domain-specific additions. At a high level, you will see:

- `app/`  
  Application code, including models, controllers, jobs, events, listeners, policies, and other domain logic.

- `bootstrap/`  
  Framework bootstrap files.

- `config/`  
  Application configuration, including environment-specific settings and integration configuration.

- `database/`  
  Migrations, seeders, and sometimes factories for local development and testing.

- `public/`  
  Public web root, including the front controller (`index.php`) and any built frontend assets that need to be web-accessible.

- `resources/`  
  Blade views, language files, and front-end resources such as JavaScript and CSS (if applicable to your setup).

- `routes/`  
  Route definitions for web, API, console, and any custom route files you may use.

- `storage/`  
  Logs, cached views, compiled files, and uploaded files (in non-production environments).

- `tests/`  
  Automated tests (for example, unit, feature, or integration tests).

- Project root files such as `composer.json`, `.env.example`, `artisan`, and others that are standard for a Laravel project.

If your project adds additional top-level directories (for example, `docs/`, `deploy/`, or any custom tooling), describe their purpose here.

## Branching model

The repository uses a branch-based workflow to separate stable code from work in progress. A common pattern is:

- A main branch (often `main` or `master`) that represents the production-ready code.
- Feature branches created from the main branch for new work.
- Pull requests/Merge requests used to review and merge changes back into the main branch.

If your project uses release branches, hotfix branches, or any specific naming conventions, document them here so new developers know how to name and structure their branches.

## Related repositories

While this repository contains the core Just Driving application, there may be additional repositories in the ecosystem, such as:

- Infrastructure or deployment scripts (for example, server configuration, CI/CD pipelines).
- Separate frontend projects (if the UI is split out).
- Integration-specific tooling or libraries.

List those here if they are relevant and link to where to find them in your source control system.



