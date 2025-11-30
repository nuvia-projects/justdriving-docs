---
sidebar_position: 3
---

# Key Logic

This page explains the core logic that drives the Online Administrationssystem: how schools, departments, users, and permissions fit together, and how changes in this module affect the rest of Just Driving.

## School, department, and user scoping

At the heart of the admin system is the idea of **scope**:

- Every user belongs to exactly one school in their active context; platform admins have a global context across all schools.
- Optional departments/branches allow finer scoping inside a school, so users can be limited to a specific location or unit.
- All major records (students, teachers, bookings, invoices, lesson plans) are associated with a school, and often with a department.

Core rules:

- A user can only access data that matches their school (and department, if applied).
- Cross‑school access is only available to platform‑level roles, never to local school users.
- When a user’s school or department changes, their visible data set changes accordingly, but historical links (old bookings, invoices) remain tied to the original school/department.

## Role-based permissions and capabilities

The admin system applies **role-based access control** on top of scoping:

- **Platform admins**  
  - Global view across all schools and departments.  
  - Can assist with support, configuration, and troubleshooting anywhere on the platform.

- **School admins/owners**  
  - Full control within their school.  
  - Manage departments, configuration, users, and high-level reporting.  
  - Cannot see other schools unless specifically given platform-level rights.

- **Teachers**  
  - Access to their own students, bookings, and teaching-related data.  
  - Limited or no access to financial and global configuration areas.  
  - Often scoped to one department or a subset of students.

- **Students**  
  - Access only to their own data (schedule, progress, invoices, messages).  
  - No access to configuration, other users, or internal school data.

Key logic:

- Permissions are evaluated as a combination of **role** and **scope**.  
- The same role can behave differently depending on whether it is applied at platform or school level.  
- Sensitive actions (role changes, configuration updates, deletions) require roles with explicit administrative capabilities.

## Configuration as the single source of truth

The admin system stores configuration that other modules rely on:

- **Operational rules**  
  - Booking rules (lead time, cancellation windows, allowed times).  
  - Notification rules (which events trigger email/SMS, and to whom).  
  - Learning rules (which lesson plans or modules are available for a given school).

- **Integration settings**  
  - Payment gateway configuration for online payments.  
  - SMS and email provider settings.  
  - Accounting and external learning platform connections.

Key logic:

- Modules do not hard-code behavior; they read from admin-controlled configuration.  
- School-level settings can override platform defaults, allowing different schools to operate differently on the same platform.  
- Changes in configuration are meant to be explicit and auditable, because they directly affect how bookings, payments, and learning behave.

## Lifecycle of users and schools

The admin system governs how entities move through their lifecycle:

- **Schools**  
  - Created (often by platform admins) with initial configuration.  
  - May become active, suspended, or archived depending on contracts and usage.  
  - Archiving a school stops new activity while preserving historical data.

- **Users**  
  - Created or invited into a school.  
  - Assigned an initial role and scope (school, department).  
  - May change roles or departments over time.  
  - Can be deactivated when they leave, without losing historical records.

Key logic:

- Deactivation never deletes important operational data (bookings, invoices, progress).  
- Historical integrity is preserved: past records continue to reference the original school, department, and user, even if those users are later deactivated or reassigned.  
- Certain transitions (for example, changing a student’s school) trigger additional checks or follow-up tasks, because they affect finance, bookings, and learning.

## Impact on other modules

Because the admin system defines structure and access, it influences:

- **Booking logic**  
  - Which teachers and students can be matched.  
  - Which time slots are allowed, based on school and department rules.  
  - Which users can create, edit, or cancel bookings.

- **Financial logic**  
  - Which school “owns” an invoice or payment.  
  - Which configuration controls payment methods and integrations.  
  - Which staff users are allowed to see or manage financial data.

- **Learning logic**  
  - Which lesson plans are available for a given school.  
  - Which teachers can sign off on progress for which students.  
  - Which students appear in which teaching and reporting views.

The key principle is that the Online Administrationssystem defines **who, where, and under which rules**, while other modules define **what happens** within that structure.
