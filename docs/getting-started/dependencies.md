---
sidebar_position: 2
---

# Dependencies

This page lists the main system and application dependencies required to run the Just Driving platform in a development or production environment. New developers should make sure their local setup matches these requirements before trying to run the project.

## Core runtime

Just Driving is built as a Laravel-based PHP application and depends on the following core runtime components:

- **PHP**  
  PHP 7.x (CLI and FPM) with common extensions enabled (for example: `pdo_mysql`, `mbstring`, `openssl`, `json`, `curl`, `xml`, `tokenizer`, `ctype`, `bcmath`).

- **Laravel**  
  The application is built on Laravel 8 (`laravel/framework: ^8.0`).

- **Composer**  
  Composer is required to install and update PHP and Laravel dependencies.

- **Web server**  
  For **local development**, Laravel Herd is the recommended web server and PHP runtime.  
  For **staging and production**, a traditional web server such as Nginx or Apache is typically used to serve the application behind PHP-FPM.

## Data stores

The application relies on the following data stores:

- **Database (MySQL)**  
  A MySQL database server is required as the primary data store for schools, students, teachers, bookings, finances, and other entities. Both development and production environments must use MySQL.

- **Redis (queues and caching)**  
  Redis is used as a backend for queues (and optionally caching). Queued jobs are used for tasks like sending notifications and handling background work so the HTTP layer stays responsive.

## Frontend tooling

The project uses a standard Laravel front-end build pipeline:

- **Node.js and npm (or Yarn)**  
  Used to install and build front-end assets (JavaScript, CSS).  
  Make sure to use a Node.js version compatible with the front-end tooling defined in the project (see `package.json`).

- **Build tool (Laravel Mix or similar)**  
  Front-end assets are compiled using Laravel's build tooling (for example, Laravel Mix).  
  The usual commands such as `npm install`, `npm run dev`, and `npm run prod` (or the equivalent) are used during development and deployment.

## External services

In addition to core runtime and data stores, Just Driving integrates with several external services. Configuration for these services is managed via environment variables and the framework configuration files.

- **Mail provider (Mailtrap for development, SparkPost for production)**  
  For development and testing, Mailtrap is recommended so outgoing emails are captured in a safe inbox.  
  For production, SparkPost is used as the mail provider. SparkPost API/SMTP credentials are configured via environment variables.

- **SMS provider (Twilio)**  
  Twilio is used to send SMS notifications to students and teachers. The application requires Twilio credentials (account SID, auth token, and sender number) configured via environment variables.

- **Payment provider (Stripe)**  
  Stripe is used as the payment gateway for handling online payments and payment registrations. API keys and webhook configuration are managed via environment variables and Stripe’s dashboard.

## Developer tools

For local development, the following tools are expected:

- **Git** for version control and working with the central repository.
- A local PHP development environment (for example, Laravel Herd or a Docker-based stack with PHP/MySQL/Redis).
- A code editor or IDE with good PHP/Laravel support.
