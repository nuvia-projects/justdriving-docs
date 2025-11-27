---
sidebar_position: 3
---

# Frontend Structure

This page describes how the frontend of Just Driving is structured, including the organization of Blade templates, the approach to CSS and JavaScript, and how frontend assets are built and served.

## Overview

The frontend of Just Driving is built primarily using Laravel Blade templates for server-rendered views. JavaScript and CSS are used to add interactivity and styling on top of the Blade views. Assets are compiled and bundled using Laravel Mix (or a similar build tool) and are typically run with `npm run watch` during development.

## Blade views

Blade templates live under `resources/views` and are organized by area to match the controller namespaces:

- `resources/views/admin/` – views for the admin area.
- `resources/views/school/` – views for school staff and teachers.
- `resources/views/student/` – views for the student dashboard and features.
- `resources/views/web/` – views for public-facing pages.

Within each directory, views typically match REST controller actions:

- `index.blade.php` for list views.
- `show.blade.php` for detail views.
- `create.blade.php` and `edit.blade.php` for form views.

Blade layouts and partials (shared headers, footers, sidebars, etc.) are often placed in `resources/views/layouts/` or a similar directory to keep common markup reusable across different areas of the site.

## JavaScript and CSS

JavaScript and CSS source files are kept under `resources/` (for example, `resources/js/` and `resources/css/` or `resources/sass/`).

- **JavaScript** is typically written in plain JavaScript or using a lightweight framework/library where needed (for example, Vue.js components in some sections if that is part of your setup).
- **CSS** may be written using plain CSS, Sass, or a framework such as Tailwind CSS (adjust this if you use a specific CSS framework).

These files are compiled and bundled via Laravel Mix (or Vite, if the project has migrated). The compiled assets end up in `public/js/` and `public/css/` and are linked from Blade templates using helpers like `asset()` or `mix()`.

## Build tooling

The frontend build process uses:

- **npm** to install JavaScript dependencies (see `package.json`).
- **Laravel Mix** (or another build tool) to compile and bundle CSS and JavaScript.

Common commands:

- `npm install` – install frontend dependencies.
- `npm run dev` – compile assets once for development.
- `npm run watch` – compile assets and watch for changes (recommended for active development).
- `npm run prod` – compile and minify assets for production.

During development, run `npm run watch` so your changes to JavaScript and CSS are automatically recompiled.

## Frontend libraries and frameworks

If specific frontend libraries or frameworks are used (for example, Vue.js, Alpine.js, jQuery, or a CSS framework like Tailwind or Bootstrap), list them here briefly so new developers know what tools are available and how they are loaded into the application.

(Adjust this section based on what you actually use; if it is just vanilla JS and plain CSS, you can simplify or remove this paragraph.)
