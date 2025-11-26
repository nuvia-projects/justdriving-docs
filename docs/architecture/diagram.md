---
sidebar_position: 1
---

# High-level system diagram

Below is a simple text-based high-level diagram you can use directly in Docusaurus (for example with Markdown, or adapt it to Mermaid/PlantUML later).

## Overview

At a high level, Just Driving is a Laravel (PHP 7.*) web application that connects users via a browser to a MySQL-backed API, integrates with external platforms, and serves different interfaces for Admins, Teachers, and Students.

## Text diagram (ASCII)


```mermaid
sequenceDiagram
    participant Student
    participant Browser
    participant App as Just Driving (Laravel)
    participant DB as MySQL
    participant ET as e-teori.dk
    participant FK as findkoreskole.dk

    Note over Student,Browser: Student wants to book a driving lesson

    Student->>Browser: Open Just Driving
    Browser->>App: HTTP GET / (dashboard / landing)
    App->>DB: Load driving schools, lessons, user data
    DB-->>App: Data result
    App-->>Browser: Render page (schools, lessons, status)

    Note over Student,Browser: Student searches and selects a school

    Student->>Browser: Choose driving school & lesson
    Browser->>App: HTTP POST /bookings
    App->>DB: Create booking record
    DB-->>App: Booking created

    alt Integration with findkoreskole.dk
        App->>FK: Send school/lead info (optional)
        FK-->>App: Acknowledge / response
    end

    alt Integration with e-teori.dk
        App->>ET: Sync / link student (optional)
        ET-->>App: Acknowledge / theory status
    end

    App-->>Browser: Booking confirmation page
    Browser-->>Student: Show confirmation & lesson details


```
