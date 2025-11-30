---
sidebar_position: 4
---

# Best Practices

This page explains recommended approaches for working with the Just Driving codebase and platform. Following these best practices helps make the system reliable, maintainable, and easy for new developers to join.

## General development practices

- **Keep code simple and clear**  
  Prefer clarity over cleverness. Short, readable functions and well-named variables make the codebase easier to understand.

- **Follow existing conventions**  
  When adding new code (routes, models, services), match the style and patterns already in use. Consistency matters more than personal preference.

- **Document decisions**  
  When making substantial decisions (new patterns, tradeoffs), add a short note in the relevant docs or code comments. Include why you chose a particular approach.

- **Write and update tests**  
  Any new feature, bug fix, or refactor should come with tests that clarify expected behavior. Fix failing tests before merging changes.

## Modular and reusable code

- **Re-use services and helpers**  
  When new features overlap existing capabilities, try to reuse or extend existing domain/service classes rather than duplicating logic.

- **Separate concerns**  
  Controllers should focus on handling requests, validation, and responses—not on complex business rules or direct data manipulation.

- **Encapsulate integrations**  
  Any communication with external services (payment, SMS, email, third-party APIs) should be isolated in adapter or gateway classes, not spread across business logic.

## Secure and robust systems

- **Sanitize and validate input**  
  Always validate user data using Laravel’s validation features, both in controllers and form requests.

- **Enforce authorization**  
  Check user roles and permissions consistently on all endpoints and commands. Never rely on frontend restrictions alone.

- **Handle sensitive data carefully**  
  Never log or expose secrets, passwords, or confidential user data. Keep secrets in the environment, not in code or version control.

- **Review and monitor error handling**  
  Handle exceptions explicitly where possible and make sure logs include enough context for troubleshooting. Avoid catching all exceptions without re-throwing or logging.

## Collaboration and code review

- **Use branches and pull requests**  
  Work on clearly named branches for features, fixes, or experiments. Open pull requests for all significant changes, describing the “what” and the “why.”

- **Code review for all changes**  
  All changes should be reviewed by another developer, even if the team is small. Reviews catch issues early and help share knowledge.

- **Keep changes focused**  
  Each pull request should do just one thing: a feature, a fix, or a refactor—not a mix of many unrelated changes.

- **Update documentation**  
  When changing or adding major features, update user or developer docs as part of the same pull request.

## Deployment hygiene

- **Never deploy untested code**  
  All changes should pass automated tests and basic manual checks in a staging or review environment before hitting production.

- **Apply migrations carefully**  
  Review database migrations, especially those that touch large tables or could cause downtime.

- **Monitor after deployment**  
  Check logs, error reporting, and key user flows after each deployment to catch regressions or environment-specific issues.

## Communication and learning

- **Ask questions early**  
  If you’re unsure about requirements, architecture, or existing patterns, ask before guessing.

- **Share context**  
  When fixing tricky bugs or making non-obvious changes, explain what you discovered and why you made a particular choice—in comments, commit messages, or docs.

- **Reflect and improve**  
  After each project, deployment, or incident, set aside time to recap what went well and what can be done better next time.

Following these best practices makes the codebase better and team communication easier, letting you move faster and more safely as the platform
