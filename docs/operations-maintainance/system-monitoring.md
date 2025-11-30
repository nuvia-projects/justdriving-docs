---
sidebar_position: 1
---

# System Monitoring

This page describes how to monitor the Just Driving platform in production so issues are detected early and performance stays acceptable. It focuses on what to watch, where to watch it, and how to react.

## Monitoring goals

System monitoring should help you:

- Know when the application is slow, failing, or unavailable.
- Spot problems with background jobs, queues, and scheduled tasks.
- Detect issues with external integrations (payments, SMS, email, third‑party APIs).
- Understand long‑term trends in load and resource usage.

The aim is to see problems before users report them, and to have enough data to diagnose root causes.

## What to monitor

At a minimum, monitor these areas:

- Availability  
  - Is the main application reachable (uptime checks on key URLs)?  
  - Are API endpoints responding with acceptable status codes and latency?

- Performance  
  - Response times for key pages and APIs.  
  - Database query performance and slow queries.  
  - Queue processing times and backlog size.

- Errors  
  - Application exceptions and 5xx responses.  
  - Failed jobs in queues.  
  - Repeated failures in external calls (payments, SMS, email, external APIs).

- Resources  
  - CPU and memory usage on servers.  
  - Disk space (especially for logs and backups).  
  - Database and cache service health.

## Tools and dashboards

Use a combination of tools to get a complete picture:

- Application monitoring  
  - APM or error tracking tools to capture exceptions, slow transactions, and traces.  
  - Dashboards for request rates, error rates, and latency.

- Infrastructure monitoring  
  - Server and database metrics (CPU, memory, disk, connections).  
  - Container or VM dashboards if applicable.

- Log aggregation  
  - Centralized log collection with search and filtering.  
  - Ability to correlate logs around specific time windows or incidents.

- Uptime checks  
  - External services that periodically call key endpoints and alert if they fail or slow down.

Keep links to all monitoring dashboards in one internal place so operators can find them quickly.

## Alerts and thresholds

Configure alerts so they are useful but not noisy:

- Define thresholds for:  
  - Uptime (for example, main app endpoint not responding).  
  - Error rate spikes (for example, sudden increase in 5xx responses).  
  - Queue backlog (jobs waiting too long).  
  - Resource exhaustion (disk space, CPU, memory).

- Route alerts to the right channels:  
  - On‑call channel (chat, email, SMS) for urgent production issues.  
  - Less urgent channels for warnings or trends that need attention but not immediate action.

- Review and adjust thresholds periodically to reduce false positives and avoid alert fatigue.

## Monitoring critical flows

Some flows are more critical than others and deserve extra attention:

- Authentication and access  
  - Login/logout success rates.  
  - Unexpected spikes in failed logins.

- Bookings and scheduling  
  - Success rate for creating and updating bookings.  
  - Errors in calendar or availability endpoints.

- Payments and invoices  
  - Success and failure rates for payment attempts.  
  - Webhook processing status for payment providers.  
  - Mismatches or delays between external payment status and internal records.

- Notifications  
  - Email and SMS queue sizes.  
  - Delivery failures and bounces.

Create checks or dashboards that specifically track these flows so you can see their health at a glance.

## Operational routines

To keep monitoring effective over time:

- Regular reviews  
  - Periodically review dashboards and alerts for trends.  
  - Adjust thresholds and add new checks when new features or integrations are introduced.

- Incident reviews  
  - After significant incidents, review what monitoring showed (or missed).  
  - Improve dashboards and alerts based on those learnings.

- Documentation  
  - Document where monitoring dashboards live and how to interpret them.  
  - Keep a short runbook for common alerts (what to check first, who to contact, typical fixes).

Good monitoring, combined with clear alerting and simple routines, makes operating Just Driving in production more predictable and less stressful.
