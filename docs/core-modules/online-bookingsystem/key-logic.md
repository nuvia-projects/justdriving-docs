---
sidebar_position: 3
---

# Key Logic

This page describes the core logic that drives the Online Bookingsystem: how availability, rules, and participants interact to produce valid bookings that other modules can rely on.

## Availability and capacity logic

- Each booking is anchored to a specific time interval, teacher, and school (and optionally department, vehicle, or room).  
- Teacher availability defines when a teacher can be booked; bookings outside these windows are not allowed.  
- Optional capacity rules prevent conflicts, such as:  
  - A teacher being double-booked.  
  - A vehicle or room being assigned to more than one booking at a time.  
- School calendars (opening hours, holidays, blocked periods) further constrain when bookings may occur.

The system evaluates all these constraints together before confirming any booking or change.

## Booking rules and constraints

- Schools configure booking rules that determine:  
  - How far in advance lessons can be booked.  
  - Minimum notice required before making, changing, or cancelling a booking.  
  - Whether students can self-book or must go through staff.  
- The system enforces these rules consistently for all users, returning clear messages when a proposed booking violates them.  
- Additional logic can restrict bookings based on student status (for example, unpaid balances or incomplete prerequisites).

These rules ensure that schedules remain realistic and aligned with school policies.

## Status and lifecycle logic

- Every booking passes through a lifecycle with states such as:  
  - Draft or pending (if approvals or checks are needed).  
  - Confirmed (scheduled and visible to participants).  
  - Completed (lesson took place).  
  - Cancelled (by student, teacher, or school).  
  - No-show (student or teacher did not attend).  
- Who can transition between states is controlled by role and context (student, teacher, admin).  
- Certain transitions may trigger secondary logic, for example:  
  - Late cancellations or no-shows may create fees in the finance module.  
  - Completed bookings may update learning progress and signatures.

This lifecycle ensures that bookings accurately reflect reality over time.

## Relationship to finance and learning

- Finance  
  - Bookings often represent the “unit of service” that is billed.  
  - Completion or certain cancellation states can generate, adjust, or validate invoices and fees.  
  - Rules can decide whether a booking is considered chargeable based on attendance and timing.

- Learning  
  - Each booking can be linked to specific lesson plan elements or modules.  
  - When a booking is marked completed, it can increment a student’s progress or unlock subsequent steps.  
  - Teacher and student confirmations (signatures) can depend on the booking reaching a completed state.

The booking system is therefore a primary driver of both financial and educational records.

## Conflict prevention and consistency

- Before confirming or changing a booking, the system checks for:  
  - Overlapping bookings for the same teacher, student, or resource.  
  - Violations of availability, capacity, and school rules.  
  - Inconsistencies with related records (for example, trying to complete a booking that was never confirmed).

- When conflicts are detected, the system rejects the change and provides a clear reason so users can adjust their request.  
- Consistency rules also ensure that changes propagate correctly:
  - Moving a booking updates all relevant calendars and notifications.  
  - Cancelling a booking updates any dependent financial or learning records according to configured rules.

Together, this key logic keeps the Online Bookingsystem reliable, predictable, and tightly integrated with the rest of Just Driving.
