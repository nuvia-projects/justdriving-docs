---
sidebar_position: 1
---

# Add a New Endpoint

This guide explains how to add a new HTTP endpoint to the Just Driving backend so it fits the existing architecture, security model, and documentation.

## 1. Clarify the purpose of the endpoint

Before touching code, define:

- What problem the endpoint solves.
- Which resource it works with (for example, students, bookings, invoices).
- Which actions it exposes (read data, create, update, delete, trigger a side effect).
- Which roles should be allowed to use it (admin, school admin, teacher, student).

Write this down in a short description; it will be reused in code comments and documentation.

## 2. Decide where the endpoint lives

Decide:

- Is it part of the internal API used by the web frontend?
- Is it meant for background jobs or integrations only?
- Is it part of a specific domain (students, bookings, finance, notifications)?

Use the existing route and controller structure as a guide. New endpoints should:

- Use the existing API base path (for example under `/api/...`).
- Reuse or extend existing controllers when working on the same resource.
- Follow the existing naming conventions for URLs and methods (for example, REST style where possible).

## 3. Define input, output, and errors

For the new endpoint, specify:

- Input:
  - HTTP method (GET, POST, PUT/PATCH, DELETE).
  - Required and optional parameters (in path, query string, or JSON body).
- Output:
  - Data returned on success (resource shape or list).
  - Whether it returns a single object, a collection, or just a status.
- Errors:
  - Typical validation errors.
  - Authorization failures.
  - Not‑found situations.

Keep the JSON structure consistent with existing endpoints in the same area.

## 4. Apply authentication and authorization

For every new endpoint:

- Require authentication unless there is a clear reason to stay public.
- Make sure role‑based access control is enforced:
  - Check the user’s role (admin, school admin, teacher, student).
  - Scope data by school and department where relevant (a user must not see or modify data from another school).
- Reuse existing authorization policies or gates if possible; add new ones only when really needed.

If in doubt, start with the most restrictive access and relax as needed.

## 5. Implement domain logic consistently

When implementing the endpoint’s behavior:

- Reuse existing services or domain classes instead of duplicating logic.
- Keep controllers thin: let them handle request parsing, authorization, and calling domain services.
- Make sure side effects are handled in a predictable way:
  - Database changes follow the existing transaction patterns.
  - Background jobs are used for slow or external operations (emails, SMS, payments, external APIs).

Align naming and structure with similar endpoints so future developers can predict how it works.

## 6. Validate and handle errors

Ensure the endpoint:

- Validates all input data:
  - Required fields are present.
  - Types and formats are correct (dates, emails, IDs, etc.).
- Returns clear error messages for validation failures without exposing sensitive details.
- Uses appropriate HTTP status codes:
  - Success (200/201/204)
  - Validation error (422)
  - Unauthorized (401)
  - Forbidden (403)
  - Not found (404)
  - Server error (5xx, only for unexpected situations)

Consistency here makes the frontend and other consumers easier to maintain.

## 7. Document the endpoint

Update the internal API documentation so others can use the new endpoint. For each endpoint, include:

- Short description of what it does and why.
- URL path and HTTP method.
- Required authentication and roles.
- Parameters:
  - Path parameters.
  - Query parameters.
  - Body fields (if applicable).
- Response:
  - Structure of the success response.
  - Important fields and their meanings.
- Common error cases and their status codes.

Place this description in the appropriate section of the internal API reference so it matches related endpoints.

## 8. Test end‑to‑end

Before deploying:

- Add or update automated tests where possible (unit, feature, or integration tests).
- Test with realistic data:
  - Authorized user in the correct role.
  - User without permissions (should be blocked).
  - Invalid input (should give validation errors).
- Verify that related flows (UI screens, background jobs, integrations) behave correctly when they rely on the new endpoint.

Once tests pass and documentation is updated, the endpoint is ready to be deployed with confidence.
