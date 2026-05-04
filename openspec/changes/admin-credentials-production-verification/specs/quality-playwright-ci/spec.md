# Capability: quality-playwright-ci (delta)

## ADDED Requirements

### Requirement: Automated admin tests do not imply production credential verification

The Playwright suite’s **admin sign-in** tests **SHALL** target **development seed credentials** (or credentials injected by CI secrets for non-production databases). Passing CI **SHALL NOT** by itself prove that **production** admin credentials or Auth configuration are correct.

#### Scenario: Default pipeline uses documented dev admin

- **WHEN** the repository’s default CI configuration runs admin Playwright scenarios without custom secret injection
- **THEN** those tests **SHALL** authenticate using the **development** seed admin user documented for local/CI use

### Requirement: Production admin sign-in is verified outside the default repo test defaults

The project **SHALL** document that **production** admin login is confirmed via an **operator-run** step (for example production checklist smoke on the live URL) using secrets **not** stored in the repository.

#### Scenario: Checklist references production smoke

- **WHEN** an operator completes the documented production release checklist
- **THEN** they **SHALL** find an item that requires signing in as the production admin on the production URL after deploy
