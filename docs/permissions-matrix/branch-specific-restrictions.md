---
sidebar_position: 3
---

# Branch-specific restrictions

This section describes how access and behavior can be restricted per branch/department within a school.

## Visibility per department (branch)

- Teachers
  - A teacher assigned to a specific department should only see:
    - Students that belong to that department (or are enrolled in its classes).
    - Classes (hold) created under that department.
    - Bookings that involve them or their department’s classes.
  - They should not see internal data from other departments unless explicitly allowed by the school.

- Students
  - A student associated with a specific department:
    - Primarily sees classes and booking options for that department.
    - May be restricted from enrolling into classes in other departments unless explicitly enabled (e.g. cross-branch enrollment).

## Booking & class restrictions

- Class creation and management
  - Classes are scoped to a department via `school_department_id`.
  - Only admins (or department managers) for that department can:
    - Create/edit classes in that department.
    - Assign teachers and students to those classes.

- Booking scope
  - Bookings created by a department:
    - Must reference a teacher and class within the same department, unless cross-department rules are explicitly supported.
  - Department-level rules can control:
    - Which booking types are available.
    - Time ranges (opening hours) and locations.

## Configuration and permissions

- Department-level configuration
  - Each department can have its own:
    - Contact info (email, phone, address).
    - Default settings (e.g. reminder behavior, allowed booking windows).
  - Admins can control whether:
    - Teachers can see students from other departments.
    - Students can choose classes/teachers in other departments.

- Role + branch combinations
  - Admin:
    - Can see and manage all departments by default.
  - Department admin / manager (if used):
    - Full control within a single department (teachers, students, classes, bookings for that department).
  - Teacher:
    - Restricted to own department’s data and own bookings.
