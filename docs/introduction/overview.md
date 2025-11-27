---
sidebar_position: 2
---

# Overview

Just Driving is a web-based platform that helps driving schools manage students, teachers, classes, bookings, and payments in one place. It connects schools and students through an online experience where students can find a school, sign up, book lessons, and track their progress towards getting a driver’s licence.

The platform is multi-tenant: each driving school has its own data, configuration, and branding, but the core features and workflows are shared. New developers should think of Just Driving as a collection of domain modules that work together to support the daily operations of a driving school.

## Core domains

Just Driving is organized into a set of core domains, each representing a key part of the business:

- **Schools and branches**  
  Manage one or more driving schools, including their departments/branches, contact information, branding, and basic configuration.

- **Users: students and teachers**  
  Represent the main actors in the system: students who sign up for courses and lessons, and teachers who deliver theory and practical driving lessons.

- **Bookings and scheduling**  
  Handle classes, individual driving lessons, availability, and student registrations, so that lessons happen at the right time, with the right teacher, and the right number of students.

- **Lesson plans and education content**  
  Define structured lesson plans and educational content that follow the legal and pedagogical requirements for getting a driver’s licence, and track student progress through them.

- **Finance and payments**  
  Support invoices, student balances, and payments so schools can track what each student owes and has paid, and how that relates to classes and bookings.

- **Notifications and communication**  
  Send relevant notifications (for example, confirmations and reminders) over email and SMS to keep students and teachers informed about important events.

## Typical user journeys

At a high level, most of the system behaviour can be understood through a few repeatable user journeys:

- A student discovers a driving school, registers online, and is created as a student in the system.
- The student signs up for a class or driving course, which creates the necessary relationships between the student, school, teachers, and lesson plans.
- Teachers and school staff create and manage bookings (classes, driving lessons) and assign students to them.
- The system tracks attendance, progress through lesson plans, and any required confirmations or signatures.
- Invoices and payments are managed for each student, and the system updates their financial status and any outstanding balances.
- Throughout these flows, the platform sends notifications so students and teachers know what is happening and what to do next.

## How to read the rest of the documentation

The rest of this documentation breaks the platform down into smaller, focused sections that new developers can learn step by step:

- **System Architecture** shows how the backend, frontend, and external services fit together at a high level.
- **Data Model & Database Schema** explains the main entities, relationships, and data flows that power the core domains.
- **Permissions Matrix** describes how different roles (for example, admin, teacher, student) can interact with the system.
- **Core Modules** dives into each major area (administration, finance, booking, learning) and explains their features and key logic.
- **API & Integrations** covers internal APIs and external integrations such as payment providers and SMS gateways.
- **Developer Guides** provide practical instructions for common developer tasks like adding new endpoints, testing, and deployment.

A new developer should start with this overview, then move on to the System Architecture and Data Model sections to understand how the concepts described here are implemented in code and in the database.