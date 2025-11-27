---
sidebar_position: 3
---

# Platforms

This section gives a high-level overview of the main platforms involved in the Just Driving ecosystem and how they relate to each other. It is intended for new developers who need to understand which systems are in play and where data and traffic typically flow.

## Overview of connected platforms

The Just Driving solution interacts with three main platforms:

- **Just Driving**  
  The core management platform for driving schools and students. It handles school configuration, users (students and teachers), bookings, lesson plans, payments, and notifications. From a developer perspective, this is the primary application and codebase you will work on.

- **e-teori.dk**  
  An external theory and learning platform used to deliver online theory content and tests to students. Just Driving integrates with e-teori.dk so that students registered in a school can access theory material and their activity or results can be linked back to the student’s overall progress.

- **findkoreskole.dk**  
  A public-facing site used by potential students to discover and compare driving schools. Just Driving connects to findkoreskole.dk so that schools managed in Just Driving can be exposed to new students, and incoming leads or registrations can be tied back to the correct school and student records in the core platform.

## How the platforms work together

At a conceptual level, the three platforms play different roles in the overall flow:

- **Student acquisition** often starts on findkoreskole.dk, where a student discovers a driving school and initiates contact or registration.
- **Core management** of the student, their bookings, payments, and lesson plans happens inside Just Driving, which stores the authoritative data for schools, teachers, and students.
- **Theory training and tests** can be delivered through e-teori.dk, while Just Driving keeps track of which students are connected and how this relates to their overall learning journey.

As a developer, you should see Just Driving as the central system and e-teori.dk and findkoreskole.dk as external platforms that integrate with it through defined flows and interfaces. Later sections of the documentation (for example, **System Architecture** and **API & Integrations**) describe the technical details of these integrations.

