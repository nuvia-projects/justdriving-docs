---
sidebar_position: 4
---

# Backup and Recovery

This page describes how to approach backups and disaster recovery for Just Driving, ensuring data is safe and the system can be restored quickly after failures or mistakes.

## Goals of backup and recovery

A good backup and recovery strategy ensures that:

- All important data (database, uploads, configuration) is regularly backed up.
- Backups are stored securely and can’t be lost if the main server fails.
- Recovery steps are documented and can be performed quickly (ideally tested regularly).
- Backup routines cover more than just the database (for example, uploaded files, settings not in the DB).

## What to back up

At a minimum, include:

- **Database**  
  - Full snapshots of the production database (all tables and data).
  - Both automatic scheduled backups and on-demand manual backups before risky changes.

- **Uploaded files and assets**  
  - Any files stored outside the database (in a shared folder, cloud storage, or CDN).
  - Snapshots or syncs of file storage to ensure lost servers or data corruption don’t destroy user files.

- **Configuration and secrets (excluding source control)**  
  - Environment files, secrets, connection strings (stored securely, not in code).  
  - Infrastructure configuration or provisioning scripts if maintained outside version control.

## Backup frequency and retention

- Database:  
  - Automatic scheduled backups at least daily (and more often for high-write systems).
  - Retention of at least 7–30 days, with older backups rotated out per policy.

- Files:
  - Scheduled sync/backup of new uploads, frequency based on risk tolerance and volume.
  - Regular verification that file storage is consistent and accessible.

- Offsite storage:
  - Store backups in a different data center or cloud provider than the production server.
  - Encrypt backups at rest.
  - Test access to offsite backups periodically.

## Performing recovery

When an incident occurs (for example, accidental deletion, database corruption, major bug):

- Assess what data needs restoring (entire DB, single table, recent files).
- Retrieve the closest usable backup from before the problem.
- Restore the data to a staging or recovery environment first when possible.
- Validate the restore before bringing systems back online or before restoring to production.
- Communicate with stakeholders (what happened, what was lost/restored, next steps).

Document each step and keep a basic runbook so team members can perform restores even if primary operators are unavailable.

## Testing and validation

Backups are only useful if they work in practice:

- Periodically test restoring from backup to a test environment (not just in an emergency).
- Validate not just the DB but file restores, secrets/configuration restoration, and application startup.
- Fix any gaps in automate backups, scripts, or documentation if testing reveals issues.
- After a restore test, clean up any recovered test environments so old data doesn’t leak.

## Automation and monitoring

- Automate backups and store logs of successful/failed backup runs.
- Set up monitoring and alerts for backup failures or missed schedules.
- Monitor storage usage and retention so backups don’t silently fail due to quota limits.

## Security considerations

- Encrypt backups both in transit and at rest.
- Limit backup access to trusted operators.
- Never store production secrets in unprotected or public locations.
- Remove or destroy expired backups securely.

With a robust, tested backup and recovery strategy, Just Driving can recover from outages, security incidents, and operational mistakes with confidence and minimal data loss.
