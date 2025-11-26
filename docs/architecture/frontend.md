---
sidebar_position: 3
---

# Frontend structure

The frontend for Just Driving is built on top of Laravel’s asset pipeline using Laravel Mix with Webpack. All frontend source code lives under the `resources/` directory and is compiled to the `public/` directory for the browser.

## Directory layout

- `resources/views/`
  - Blade templates (or layout shells) used to render server-side HTML.
  - Typically contains:
    - Layouts (e.g. `layouts/app.blade.php`).
    - Entry points for different areas: admin, teacher, student dashboards, authentication pages, etc.
  - Often used to bootstrap a JS app (e.g. mounting a Vue/React root component).

- `resources/js/`
  - Main JavaScript SPA or page logic.
  - Common structure:
    - `resources/js/app.js` – main entry file referenced by Laravel Mix.
    - `resources/js/components/` – reusable UI components (e.g. `LessonList`, `BookingForm`, `StudentTable`).
    - `resources/js/pages/` – page-level components/views (e.g. `AdminDashboard`, `TeacherSchedule`, `StudentDashboard`).
    - `resources/js/services/` or `api/` – wrappers for HTTP calls to backend routes (e.g. booking API, school search).
    - `resources/js/store/` – state management (Vuex/Pinia/Redux/etc.) if used.

- `resources/css/` or `resources/sass/`
  - Stylesheets used by Laravel Mix.
  - Can contain:
    - Global styles (e.g. `app.css` / `app.scss`).
    - Partial files for components, layout, and utilities.
    - Configuration for CSS frameworks (e.g. Tailwind/Bootstrap).

## Entry points and bundling

- Laravel Mix configuration in `webpack.mix.js` defines how assets are built, for example:

  - Compiling JS:
    - `resources/js/app.js` → `public/js/app.js`
  - Compiling CSS/SCSS:
    - `resources/css/app.css` or `resources/sass/app.scss` → `public/css/app.css`

- Blade templates include the compiled assets, e.g.:
  - `<link rel="stylesheet" href="{{ mix('css/app.css') }}">`
  - `<script src="{{ mix('js/app.js') }}" defer></script>`

## Role-based UI structure (recommended)

To keep the UI maintainable around Admin, Teacher, and Student roles, it is recommended to group views/components:

- Admin:
  - `resources/js/pages/admin/*`
  - `resources/js/components/admin/*`
- Teacher:
  - `resources/js/pages/teacher/*`
  - `resources/js/components/teacher/*`
- Student:
  - `resources/js/pages/student/*`
  - `resources/js/components/student/*`

Each area can have its own navigation and dashboard while reusing shared components from a common directory (e.g. `resources/js/components/common/*`).

---

If you share your actual `resources/` tree later, this section can be updated to reflect the exact files and frameworks you use (Vue/React/Alpine, Tailwind/Bootstrap, etc.).
