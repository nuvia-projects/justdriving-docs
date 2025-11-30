---
sidebar_position: 3
---

# Deprecation Notices

This page lists features, APIs, and integrations that are deprecated or planned for removal in Just Driving. It explains what is changing, why, and how developers and schools should migrate.

Use this page to identify anything you should stop using and to plan upgrades before removals happen.

## How deprecation works

For each deprecation, the project should define:

- What is being deprecated (feature, endpoint, setting, integration, workflow).
- The version in which it was first marked as deprecated.
- The version in which it is planned to be removed (or “TBD” if not yet decided).
- Recommended replacement or migration path.
- Any required actions for:
  - Developers (code changes, configuration updates).
  - Operators (deployment or environment changes).
  - Schools and end users (UI changes, changed behavior).

Deprecated items should continue to work until the removal version, but may show warnings or limited support.

## Current deprecations

Use this section to track active deprecations. Example structure:

### [Feature or API name]

- Status: Deprecated
- First deprecated in: vX.Y.Z
- Planned removal in: vA.B.C (or TBD)
- Affected area:
  - Example: Internal API, booking UI, finance module, external integration.
- Reason:
  - Example: Replaced by a more secure API, better data model, or new provider.
- Impact:
  - Who is affected and how (developers, schools, specific roles).
- Migration path:
  - What should be used instead.
  - Steps to migrate (code changes, configuration updates, data migration).
- Notes:
  - Any known caveats or temporary limitations.

Add one subsection like this for each deprecation.

## Removed features and APIs

When a deprecated item is fully removed, move it to this section and update:

- The version in which it was removed.
- A summary of the impact.
- Confirmation that the replacement is stable and supported.

Example structure:

### [Removed feature or API name]

- Removed in: vA.B.C
- Replacement: [new feature or API name]
- Notes:
  - Any long-term support or compatibility concerns.

## Responsibilities and communication

To keep deprecations manageable:

- Developers:
  - Avoid using deprecated APIs or features in new code.
  - Plan migration work in advance of removal versions.
- Operators:
  - Stay aware of deprecation timelines when planning upgrades.
  - Communicate upcoming changes to schools where behavior will differ.
- Documentation:
  - Update this page when something is deprecated or removed.
  - Cross-link from relevant feature or API docs so users see deprecation notices in context.

Keeping deprecation notices clear and up to date helps the platform evolve without surprising developers or users.
