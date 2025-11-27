---
sidebar_position: 4
---

# Data Flow Diagrams

This page describes how data flows through the Just Driving system for common use cases. It complements the ER diagrams by showing the sequence and direction of data movement across entities when typical workflows are executed.

## Overview

Data flow diagrams focus on:

- Which entities are read from and written to during a workflow.
- The order in which data is created or updated.
- Where background jobs, notifications, or external integrations fit into the flow.

Understanding these flows helps developers see how changes in one part of the system affect related entities and helps with debugging, performance optimization, and feature development.

## Student registration and school enrollment

This flow describes what happens when a new student signs up and is enrolled in a school.


```mermaid
sequenceDiagram
    participant User as Potential student
    participant Web as Web controller
    participant Student as Student entity
    participant SchoolStudent as School-student link
    participant Invoice as Student invoice
    participant Email as Email queue

    User->>Web: Submit registration form
    Web->>Student: Create student record
    Web->>SchoolStudent: Link student to school
    Web->>Invoice: Create initial invoice (if applicable)
    Web->>Email: Queue welcome email
    Email-->>Student: Send welcome and login info

```


- A new student record is created with contact and login details.
- The student is linked to a school via the school–student join table.
- An initial invoice may be created (for example, signup fee or first course payment).
- A welcome email with login credentials is queued and sent asynchronously.

## Booking creation and student assignment

This flow describes how a teacher or school staff member creates a booking and assigns students to it.

```mermaid
sequenceDiagram
    participant Teacher as Teacher/School staff
    participant Web as Web controller
    participant Booking as Booking entity
    participant BookingStudent as Booking-student link
    participant Notification as Notification queue

    Teacher->>Web: Create booking (date, time, type, location)
    Web->>Booking: Store booking record
    Teacher->>Web: Assign students to booking
    Web->>BookingStudent: Create booking-student links
    Web->>Notification: Queue confirmation email/SMS
    Notification-->>BookingStudent: Send notifications to students

```


- A booking is created with details such as date, time, teacher, booking type, and address.
- One or more students are assigned to the booking via the booking–student link.
- Notifications (email and/or SMS) are queued to inform students of the new booking.

## Lesson completion and signature

This flow describes what happens when a lesson or module is completed and signed off by both student and teacher.


```mermaid
sequenceDiagram
    participant Teacher as Teacher
    participant Student as Student
    participant Web as Web controller
    participant Signature as Lesson plan module signature
    participant Module as Lesson plan module
    participant Notification as Notification queue

    Teacher->>Web: Mark module as completed and sign
    Web->>Signature: Create signature record (teacher)
    Web->>Notification: Queue signature request to student
    Notification-->>Student: Send email/SMS to student
    Student->>Web: Review and sign module
    Web->>Signature: Update signature record (student)
    Web->>Module: Mark module as fully signed

```


- The teacher completes a lesson plan module and signs it.
- A signature record is created with the teacher's signature and timestamp.
- The system notifies the student to review and sign the module.
- Once the student signs, the signature record is updated and the module is marked complete.

## Invoice creation and payment

This flow describes how an invoice is created for a student, a payment is registered, and the student's balance is updated.

```mermaid
sequenceDiagram
    participant School as School staff
    participant Web as Web controller
    participant Invoice as Student invoice
    participant InvoiceData as Student invoice data
    participant Payment as Student payment
    participant Balance as Student balance
    participant Email as Email queue

    School->>Web: Create invoice for student
    Web->>Invoice: Create invoice record
    Web->>InvoiceData: Add line items
    Web->>Email: Queue invoice email to student
    Email-->>Student: Send invoice notification
    Student->>Web: Make payment (online or recorded manually)
    Web->>Payment: Create payment record
    Web->>Balance: Update student balance
    Web->>Email: Queue payment confirmation email
    Email-->>Student: Send payment receipt

```


- An invoice is created with one or more line items describing services or fees.
- The student is notified via email.
- When payment is made (online via Stripe or recorded manually), a payment record is created.
- The student's balance is updated to reflect the payment.
- A payment confirmation is sent to the student.

## Notification and background jobs

Many flows in Just Driving trigger asynchronous work via queues. Common patterns include:

- **Email notifications**: Queued jobs send emails for confirmations, reminders, password resets, and invoices.
- **SMS notifications**: Queued jobs send SMS messages via Twilio for booking reminders, cancellations, and urgent alerts.
- **External API calls**: When integrating with platforms like e-teori.dk, findkoreskole.dk, or Stripe webhooks, jobs handle slow or unreliable network operations without blocking HTTP requests.

The flow for a notification is:

```mermaid
sequenceDiagram
    participant Controller as Controller
    participant Queue as Queue (Redis)
    participant Job as Notification job
    participant External as External service (email/SMS)
    Controller->>Queue: Dispatch notification job
    Queue-->>Job: Pick up job from queue
    Job->>External: Send notification
    External-->>Job: Confirm delivery
    Job->>Queue: Mark job complete

```


This pattern keeps the application responsive and allows failed jobs to be retried automatically.
