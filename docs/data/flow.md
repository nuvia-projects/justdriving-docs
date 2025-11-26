---
sidebar_position: 1
---

# Data flow diagrams 
**(Booking → Payment → Invoicing → Payroll)**

Below is a high-level data flow for the financial side of Just Driving, from booking creation through payment, invoicing, and payroll.



```mermaid
sequenceDiagram
participant Student
participant Web as Just Driving UI
participant App as Backend (Laravel)
participant DB as MySQL
participant Pay as Payment Provider
participant Acc as Accounting/Payroll System
Note over Student,Web: 1) Booking

Student->>Web: Select school, class/lesson, time
Web->>App: Create booking request
App->>DB: Insert booking (status = "pending")
DB-->>App: Booking ID and data
App-->>Web: Booking confirmation (pending payment)

Note over Student,Web: 2) Payment

Student->>Web: Confirm and pay online
Web->>App: Start payment (booking_id, amount)
App->>Pay: Create payment / checkout session
Pay-->>App: Payment result (success/failure, reference)
App->>DB: Store payment record + update booking status
App-->>Web: Show payment result to student

Note over App,DB: 3) Invoicing

App->>DB: Generate or update invoice data (per booking or batched)
DB-->>App: Invoice records (amounts, VAT, status)
App->>Acc: Sync invoice/transaction data (periodic job or webhook)
Acc-->>App: Ack / sync status (optional)

Note over App,Acc: 4) Payroll

App->>Acc: Provide teacher lesson/payment data (per period)
Acc-->>App: Payroll confirmation (salaries, fees calculated)
Note right of Acc: Used by finance to pay instructors



```