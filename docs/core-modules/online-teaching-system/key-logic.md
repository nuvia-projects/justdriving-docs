---
sidebar_position: 3
---

# Key Logic

This page describes the core logic behind the learning system: how lesson plans are structured, how progress is calculated, and how teaching activity becomes verifiable training history.

## Structure of lesson plans and modules

- Lesson plans are built from ordered modules and steps that reflect legal and pedagogical requirements for driver training.  
- Each module specifies:
  - Learning goals and content scope (for example, basic maneuvers, city driving, highway driving, night driving).  
  - Whether it is theory, practical, or mixed.  
  - Prerequisites (modules or conditions that must be completed first).

Key logic:

- Students are typically attached to one primary lesson plan at a time, but variations or extra modules can be added when needed.  
- The system uses prerequisites and ordering to determine which modules can be worked on next.

## Linking bookings to learning progress

- Practical and theory bookings are the events where learning actually happens.  
- Each booking can be associated with one or more lesson plan steps:
  - Before the lesson, the teacher or system indicates which modules will be covered.  
  - After the lesson, the teacher confirms which parts were actually completed.

Key logic:

- A module or step is not considered complete until:
  - A relevant booking has taken place, and  
  - The teacher has confirmed that the required content was taught (and optionally that the student demonstrated the necessary skills).  
- Multiple bookings may contribute to a single module when content requires repeated practice.

## Progress calculation and readiness

- For each student, the system keeps a structured record of:
  - Which modules are not started, in progress, or completed.  
  - Dates and bookings associated with each completed element.  
  - Any missing required steps that could block exam readiness.

Key logic:

- A module’s status is derived from its steps:
  - If no related steps have been taught, it is “not started”.  
  - If at least one step is completed but others remain, it is “in progress”.  
  - When all required steps are completed and confirmed, it is “completed”.  
- Readiness for exams or milestones is determined by:
  - Completion of specific compulsory modules.  
  - Optional checks on time order (for example, certain modules must be done before others).

## Signatures and verification

- The learning system supports digital confirmations from:
  - Teachers, certifying that a module or lesson has been delivered to the required standard.  
  - Students, acknowledging that they received and participated in the training.

Key logic:

- A “fully verified” step typically requires both teacher and student confirmation, according to local rules.  
- Signatures are tied to concrete bookings and timestamps, forming a traceable audit trail.  
- Once a step is locked/verified, later edits must be explicit and auditable to preserve trust in the record.

## Interaction with other modules

- **Booking system**  
  - Provides the time and context where learning occurs.  
  - Completion and status changes in bookings directly influence learning progress.

- **Administration system**  
  - Controls which lesson plans are available at each school.  
  - Governs which roles can modify lesson plans or override progress.

- **Finance system**  
  - Can use learning progression to:
    - Determine which packages or modules have been “delivered” for billing.  
    - Optionally restrict further lessons until certain payments or milestones are reached.

The key principle is that the learning system treats lesson plans as structured contracts between school, teacher, and student, and uses bookings, confirmations, and signatures to turn those contracts into verifiable educational history.
