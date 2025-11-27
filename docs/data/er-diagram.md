---
sidebar_position: 3
---

# ER Diagrams

This page shows entity–relationship (ER) diagrams for the most important parts of the Just Driving data model. The goal is to give developers a visual view of how entities connect, complementing the textual descriptions from the Entities and Relationship Overview pages.

## Schools, departments, teachers, and students

This diagram focuses on how schools, departments, teachers, and students are linked.



```mermaid
erDiagram
    SCHOOL ||--o{ SCHOOL_DEPARTMENT : has
    SCHOOL ||--o{ SCHOOL_TEACHER : has
    SCHOOL ||--o{ SCHOOL_STUDENT : has
    SCHOOL_DEPARTMENT ||--o{ SCHOOL_CLASS : has
    SCHOOL_DEPARTMENT ||--o{ SCHOOL_TEACHER : has
    SCHOOL_DEPARTMENT ||--o{ STUDENT : groups

    SCHOOL_TEACHER }o--|| TEACHER : links
    SCHOOL_STUDENT }o--|| STUDENT : links

    SCHOOL ||--o{ SCHOOL_CLASS : has
    SCHOOL_CLASS }o--o{ STUDENT : enrolls

```

- A school can have many departments, teachers, students, and classes.  
- Departments group classes, teachers, and students under a school.  
- Link tables connect teachers and students to schools so a person can be associated with more than one school if needed.

## Classes, bookings, and lesson plans

This diagram shows how classes, bookings, booking types, lesson plans, and modules connect.

```mermaid
erDiagram
    SCHOOL ||--o{ SCHOOL_CLASS : has
    SCHOOL ||--o{ BOOKING : has
    SCHOOL ||--o{ LESSON_PLAN : has
    SCHOOL ||--o{ BOOKING_TYPE : has
    SCHOOL_CLASS ||--o{ SCHOOL_CLASS_STUDENT : has
    SCHOOL_CLASS_STUDENT }o--|| STUDENT : links

    SCHOOL_CLASS }o--|| LESSON_PLAN : uses

    BOOKING }o--|| SCHOOL : belongs_to
    BOOKING }o--|| TEACHER : taught_by
    BOOKING }o--|| BOOKING_TYPE : of_type

    BOOKING ||--o{ BOOKING_STUDENT : has
    BOOKING_STUDENT }o--|| STUDENT : attends

    LESSON_PLAN ||--o{ LESSON_PLAN_MODULE : has
    LESSON_PLAN_MODULE ||--o{ LESSON_PLAN_MODULE_PENSUM : covers
    LESSON_PLAN_MODULE_PENSUM }o--|| PENSUM : references

```


- Classes link students to a specific course/lesson plan.  
- Bookings represent concrete scheduled events and are typed via booking types.  
- Lesson plans and modules structure the educational content and are connected to bookings and classes via configuration and usage.

## Finance: invoices, payments, and balances

This diagram focuses on the core financial entities.

```mermaid
erDiagram
    SCHOOL ||--o{ STUDENT_INVOICE : has
    SCHOOL ||--o{ STUDENT_PAYMENT : has
    SCHOOL ||--o{ INVOICE_SERVICE : offers
    SCHOOL ||--o{ STUDENT_BALANCE : tracks
    STUDENT ||--o{ STUDENT_INVOICE : billed
    STUDENT ||--o{ STUDENT_PAYMENT : pays
    STUDENT ||--o{ STUDENT_BALANCE : has

    STUDENT_INVOICE ||--o{ STUDENT_INVOICE_DATA : has
    STUDENT_INVOICE_DATA }o--|| INVOICE_SERVICE : describes

    STUDENT_INVOICE ||--o{ STUDENT_PAYMENT : settled_by
```


- Each school issues invoices and receives payments; these are tied to students.  
- Invoice data (line items) describes what a student is billed for, often referencing invoice services.  
- Student balances summarize the net financial position for each student.

## Education, pensum, and signatures

This diagram shows how lesson plans tie into pensum and signatures.

```mermaid
erDiagram
    LESSON_PLAN ||--o{ LESSON_PLAN_MODULE : has
    LESSON_PLAN_MODULE ||--o{ LESSON_PLAN_MODULE_PENSUM : covers
    LESSON_PLAN_MODULE_PENSUM }o--|| PENSUM : references
    PENSUM }o--|| PENSUM_PART : belongs_to
    LESSON_PLAN_MODULE ||--o{ LESSON_PLAN_MODULE_SIGNATURE : signed
    LESSON_PLAN_MODULE_SIGNATURE }o--|| STUDENT : by_student
    LESSON_PLAN_MODULE_SIGNATURE }o--|| TEACHER : by_teacher
    LESSON_PLAN_MODULE_SIGNATURE }o--|| SCHOOL_CLASS : in_class
```


- Pensum and pensum parts represent curriculum requirements.  
- Lesson plan modules reference pensum entries to ensure the required content is covered.  
- Signatures create an audit trail showing which student and teacher signed off each module and in which class.
