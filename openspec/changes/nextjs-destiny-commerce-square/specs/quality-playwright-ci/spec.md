## ADDED Requirements

### Requirement: Playwright covers critical storefront paths

The system SHALL include Playwright tests that exercise browsing, product navigation, cart mutation, and checkout initiation at minimum in a deterministic test environment.

#### Scenario: Browse to product and add to cart

- **WHEN** the Playwright suite runs against the test environment with seeded data
- **THEN** a test SHALL add a known product to the cart and SHALL assert cart state in UI or via network/API as defined by the test harness

### Requirement: Playwright validates Zod-backed forms show errors

The system SHALL include tests that submit invalid data to at least one customer-facing form and one admin mutation path and SHALL assert field errors are visible.

#### Scenario: Contact form invalid email

- **WHEN** a test submits a contact form with an invalid email
- **THEN** the UI SHALL display a validation message consistent with server-side Zod rejection

### Requirement: CI executes Playwright

The system SHALL provide a CI workflow step that installs browsers as needed and runs Playwright non-interactively with a documented pass/fail policy.

#### Scenario: CI fails on regression

- **WHEN** a critical Playwright test fails on a pull request build
- **THEN** the pipeline SHALL fail and SHALL block merge per repository policy

### Requirement: Admin critical path covered

The system SHALL include at least one Playwright test that authenticates as an admin (via seeded credentials or test provider) and verifies access to a protected admin route.

#### Scenario: Admin reaches dashboard

- **WHEN** an admin test authenticates with seeded admin credentials
- **THEN** the test SHALL load the admin dashboard without unauthorized redirect
