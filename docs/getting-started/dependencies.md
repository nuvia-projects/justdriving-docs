---
sidebar_position: 2
---

# Dependencies

The Just Driving platform is a Laravel (PHP 7.*) application using Laravel Mix with Webpack for asset compilation and MySQL as the only supported database engine.

## Core runtime and system dependencies

- PHP 7.* (exact version as required by `composer.json`, e.g. 7.4).
- Web server: Apache, Nginx, or Laravel Herd, configured to serve the `public/` directory.
- Database server: MySQL (no MariaDB).
- Composer: For installing and updating PHP packages.
- Node.js and npm: For running Laravel Mix/Webpack builds.
- Git: For source control and deployments.

## PHP (Composer) dependencies

Typical categories for this Laravel project:

- `laravel/framework` – Core Laravel framework.
- Database & ORM – Eloquent using the MySQL driver (`DB_CONNECTION=mysql`).
- Authentication / authorization – Laravel’s built-in auth plus any role/permission packages you add.
- Mail / notifications – Laravel mail and notification components and any mail/SMS/API SDKs.
- HTTP client – For integrations with external services (e.g. a client like Guzzle).
- Utility packages – Logging, dates, file handling, PDF/Excel exports, queues, etc., depending on what you’ve included.

The exact list and versions are defined in `composer.json` under `require` and `require-dev`.

## JavaScript (npm) and Laravel Mix / Webpack

Because the project uses Laravel Mix with Webpack:

- `laravel-mix` – Abstraction layer over Webpack for defining build steps.
- `webpack` and loaders/plugins – For bundling JS, CSS, and other assets.
- Frontend framework (if used) – For example `vue` / `vue-template-compiler` or `react` and related packages.
- CSS framework & tooling – For example Tailwind or Bootstrap, plus Sass/Less and PostCSS tooling.
- Developer tooling – Linters and test tools, such as `eslint`, `prettier`, or `jest`, if configured.

The exact JS dependencies are defined in `package.json` under `dependencies` and `devDependencies`.

Common asset commands:

```bash
npm run dev # development build
npm run watch # watch mode during development
npm run production # optimized build for production
```


