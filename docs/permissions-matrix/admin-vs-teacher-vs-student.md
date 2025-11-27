---
sidebar_position: 2
---

# Admin vs Teacher vs Student

This page compares what Admins, Teachers, and Students can see and do in the Just Driving platform. It helps developers understand how features should behave for each role and what data each role can access.

## Role overview

- **Global Admin**  
  Works at the platform level. Can see and manage all schools and their data. Used mainly by platform operators.

- **School Admin/Owner**  
  Works at the school level. Can see and manage everything within a specific school (and its departments), including teachers, students, classes, bookings, and finances.

- **Teacher**  
  Works within a school. Focuses on teaching, bookings, and student progress. Has limited access to school configuration and finances.

- **Student**  
  End user working toward a driver’s licence. Can see and manage their own profile, bookings, progress, and payments, but not other users’ data.

## What each role can see

| Area / Data                        | Global Admin                  | School Admin/Owner                            | Teacher                                             | Student                              |
|-----------------------------------|-------------------------------|-----------------------------------------------|-----------------------------------------------------|--------------------------------------|
| List of all schools               | Yes                           | No                                            | No                                                  | No                                   |
| School details                    | Yes (all schools)            | Yes (own school)                              | Limited (own school, no global settings)           | No                                   |
| Departments / branches            | Yes (all)                    | Yes (own school)                              | Limited (own department/school)                    | No                                   |
| Teachers                          | Yes (all)                    | Yes (own school)                              | Limited (peers in own school/department)           | No                                   |
| Students                          | Yes (all)                    | Yes (own school)                              | Limited (students they teach or within their scope) | Own data only                        |
| Classes / course groups           | Yes (all)                    | Yes (own school)                              | Limited (classes they teach or are assigned to)    | Classes they are enrolled in         |
| Bookings / schedule               | Yes (all)                    | Yes (own school)                              | Yes (their own and often school schedule view)     | Own bookings only                    |
| Invoices and payments             | Yes (all)                    | Yes (own school)                              | Limited (if allowed, typically for own students)   | Own invoices and payments only       |
| Lesson plans, modules, pensum     | Yes (all)                    | Yes (own school)                              | Yes (for school and classes they teach)            | Read-only where relevant to them     |
| Notifications log                 | Yes (all)                    | Yes (own school)                              | Limited (their own and sometimes their students)   | Own notifications only               |

“Limited” means that visibility is scoped to the user’s school and often further restricted to their own department, assigned students, or personal records.

## What each role can do

| Action / Feature                       | Global Admin              | School Admin/Owner                     | Teacher                                   | Student                                |
|----------------------------------------|---------------------------|----------------------------------------|-------------------------------------------|----------------------------------------|
| Create and edit schools                | Yes                       | No                                     | No                                        | No                                     |
| Configure school settings              | Yes (any school)          | Yes (own school)                       | No                                        | No                                     |
| Configure integrations (email/SMS/payments) | Yes (global/per‑school) | Yes (own school)                       | No                                        | No                                     |
| Manage departments                     | Yes                       | Yes                                    | No                                        | No                                     |
| Create/edit teachers                   | Yes                       | Yes                                    | No                                        | No                                     |
| Create/edit students                   | Yes                       | Yes                                    | Limited (only students they work with)    | No                                     |
| Enroll students in classes             | Yes                       | Yes                                    | Limited (within own classes)              | No                                     |
| Create/edit lesson plans and modules   | Yes                       | Yes                                    | Limited (for their school/subjects)       | No                                     |
| Record teaching / mark modules taught  | Yes                       | Yes                                    | Yes                                       | No                                     |
| Sign modules as teacher                | Yes                       | Yes                                    | Yes                                       | No                                     |
| Sign modules as student                | No                        | No                                     | No                                        | Yes                                    |
| Create/edit bookings                   | Yes                       | Yes                                    | Yes                                       | Limited (e.g. request or self‑booking) |
| Cancel bookings                        | Yes                       | Yes                                    | Yes                                       | Limited (subject to rules/time limits) |
| Create/edit invoices                   | Yes                       | Yes                                    | Limited (if allowed; often no)            | No                                     |
| Register payments                      | Yes                       | Yes                                    | Limited (if used by staff role)           | No (online payment only)               |
| Pay invoices online                    | No                        | No                                     | No                                        | Yes                                    |
| View reports and school‑wide statistics| Yes (all schools)         | Yes (own school)                       | Limited (e.g. their own students)         | No                                     |


## Practical notes for developers

- Always check both the **role** and the **school scope** when authorizing actions. For example, a teacher should not be able to act on another school’s data even if the route exists.
- When adding new features, decide:
  - Which roles should have access.
  - Whether access is global (all schools), per school, or only for the current user’s own records.
- Apply checks in both:
  - Authorization (policies, middleware, or gate checks).
  - Queries (ensure queries are scoped to the current user’s school and/or user ID).

As the permission model evolves (for example, adding office staff or special roles), this page can be updated to reflect the new roles and their allowed actions.
