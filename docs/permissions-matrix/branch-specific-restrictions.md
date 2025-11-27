---
sidebar_position: 3
---

# Branch-Specific Restrictions

This page describes how access is restricted when schools have multiple departments/branches. The goal is to clarify what data a user can see and modify when departments are involved, especially for teachers and school staff.

## Departments and scoping

In multi‑branch schools, departments are used to group:

- Teachers
- Students
- Classes
- Bookings

Key ideas:

- A department belongs to exactly one school.
- Teachers and students are linked to both a school and optionally a department.
- Many screens in the system should show only data for the user’s department by default, with options for school‑wide views where allowed.

## Global Admin

Global Admins are not restricted by department:

- Can view and manage all schools, departments, teachers, students, classes, bookings, and finances.
- Can switch between schools and departments for support and troubleshooting.
- Should always use explicit school/department filters when running sensitive operations to avoid mistakes.

In code, Global Admin checks typically bypass department scoping but should still respect school selection where relevant.

## School Admin/Owner

School Admins/Owners have full access within their school, but can also work with departments:

- Can view and manage all departments in their school.
- Can view all teachers and students in the school, regardless of department.
- Can view and manage all classes and bookings across departments.
- Can move students and teachers between departments when needed (for example, reassigning a teacher to a new branch).

By default, school admins may see data across departments, but the UI can still provide department filters for clarity.

## Teacher

Teachers are usually scoped to their department (or departments) within a school:

- Can see:
  - Their own bookings and schedule.
  - Students they teach (even if they are technically in another department, depending on configuration).
  - Classes they are assigned to teach.
- May be limited to:
  - Only seeing students and bookings in their own department.
  - Only editing bookings and classes where they are the responsible teacher.

Common patterns:

- Teacher dashboards default to “own department + own data”.
- Teachers cannot change department‑level settings or move users between departments unless given explicit permissions.

If you support multi‑department teachers, you can allow a teacher to be linked to several departments and scope queries to all departments they belong to.

## Student

Students are scoped to their own school and, if used, their own department:

- Can only see their own data (profile, bookings, classes, invoices, payments, progress).
- Do not see department information or other students in their department.
- Their department is mostly used for internal organization (grouping in lists, reporting, and scheduling).

In practice, students are unaware of departmental structure and only interact with their own schedule and school‑level information.

## Practical notes for developers

When working with departments in code:

- Always include `school_id` in queries; department checks should never cross school boundaries.
- When a user belongs to one or more departments, scope queries by:
  - School (always).
  - Department(s) (for teachers and department-level staff where appropriate).
- For Global Admin, allow bypassing department restrictions but still require explicit selection of school to avoid accidental cross‑school operations.

When adding new features:

- Decide whether the feature is:
  - School‑wide (visible to admins across all departments), or
  - Department‑specific (restricted to a department and its users).
- Apply the same scoping logic consistently across lists, detail views, and reports.
