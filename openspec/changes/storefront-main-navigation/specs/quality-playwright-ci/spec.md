# Capability: quality-playwright-ci (delta)

## ADDED Requirements

### Requirement: Storefront menu navigation E2E (multi-viewport)

The Playwright suite **SHALL** include tests that exercise **every** **storefront primary header** navigation entry (**Home**, **Catalog**, **Featured**, **Contact**, **Sign in**, **Account**) by **clicking** the corresponding control (**not** by **`page.goto` alone**), on **at least** a **mobile-class** viewport and a **desktop-class** viewport.

#### Scenario: All primary destinations via menu on desktop

- **WHEN** a test runs at a **desktop** viewport
- **THEN** the test **SHALL** activate each primary nav link from the **header** and **SHALL** assert each lands on the expected route and shows a **stable landmark** (`data-testid` or documented heading)

#### Scenario: All primary destinations via menu on mobile

- **WHEN** a test runs at a **mobile** viewport
- **THEN** the test **SHALL** open the **navigation drawer** (or equivalent) when required, then **SHALL** activate the same destinations as desktop and **SHALL** assert route + landmark

### Requirement: Account navigation variants

The Playwright suite **SHALL** assert **Account** behaviour for an **unauthenticated** visitor (**redirect to sign-in**) and **SHALL** assert **Account** loads the **profile surface** for a **signed-in seeded customer**.

#### Scenario: Guest Account opens sign-in

- **WHEN** a guest activates **Account** from the main navigation
- **THEN** the application **SHALL** navigate to **`/login`** (optionally with `callbackUrl`) and **SHALL** show the sign-in form

#### Scenario: Customer Account shows profile

- **WHEN** a seeded **customer** signs in and activates **Account** from the main navigation
- **THEN** the application **SHALL** load **`/account`** and **SHALL** show the profile experience
