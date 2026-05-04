# Capability: quality-playwright-ci (delta)

## ADDED Requirements

### Requirement: Admin menu navigation E2E (multi-viewport)

The system’s Playwright suite **SHALL** include tests that, after **admin credentials** sign-in, exercise **every** primary **admin shell** navigation item by **clicking** the corresponding control (not by **`page.goto` alone**), on **at least** a **mobile-class** viewport and a **desktop-class** viewport.

#### Scenario: All primary admin destinations via menu on desktop

- **WHEN** a test runs at a **desktop** viewport and an administrator is signed in
- **THEN** the test **SHALL** activate **Overview, Categories, Products, Featured, Sales** from the shell and **SHALL** assert each lands on the expected route and shows a **stable landmark** (heading, `data-testid`, or role) documented in the test

#### Scenario: All primary admin destinations via menu on mobile

- **WHEN** a test runs at a **mobile** viewport and an administrator is signed in
- **THEN** the test **SHALL** open the **navigation drawer** (or equivalent) when required, then **SHALL** activate the same destinations as desktop and **SHALL** assert route + landmark

### Requirement: Product edit reachable through UI flow

The Playwright suite **SHALL** include a test that reaches **`/admin/products/[id]/edit`** by starting from **Products** in the shell and using the **Edit** control (not by constructing the edit URL alone), and **SHALL** assert the edit form is present.

#### Scenario: Edit product via inventory row

- **WHEN** an administrator opens **Products** from the shell and activates **Edit** for an existing product row
- **THEN** the edit page **SHALL** display inputs bound to **update** behaviour (e.g. edit form test id or **Save** action)
