---
sidebar_position: 4
---

# Indexing strategies

This section describes general indexing strategies suitable for the Just Driving MySQL schema (bookings, students, teachers, classes, payments), so queries stay fast as data grows.

## General principles

- Always have primary keys on all tables (already true in a standard Laravel schema).
- Ensure all foreign key columns that appear in JOINs or WHERE clauses are indexed.
- Add composite indexes for the most common query patterns (e.g. “bookings by school + date range + status”).
- Avoid adding “random” indexes; every index should support a known query pattern.

## Recommended indexes for core entities

You can adapt the names to your own style (`idx_*` or Laravel’s default index names).

- Bookings (table `bookings`)
  - Typical queries: upcoming bookings for a teacher, bookings for a class, school-wide calendar views, filtering by status and date.
  - Recommended:
    - Index on `(teacher_id, start)` for “teacher calendar” queries.
    - Index on `(school_id, start)` for school-wide planning.
    - Index on `(school_class_id, start)` if class-based views are common.
    - Optional: `(status, start)` if you frequently filter by status and date (e.g. only confirmed upcoming bookings).

  Example:

```mysql
CREATE INDEX idx_bookings_teacher_start
ON bookings (teacher_id, start);
```
```mysql
CREATE INDEX idx_bookings_school_start
ON bookings (school_id, start);
```
```mysql
CREATE INDEX idx_bookings_class_start
ON bookings (school_class_id, start);
```


- Booking–student relation (table `booking_student`)
- Typical queries: list students per booking, find all bookings for a student.
- Recommended:
  - Index on `booking_id`.
  - Index on `student_id`.


```mysql
CREATE INDEX idx_booking_student_booking
ON booking_student (booking_id);
```
```mysql
CREATE INDEX idx_booking_student_student
ON booking_student (student_id);
```


- Students and teachers (tables `students`, `teachers`)
- Typical queries: look up by school and name/email, list all for a school.
- Recommended:
  - Index on `(school_id)` for both.
  - Optional: composite index on `(school_id, last_name)` or `(school_id, email)` if those searches are common.

- School classes (table `school_classes`)
- Typical queries: upcoming/active classes per school or department.
- Recommended:
  - Index on `(school_id, start_date)`.
  - Optional: `(school_id, status, start_date)` if you often filter on active/completed.

- Payments (table `payments` or equivalent)
- Typical queries: payments per booking, per school, per date range and status.
- Recommended:
  - Index on `booking_id`.
  - Optional: `(status, created_at)` or `(school_id, created_at)` for financial reports.

## Operational hints

- Use `EXPLAIN` on your slow queries to verify that MySQL actually uses the indexes you add.
- Revisit indexing when introducing new features or heavy reports (e.g. monthly payroll or revenue dashboards).
- Be mindful that each additional index adds write overhead; prioritize indexes that clearly support your most frequent and most expensive queries.

You can refine this section further by listing specific queries (SQL or Eloquent) and matching them to the index that supports them.
