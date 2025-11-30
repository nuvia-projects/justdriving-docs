---
sidebar_position: 2
---

# Logging and Debugging

This page explains how logging and debugging are handled in Just Driving so operators and developers can understand what the system is doing, diagnose issues, and fix problems quickly in all environments.

## Logging goals

Logging should help you:

- See what the application is doing in production without exposing sensitive data.
- Understand the context of errors and unexpected behavior.
- Trace important flows (for example, bookings, payments, notifications) when something goes wrong.

Logs are not just for failures; they are also for visibility into key actions and system decisions.

## What to log

Focus logging on events that matter operationally:

- **Errors and exceptions**  
  - Unhandled exceptions and 5xx responses.  
  - Failed jobs in queues.  
  - Integration failures (payment attempts, SMS/email sends, external API calls).

- **Security‑relevant events**  
  - Login failures and lockouts.  
  - Role or permission changes.  
  - Sensitive configuration changes (without logging the secrets themselves).

- **Key business events**  
  - Creation, update, or cancellation of bookings.  
  - Invoice creation, payment registration, and refunds.  
  - Major configuration changes at school level (for example, enabling/disabling payment gateways).

Avoid logging secrets, full card data, or anything that could violate privacy or compliance requirements.

## Log levels and structure

Use log levels consistently so you can filter and prioritize:

- **Error** – failures that prevent an operation from completing (exceptions, failed jobs, integration errors).  
- **Warning** – unusual but non‑fatal situations (retries, degraded integrations, suspicious input).  
- **Info** – significant normal events (key business events, state changes).  
- **Debug** – detailed information for local troubleshooting; usually disabled in production.

Structure logs so they are easy to search:

- Include identifiers: user ID, school ID, booking ID, invoice ID, payment ID where relevant.  
- Include environment and service name (for example, web, queue worker).  
- Use clear, descriptive messages rather than generic text.

## Environments and retention

Logging behavior differs by environment:

- **Local development**  
  - Verbose logs, including debug level.  
  - Focused on helping developers understand behavior and fix bugs quickly.

- **Staging**  
  - Similar to production but can include more detail.  
  - Used to reproduce and investigate issues before they reach production.

- **Production**  
  - Info and error logs by default; debug logs only enabled temporarily for specific investigations.  
  - Logs should be centrally collected, rotated, and retained according to policy.

Set log retention so you have enough history for incident analysis without consuming excessive storage.

## Debugging workflow

When debugging an issue:

1. **Reproduce the problem**  
   - Identify the user, school, and steps that led to the issue.  
   - Confirm whether it is reproducible in staging or only in production.

2. **Check logs and monitoring**  
   - Look for relevant errors, warnings, or unusual patterns around the time of the incident.  
   - Filter by user ID, school ID, booking ID, or invoice ID if available.

3. **Narrow down the area**  
   - Use log messages, stack traces, and monitored metrics to identify whether the issue is in:  
     - The application logic.  
     - The database.  
     - An external integration.  
     - The infrastructure (network, servers).

4. **Fix and verify**  
   - Apply the fix in a feature branch.  
   - Add or update tests to cover the scenario.  
   - Verify in staging before deploying to production.

5. **Improve observability**  
   - If the issue was hard to diagnose, consider adding or improving log messages or monitoring around that area.

## Good practices for logging and debugging

- Keep logs anonymous where possible and avoid logging personal data unnecessarily.  
- Prefer fewer, higher‑quality log messages over noisy, low‑value logging.  
- When adding new features or integrations, include thoughtful logging from the start.  
- After major incidents, review which logs helped (or did not help) and adjust logging accordingly.

A clear, consistent logging and debugging approach makes it much easier to operate Just Driving reliably over time.
