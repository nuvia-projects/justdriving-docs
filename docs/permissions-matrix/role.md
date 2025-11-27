---
sidebar_position: 1
---

# Role Allowed Actions

This page gives a high-level overview of what each main role in Just Driving is allowed to do. It is meant as a quick reference for developers when adding new features or checking access control.

## Roles

For the purpose of this documentation, we distinguish between the following roles:

- **Global Admin** – manages the overall platform and all schools.
- **School Admin/Owner** – manages a single school (or a set of schools) and its data.
- **Teacher** – works within a school, teaching students and managing their bookings and progress.
- **Student** – attends classes and lessons, manages their own bookings and payments.

(If your implementation uses slightly different names or additional roles, adjust this section to match.)

## High-level permissions matrix

The table below summarizes which roles can perform which actions at a high level. “Yes” means the role is generally allowed to perform the action, “No” means it is not, and “Limited” means there are extra conditions or scope restrictions (for example, only within their own school or department).

| Area / Action                              | Global Admin | School Admin/Owner | Teacher | Student |
|-------------------------------------------|--------------|--------------------|---------|---------|
| Manage platform-wide settings             | Yes          | No                 | No      | No      |
| Create / edit / deactivate schools        | Yes          | No                 | No      | No      |
| Configure integrations (email/SMS/payments) | Yes        | Yes (per school)   | No      | No      |
| View all schools                          | Yes          | No                 | No      | No      |
| View school dashboard                     | Yes          | Yes                | Limited | No      |
| Manage school departments                 | Yes          | Yes                | No      | No      |
| Manage teachers in a school               | Yes          | Yes                | No      | No      |
| Manage students in a school               | Yes          | Yes                | Limited | No      |
| View own students / assigned students     | Yes          | Yes                | Yes     | No      |
| View all students in a school             | Yes          | Yes                | Limited | No      |
| Manage lesson plans and modules           | Yes          | Yes                | Limited | No      |
| Record teaching and module completion     | Yes          | Yes                | Yes     | No      |
| Sign lesson modules as teacher            | Yes          | Yes                | Yes     | No      |
| Sign lesson modules as student            | No           | No                 | No      | Yes     |
| Create and manage bookings                | Yes          | Yes                | Yes     | Limited |
| Assign students to bookings               | Yes          | Yes                | Yes     | Limited |
| Cancel bookings                           | Yes          | Yes                | Yes     | Limited |
| View own bookings                         | Yes          | Yes                | Yes     | Yes     |
| View school schedule                      | Yes          | Yes                | Limited | No      |
| Create and manage classes (course groups) | Yes          | Yes                | Limited | No      |
| Enroll students in classes                | Yes          | Yes                | Limited | No      |
| Create and manage invoices                | Yes          | Yes                | Limited | No      |
| Register payments                         | Yes          | Yes                | Limited | No      |
| View own invoices and payments            | Yes          | Yes                | Yes     | Yes     |
| View financial reports per school         | Yes          | Yes                | No      | No      |
| Configure email/SMS templates             | Yes          | Yes                | No      | No      |
| Trigger email/SMS notifications           | Yes          | Yes                | Limited | Limited |
| Manage education content (videos, tests)  | Yes          | Yes                | Limited | No      |
| Take theory tests / access theory content | No           | No                 | No      | Yes     |
| Manage support content and help sections  | Yes          | Yes                | No      | No      |
| Manage user accounts (password reset, lock/unlock) | Yes | Yes (within school) | No  | No      |

> **Note:** “Limited” usually means:
> - A **Teacher** is limited to data for their own school and often only their own students or department.
> - A **Student** is limited to their own data (profile, bookings, progress, invoices, payments).

## Using this matrix as a developer

When implementing new features or modifying existing ones:

- Decide which role(s) should be able to access the feature.
- Check whether the action is **global**, **per school**, or **per user** and scope your queries accordingly.
- Enforce checks at both:
  - The **route/controller** level (authorization), and
  - The **query level** (only return records the current user is allowed to see).

More detailed breakdowns of how Admin, Teacher, and Student permissions differ, including branch‑specific and feature‑level restrictions, are described in the other pages under the **Permissions Matrix** section.
