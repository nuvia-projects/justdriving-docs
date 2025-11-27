---
sidebar_position: 1
---

# Entities

This page gives an overview of the main entities in the Just Driving data model. It does not list every column of every table, but instead focuses on how the core domains are represented in the database so new developers can quickly understand the shape of the system.

## Schools and organization

These entities represent driving schools and their internal structure:

- **School**  
  Represents a driving school as a tenant in the system. Stores core information such as name, contact details, branding, settings, and integration configuration (for example, pricing, API visibility, payment setup).

- **School department**  
  Represents branches or departments within a school. Stores localized contact information (address, phone, email) and is used to group classes, teachers, and students under a specific branch.

- **School–teacher link**  
  Connects teachers to schools (and optionally to specific departments). Tracks status/role and allows a single teacher to be associated with one or more schools.

- **School–student link**  
  Connects students to schools and optionally assigns them to a primary teacher. Tracks the student’s status within a school (for example active/inactive).

- **School settings**  
  Stores configuration flags and options for each school, such as SMS settings, terms of service, privacy policy, and behavior for various features.

- **School email settings**  
  Stores per‑school email behavior and template references (for example, which email template to use for registration, reminders, or other events).

## Users and actors

These entities represent the different types of users that interact with the system:

- **Admin**  
  Represents global administrators who manage the overall platform (not tied to a single school). Used for platform-level configuration and oversight.

- **Teacher**  
  Represents driving instructors and school staff. Stores contact information, company/registration details (if applicable), and login credentials. Teachers are linked to schools and departments and are referenced in bookings, lesson plans, and payments.

- **Student**  
  Represents students who are working towards a driver’s licence. Stores personal and contact information, language, progress data (for example, passed courses/tests), and login credentials. Students are linked to schools, departments, classes, bookings, invoices, and payments.

- **Notifications and password resets**  
  Entities such as notification records and password reset tokens support user communication and authentication flows.

## Education and lesson planning

These entities cover lesson plans, modules, and educational content:

- **Lesson plan**  
  Represents a structured plan of lessons for a given category (for example, driver’s licence type). It is usually attached to classes or schools and defines the overall structure of the education.

- **Lesson plan module**  
  Represents a module or section within a lesson plan (for example a sequence of theory or practical lessons). Includes metadata such as type, order, number of lessons, and notes.

- **Lesson plan module pensum / pensum and pensum parts**  
  Represent the educational curriculum requirements (pensum) and link them to specific modules. Used to ensure that required topics are covered and tracked.

- **Lesson plan module signatures and repetitions**  
  Track when modules are taught, repeated, and signed off by students and teachers (including timestamps and signatures). These entities provide an auditable record of teaching and completion.

- **Default lesson plans and modules**  
  Represent reusable, generic lesson plan templates that can be attached to specific booking types or schools and used as starting points for concrete lesson plans.

- **Education / education lessons / education sessions**  
  Represent educational content and lessons that can be presented (for example, slides, videos, and structured sessions), along with active sessions used in a class or live teaching context.

## Classes, bookings, and attendance

These entities drive scheduling and participation:

- **School class**  
  Represents a course or class group within a school (for example, a specific start date, schedule, and capacity). Stores information such as name, max students, price, attached lesson plan, status, and completion date.

- **School class–student link**  
  Associates students with classes, defining which class a student is enrolled in.

- **Booking**  
  Represents a scheduled event such as a driving lesson, theory lesson, or other session. Stores the school, teacher, time range, booking type, license type, location, and status (for example, active, public, cancelled).

- **Booking type**  
  Describes types of bookings (for example, single driving lesson, package, theory session), including pricing, salary parameters, and cancellation rules.

- **Booking–student link**  
  Associates students with individual bookings and tracks their participation and status (for example, booked, cancelled).

## Finance and payments

These entities handle financial aspects for schools and students:

- **Invoice services**  
  Represents services that can be included on invoices (name, VAT, amount).

- **Student invoice**  
  Represents a specific invoice assigned to a student and tied to a school and teacher. Can be linked to products or specific entities (for example, class signup, lesson package).

- **Student invoice data**  
  Represents individual line items and amounts on an invoice, including any cancellation fees.

- **Student payment**  
  Represents payments made by students (amount, method, date, invoice reference, and potential subscription information).

- **Student balance**  
  Tracks the aggregated financial balance for a student within a school, based on invoices and payments.

- **Teacher payment**  
  Represents amounts owed or paid to teachers for their work, linked to bookings, lesson types, and salary rules.

## Content, support, and attachments

These entities store supporting content and documents:

- **School attachments / teacher attachments / student attachments**  
  Store file metadata (title, name, type, mime, size) for files attached to schools, teachers, and students (for example, documents, images, forms).

- **Student notes / teacher notes**  
  Store free‑text notes about students and teachers, usually visible to internal staff.

- **Support sections and videos**  
  Represent internal support content and tutorial videos grouped into sections for easier navigation.

## Tests and progress tracking

These entities represent student testing and theory progress:

- **Student theory test answers**  
  Store results of theory tests taken by students, including number of errors and question data.

- **Ratings**  
  Represent ratings given by students to schools (for example, review score and comments).

- **Student actions**  
  Record important actions taken by or on behalf of students for audit and tracking purposes.

## Signatures and audit trail

These entities support signatures and control:

- **Signatures**  
  Represent stored signatures (for example images or references) including who signed, when, and in what context.

- **Lesson plan module signatures**  
  Link signatures to specific modules, students, teachers, and teaching dates, forming part of the legal/compliance trail.

