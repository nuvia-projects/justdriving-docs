---
sidebar_position: 2
---

# Version History

This page provides a chronological overview of Just Driving versions, focusing on what changed between releases. It complements the high-level Release Notes by listing more detailed, developer-oriented information.

Use this page to understand when specific features were introduced, modified, or removed, and to identify which version a deployment is running.

## How to read this history

- Versions are listed from newest to oldest.
- Each entry includes:
  - Release date.
  - Summary of changes.
  - Notes about database migrations, configuration changes, and breaking changes.
- Internal ticket or issue IDs can be linked where useful.

## v1.0.0 – [Date]

- First stable production release for schools.
- Includes:
  - Online administration system (schools, teachers, students, departments).
  - Booking system (classes, bookings, calendars).
  - Financial management (invoices, payments, student balances).
  - Permissions model (admin, school admin/owner, teacher, student).
  - Initial integrations (payments, SMS, email, external platforms).
- Database:
  - Baseline schema for production.
- Notes:
  - Starting point for future migrations and hotfixes.

## v0.9.1 – [Date]

- Fixes:
  - Addressed early feedback from pilot schools (stability and UX fixes).
  - Resolved issues in booking and notification flows.
- Improvements:
  - Refined permissions and scoping rules.
  - Improved logging and error handling in critical paths.
- Database:
  - Minor non-breaking schema adjustments.

## v0.9.0 – [Date]

- Pre-release for internal testing and pilot use.
- Includes:
  - Core data model and internal API.
  - Basic frontend flows for admin and school staff.
  - Initial external integration hooks (without full automation).
- Database:
  - Initial schema creation for development and staging.
- Notes:
  - Not recommended for production; used for internal validation.

## Earlier versions and prototypes

Before v0.9.0, the project may have had:

- Prototypes, spikes, or experimental branches.
- Non-versioned early iterations of the database and UI.

These are not formally tracked here and should not be used as reference for production behavior.

---

When adding new releases:

- Append a new section at the top with the new version number and date.
- Summarize changes clearly enough for both developers and operators.
- Note any special upgrade steps (migrations, config changes, data cleanup) that deployments must follow.
