# Capability: quality-playwright-ci (delta)

## ADDED Requirements

### Requirement: Admin product changes are Playwright-first

For work under **`admin-manage-products`** (or equivalent admin product CRUD scope), implementers **SHALL** **author Playwright scenarios** that assert **all** required admin product behaviours **before** or **in lockstep with** application changes such that the suite **documents the contract**. The suite **SHALL** be **executed** (`npm run test:e2e` or a documented CI-equivalent command) as part of the delivery loop.

#### Scenario: New admin capability has an automated check

- **WHEN** a new admin product capability (e.g. list, update, delete) is added to the application
- **THEN** at least one Playwright test **SHALL** cover that capability and **SHALL** run in the standard e2e command

### Requirement: Test edits are limited to failures and gaps

While stabilizing the admin product suite, contributors **SHALL** **only** **create** new tests for missing coverage or **modify** tests that are **failing** or **incorrect relative to agreed requirements**. They **SHALL NOT** rewrite or reorder unrelated **passing** tests solely for style (unless a separate chore-wide rule mandates it).

#### Scenario: Passing test left alone

- **WHEN** a Playwright test passes and still matches the specified behaviour
- **THEN** it **SHALL NOT** be changed as part of the admin product feature work
