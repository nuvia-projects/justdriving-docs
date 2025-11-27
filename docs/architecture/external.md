---
sidebar_position: 4
---

# External Systems

This page describes the external platforms and services that Just Driving integrates with and how they fit into the overall architecture. Understanding these integrations is important for developers working on features that send data outside the core application or rely on external functionality.

## Overview

Just Driving connects to several external systems to provide a complete experience for schools and students. These integrations can be grouped into:

- **External platforms** that extend the core functionality (e-teori.dk for theory content, findkoreskole.dk for school discovery).
- **Infrastructure services** that handle cross-cutting concerns such as email, SMS, and payments (Mailtrap/SparkPost, Twilio, Stripe).

## External platforms

### e-teori.dk

e-teori.dk is an external platform used to deliver online theory content and tests to students.

- **Purpose**: Provide theory learning materials and tests that students need as part of their driver's licence education.
- **Integration approach**: Just Driving links student accounts to e-teori.dk so that students registered in a school can access theory material. Progress, test results, or completion status may be synchronized back to Just Driving to track the student's overall learning journey.
- **Configuration**: API credentials or integration details are typically stored in environment variables and Laravel config files.

### findkoreskole.dk

findkoreskole.dk is a public-facing site where potential students discover and compare driving schools.

- **Purpose**: Allow new students to find and connect with driving schools managed in Just Driving.
- **Integration approach**: Schools in the Just Driving platform can be exposed on findkoreskole.dk, and incoming leads or student registrations are tied back to the correct school and student records in the core platform.
- **Configuration**: Integration details (API keys, endpoints) are managed via environment variables.

## Infrastructure services

### Mailtrap and SparkPost (Email)

Email is used for notifications, confirmations, reminders, password resets, and other communication with students, teachers, and admins.

- **Mailtrap**: Used in development and testing environments to capture outgoing emails in a safe inbox so real emails are not sent.
- **SparkPost**: Used in production to deliver emails reliably at scale.
- **Configuration**: SMTP or API settings are managed via `.env` and `config/mail.php`. Development environments should point to Mailtrap; production environments should point to SparkPost.

### Twilio (SMS)

Twilio is the SMS provider used to send text messages to students and teachers for notifications, reminders, and alerts.

- **Purpose**: Send SMS notifications in real-time to keep users informed about bookings, cancellations, and other important events.
- **Configuration**: Twilio credentials (account SID, auth token, sender phone number) are stored in environment variables.
- **Usage**: SMS sending is typically wrapped in queued jobs to avoid blocking HTTP requests.

### Stripe (Payments)

Stripe is the payment gateway used to handle online payments and manage payment registrations for students.

- **Purpose**: Process online payments, manage subscriptions (if applicable), and track payment events via webhooks.
- **Configuration**: Stripe API keys (public and secret) and webhook secrets are configured via environment variables.
- **Usage**: Payment flows are typically handled in dedicated controllers or services, and webhook events (for example, successful payments, failed charges) are processed via dedicated webhook endpoints.

## Integration patterns

When working with external systems, Just Driving follows these general patterns:

- **Environment-based configuration**: All external service credentials and endpoints are stored in `.env` and Laravel config files, never hard-coded.
- **Background jobs**: Slow or unreliable external calls (such as sending SMS or syncing data to external platforms) are typically wrapped in queued jobs to keep the application responsive.
- **Error handling**: External API calls may fail, so integration code should handle errors gracefully (log failures, retry where appropriate, notify users if necessary).
- **Webhook endpoints**: Services like Stripe use webhooks to notify the application of external events. These are handled via dedicated routes and controllers that validate and process incoming webhook payloads.
