---
sidebar_position: 5
---

# Indexing Strategies

This page describes the general indexing strategy used in the Just Driving database and highlights important patterns to follow when adding new tables or queries. The goal is to keep read and write performance acceptable as data grows, especially around bookings, invoices, and notifications.

## General principles

The indexing approach in Just Driving follows a few simple rules:

- Every table has a primary key (typically an auto‑incrementing `id`).
- Foreign keys and join columns that participate in common `WHERE` or `JOIN` clauses are indexed.
- Composite indexes are added where queries frequently filter by more than one column (for example, `notifiable_type` + `notifiable_id`).
- Indexes are added to columns used for lookups and filtering, but avoided on columns that are frequently updated and not part of critical queries.

When adding new features, think about which queries will run most often and index accordingly.

## Foreign key and relationship indexes

Relationship tables and foreign keys are some of the most important places to add indexes. Common patterns include:

- **Link tables** (for example, school–teacher, school–student, booking–student, class–student) should have indexes on both foreign key columns so joins and lookups are efficient.
- **Child tables** that belong to a parent via `school_id`, `teacher_id`, `student_id`, or `school_class_id` should have indexes on these foreign keys, because queries often filter by "all rows for this school/teacher/student/class".
- **Pivot tables** that are used in many‑to‑many relationships should also have composite indexes on both sides of the relationship where appropriate.

As a rule of thumb: if a column is used in joins or commonly used to filter by a parent entity, it should have an index.

## Time-based and status queries

Many queries in Just Driving are time‑ or status‑based, for example:

- Upcoming bookings for a given teacher or student.
- Recent invoices and payments.
- Recent notifications for a user.

For these cases, consider:

- Indexing `date` or `datetime` columns that are frequently used in `WHERE` clauses (e.g. `date_from`, `date_to`, `due_date`, `created_at` when used with a parent key).
- Combining a foreign key with a status or date in a composite index if queries often filter by both (for example, `school_id + status`, or `teacher_id + date_from`).

The general pattern is to support queries of the form "give me all X for this Y in this time range" with an appropriate index.

## High-traffic tables

Some tables naturally receive more reads/writes and benefit from careful indexing:

- **Bookings and booking–student links**  
  These tables are central for scheduling and are often queried by school, teacher, student, and date range. Ensure lookups by `school_id`, `teacher_id`, `student_id`, and relevant date/status fields are efficient.

- **Invoices, invoice items, payments, and student balances**  
  These are used in financial reports and student account overviews. Queries often involve `school_id`, `student_id`, `due_date`, and `date_payed`. Indexes on these fields (and combinations) keep financial pages responsive.

- **Notifications and logs**  
  If the system stores notification records or audit logs and often filters by `notifiable_type`, `notifiable_id`, and `read_at`/`created_at`, composite indexes on these columns improve performance.

When you add new high-traffic features, monitor which queries run most often (for example via query logs) and adjust indexes based on real usage.

## Text and search fields

Free‑text fields (for example, notes, long descriptions) are usually not indexed, unless a specific search feature requires them to be.

- For simple "contains" searches across small datasets, no special index might be necessary.
- For larger search or full‑text search needs, consider using:
  - MySQL full‑text indexes (where supported) on selected columns, or
  - Offloading search to a dedicated search engine (not covered here).

Avoid adding normal B‑tree indexes to large text columns unless you know they are needed.

## Adding indexes safely

When adding new indexes:

- Prefer adding them via migrations so changes are tracked and reproducible.
- Be aware that adding indexes on very large tables can temporarily lock the table or impact performance in production.
- Where possible, test new indexes in a staging environment with realistic data volume before applying them in production.
