---
sidebar_position: 3
---

# Relationship overview

This section explains, in words, how the main entities in Just Driving relate to each other. Use it alongside the ER and Mermaid diagrams.

## School, departments, teachers, students, classes

- A School has many Departments, each with its own contact details and address.
- A School has many Teachers and many Students.
- A School has many Classes (Hold).  
- A Class belongs to one School, may belong to one Department, and may have one Teacher assigned.
- A Class has many Students through the SchoolClassStudent join table (one student can be in multiple classes over time).

## Bookings, booking types, and participants

- A School has many BookingTypes that define the category, duration, and price of different lessons.
- A Booking belongs to one School, one Teacher, and optionally one Class and one BookingType.
- A Booking can have one or more Students linked through the BookingStudent table (individual or group lessons).
- A Student can have many Bookings through BookingStudent.
- A Teacher can have many Bookings directly.

## Payments, invoices, and ratings

- A Booking can have one or more Payments (depending on how you handle partial payments or retries).
- Each Payment belongs to a specific Booking and stores provider/status information.
- Conceptually, an Invoice would group one or more Bookings or charges for a Student, but in the current schema Payments are directly attached to Bookings.
- A Student can create many Ratings, and a School can receive many Ratings.
- Each Rating belongs to exactly one Student and one School, capturing feedback and score.

## Lesson plans and teaching structure

- A School can have one or more LessonPlans (directly or via related lesson-plan tables).
- A LessonPlan can be linked to one or more Classes so that all students in that class follow the same structured plan.
- Individual lessons or modules inside a LessonPlan describe what is taught during each part of the course.

These relationships form the core model of Just Driving: schools organize teachers, students, and classes; bookings connect teachers and students in time; payments and ratings layer on top to cover business and feedback.
