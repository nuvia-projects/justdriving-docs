---
sidebar_position: 3
---

# Error Handling

This page describes how errors should be handled in Just Driving so the system fails safely, users see clear messages, and operators have enough information to diagnose problems.

## Goals of error handling

Error handling should ensure that:

- The system degrades gracefully instead of crashing where possible.
- Users get helpful, non-technical feedback without leaking sensitive details.
- Developers and operators can see what went wrong through logs and monitoring.
- Repeated or expected failure modes are handled predictably.

## Types of errors

In practice, most errors fall into a few categories:

- Validation errors  
  - Input data is missing, invalid, or inconsistent.  
  - The user should correct something and try again.

- Authorization and authentication errors  
  - The user is not logged in or does not have permission.  
  - The system should block access and show a clear message.

- Business rule violations  
  - The requested action breaks domain rules (for example, booking in the past, cancelling too late, paying an already paid invoice).  
  - The system should explain why the action is not allowed.

- System and integration errors  
  - Database or infrastructure issues.  
  - Failures in external services (payments, SMS, email, external APIs).  
  - The system should handle these gracefully, log details, and avoid data corruption.

## Behavior in the UI and API

For both web UI and internal API endpoints:

- Validation issues  
  - Return clear messages pointing to specific fields.  
  - Do not proceed with partial or inconsistent data.

- Unauthorized / forbidden  
  - Redirect to login when not authenticated.  
  - Show a “not allowed” message when the user lacks permission.  
  - Avoid revealing whether a resource exists when access is denied.

- Not found  
  - Show a neutral “not found” or 404 response.  
  - Do not leak internal identifiers or structure.

- Unexpected errors  
  - Show a generic error message to the user.  
  - Log the full details on the server with context (user, school, action).

API responses should use consistent HTTP status codes (400/422, 401, 403, 404, 5xx) and structured JSON error bodies.

## Handling external integration failures

For external systems (payments, SMS, email, accounting, learning platforms):

- Never assume the external call always succeeds.  
- Handle timeouts, network errors, and provider-side failures explicitly.  
- Do not lose or corrupt data if an external call fails; instead:
  - Roll back the operation when necessary, or  
  - Mark it as pending/failed for later retry.

If an integration is temporarily unavailable:

- Avoid blocking the entire application if possible.  
- Tell users that the specific feature is temporarily unavailable.  
- Log the failure and, where appropriate, enqueue a retry.

## Retrying and idempotency

For operations that can safely be retried (for example, sending notifications, processing webhooks):

- Use background jobs to manage retries with backoff.  
- Ensure operations are idempotent:
  - Processing the same event or webhook more than once should not create duplicates or corrupt state.  
  - Use stable external IDs or internal flags to detect previously handled events.

Retries should be limited and logged so persistent failures can be investigated.

## Communication and follow-up

After significant errors or incidents:

- Record what happened, impact, and resolution steps.  
- Improve error messages, logging, and validation if they were unclear.  
- Add or extend tests for the scenario so the same issue is less likely to recur.

A consistent error-handling strategy makes Just Driving more resilient and easier to operate, even when things go wrong.
