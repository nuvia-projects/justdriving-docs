---
sidebar_position: 2
---

# Testing Guide

This guide explains how to approach testing in Just Driving so changes are safe and regressions are caught early. It focuses on what to test, where to put tests, and how to run them as part of everyday development.

## Testing goals

Testing in Just Driving aims to:

- Prove that core flows (registration, bookings, payments, notifications) work as expected.
- Catch breaking changes in the data model, permissions, and integrations.
- Make refactoring safe by providing fast feedback.

The goal is confidence, not 100% coverage at all costs. Start with the most critical paths and expand over time.

## Types of tests

Use different types of tests for different concerns:

- Unit tests  
  - Test small pieces of logic in isolation (for example, calculators, mappers, helpers).  
  - Fast and cheap, good for business rules that do not depend on HTTP or the database.

- Feature / HTTP tests  
  - Exercise entire endpoints or controllers through HTTP-style requests.  
  - Verify routing, validation, authorization, and responses.  
  - Ideal for internal API endpoints that the frontend depends on.

- Integration tests  
  - Test how multiple components work together (models, jobs, notifications, queues).  
  - Often use the test database and fake external services.

- Browser / end‑to‑end tests (optional)  
  - Simulate real user flows in the browser.  
  - Use sparingly for the most critical user journeys (for example, “student signs up and books a lesson”).

## What to test first

Prioritise the most important and fragile parts of the system:

- Authentication and permissions  
  - Login and logout.  
  - Role-based access (admin, school admin, teacher, student).  
  - School and department scoping (users must not see other schools’ data).

- Core flows  
  - Student registration and onboarding.  
  - Creating and managing bookings.  
  - Lesson plan progress and signatures.  
  - Invoices, payments, and balance calculations.

- Integrations  
  - Handling of payment notifications from the payment gateway.  
  - SMS and email triggering (using fakes/mocks rather than real calls).  
  - Any data import/export that could affect many records at once.

Once these are covered, expand tests to edge cases, error handling, and less‑critical features.

## General testing practices

Follow these principles when adding or updating tests:

- One behavior per test  
  - Each test should verify one clear behaviour or scenario.  
  - Name tests after what they prove (for example, “student_cannot_see_other_schools_bookings”).

- Clear arrange–act–assert structure  
  - Set up data and state.  
  - Perform the action (call an endpoint, run a job).  
  - Assert the expected outcome (response, database changes, side effects).

- Use factories and helpers  
  - Use model factories or helper methods to create realistic data (schools, departments, users, bookings, invoices).  
  - Avoid duplicating large setup blocks in every test.

- Avoid coupling to implementation details  
  - Test behaviour and outcomes rather than private internals.  
  - This keeps tests useful when implementation changes.

## Testing permissions and scoping

Permissions and scoping are critical in Just Driving; tests should cover:

- Which roles can access each endpoint or action.  
- That users only see data belonging to their school (and department when relevant).  
- That “forbidden” and “not found” are used correctly when access is denied.

When adding a new endpoint or feature:

- Add at least one test for the “happy path” with a user who has permission.  
- Add tests for roles that must be blocked (teacher vs admin, student vs staff).  
- Add tests that verify scoping by school and department.

## Testing integrations safely

External systems (payments, SMS, email, theory platforms, discovery sites) should be tested without hitting real services:

- Fake or mock external calls  
  - Replace real network calls with fakes that assert what would have been sent and return controlled responses.  
  - Ensure the surrounding logic reacts correctly to success and failure.

- Simulate webhooks and callbacks  
  - Construct realistic payloads that match the provider’s format.  
  - Send them to your webhook endpoints in tests.  
  - Verify that internal records (payments, invoices, notifications) are updated as expected.

- Use environment separation  
  - Never depend on real credentials or real external services in automated tests.  
  - Tests should run reliably on any developer machine and in CI.

## Running tests in daily work

To keep tests useful:

- Run a relevant subset frequently  
  - For example, run tests for the module you’re working on (bookings, finance, API) before committing.  
  - Run the full test suite before merging to main/master or before deployments when possible.

- Keep tests fast  
  - Use the in‑memory or dedicated test database.  
  - Avoid unnecessary sleeps or external calls.  
  - Clean up data between tests to avoid hidden dependencies.

- Fix broken tests quickly  
  - Treat failing tests as a sign either the code or the test needs updating.  
  - Avoid leaving tests red for long periods; it reduces trust in the suite.

## When adding new features

Every new feature or significant change should come with tests that answer:

- Does it work in the happy path?  
- Is access correctly restricted to the right roles and schools?  
- How does it behave when inputs are invalid or external systems fail?

If you are unsure what to test for a specific feature, start by writing down the main user flows and failure modes, then convert those into tests.
