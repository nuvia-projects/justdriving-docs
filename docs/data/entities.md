---
sidebar_position: 2
---

# Entities

This section describes the main business entities in Just Driving and how they relate conceptually. Use this together with the ER and Mermaid diagrams.

## Student

- Represents a person learning to drive, associated with one driving school.
- Key concepts:
  - Personal info (name, contact, address, birthdate).
  - Linked to one or more classes (holds) and many bookings.
  - Can submit ratings/reviews for schools.

## Teacher

- Represents a driving instructor employed by a driving school.
- Key concepts:
  - Personal and contact info.
  - Belongs to a specific school (and optionally a department).
  - Has a schedule made up of bookings and may be attached to classes (hold).

## School

- Represents a driving school using Just Driving.
- Key concepts:
  - School profile (name, CVR, address, contact info).
  - One school has:
    - Many departments.
    - Many students and teachers.
    - Many classes (hold), bookings, booking types, and ratings.
  - School-level settings (email templates, reminder behavior, etc. in related tables).

## Class (Hold)

- Represents a teaching group or course at a school (e.g. a theory class or package).
- Key concepts:
  - Belongs to one school (and optionally a department and teacher).
  - Has configuration: max students, start/end dates and times, price, signup fee, category, status.
  - Linked to many students via a join table and can be linked to bookings (for class sessions).

## LessonPlan

- Represents a structured lesson plan or course plan attached to a class or school.
- Key concepts:
  - May reference default lesson plan structures (templates) and modules.
  - Used to define the sequence and content of teaching (e.g. theory and practical modules).
  - Can be attached to school classes to standardize what students go through.

## Booking

- Represents a scheduled activity between a student and a teacher/school (lesson, class session, etc.).
- Key concepts:
  - Belongs to a school and a teacher and can be linked to a class and booking type.
  - Has time period (start, end), status, and location.
  - Linked to one or more students via a separate booking-student relation.
  - Can be associated with payments and notifications.

## Booking Type

- Represents the type/category of a booking (e.g. practical lesson, theory lesson, test drive).
- Key concepts:
  - Belongs to a school.
  - Defines default duration, category, and price for bookings of that type.
  - Used when creating bookings to standardize behavior and pricing.

## Invoice (conceptual)

- Represents billing documents for students or schools.
- Even if not a separate table in the current schema, conceptually includes:
  - Reference to student, school, and one or more bookings.
  - Amounts, due dates, and status (draft, sent, paid, cancelled).
- Payment records can be linked to invoices or directly to bookings depending on your implementation.

## Payment

- Represents a financial transaction related to one booking (or invoice).
- Key concepts:
  - Belongs to a booking.
  - Stores amount, currency, status (pending, paid, refunded), provider, and provider reference.
  - Used to track whether a booking has been paid and via which channel.

## Rating

- Represents feedback from a student about a school.
- Key concepts:
  - Belongs to a school and a student.
  - Contains numeric rating and optional comment.
  - Used to measure quality and student satisfaction.

