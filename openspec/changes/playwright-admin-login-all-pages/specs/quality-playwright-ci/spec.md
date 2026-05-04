## ADDED Requirements

### Requirement: Playwright verifies admin login and every primary admin shell route

The system SHALL include an automated Playwright test that uses **credential login** as an administrator (seeded or test-harness credentials consistent with `loginAsAdmin`) and then verifies that **each** primary merchandising admin destination exposed in **`AdminShell`** loads successfully: **`/admin`**, **`/admin/categories`**, **`/admin/products`**, **`/admin/featured`**, **`/admin/sales`**. For each destination, the test SHALL assert an appropriate visible landmark (for example a stable heading or `data-testid`) so that blank or error pages fail the test.

#### Scenario: Admin session reaches all shell destinations

- **WHEN** the Playwright test authenticates with admin credentials and navigates through every primary admin shell destination
- **THEN** the test SHALL observe HTTP success for each route and SHALL assert a page-specific landmark on each view without an unauthorized redirect away from the admin area

#### Scenario: Coverage runs in local and CI environments

- **WHEN** the default Playwright suite runs against the application with seeded data
- **THEN** the test described in this requirement SHALL be included so CI fails if admin login or any listed route regresses
