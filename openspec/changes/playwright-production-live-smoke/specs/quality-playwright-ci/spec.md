# Capability: quality-playwright-ci (delta)

## ADDED Requirements

### Requirement: Optional Playwright suite for the live production URL

The project **SHALL** provide a **separate** Playwright configuration that targets the **deployed** storefront (default **`https://destiny4d.xyz`**, overridable via **`PLAYWRIGHT_PROD_BASE_URL`**) and **SHALL NOT** run this suite as part of the default **`npm run test:e2e`** command (which remains local + seeded database).

#### Scenario: Operator runs live smoke with secrets

- **WHEN** an operator sets **`PLAYWRIGHT_PROD_ADMIN_PASSWORD`** and runs the documented **`test:e2e:production`** (or equivalent **`playwright`** command)
- **THEN** the suite **SHALL** execute **non-destructive** checks for public storefront paths and **SHALL** verify **admin** sign-in to **`/admin`** using the supplied credentials

### Requirement: Live checkout tests do not complete real charges

Tests targeting **production** **SHALL NOT** submit flows that **complete** payment with **real** Square charges. Assertions **MAY** stop at **checkout** form visibility or **payment** section presence when **`mustUseSquareToken()`** applies.

#### Scenario: Production checkout stops before paid completion

- **WHEN** a live test reaches **checkout** with items in cart
- **THEN** it **SHALL** assert **`checkout`** UI readiness (e.g. email field / form landmark) and **SHALL NOT** depend on reaching **`/thank-you`** unless the environment explicitly allows **mock** checkout (non-production only)

### Requirement: Customer live login is optional

Customer **live** sign-in tests **SHALL** run **only** when **`PLAYWRIGHT_PROD_CUSTOMER_EMAIL`** and **`PLAYWRIGHT_PROD_CUSTOMER_PASSWORD`** are both set; otherwise they **SHALL** be **skipped** with a clear reason.

#### Scenario: Missing customer secrets skips customer live test

- **WHEN** customer production credentials are **not** configured
- **THEN** the Playwright run **SHALL** omit or **skip** customer auth scenarios **without** failing the overall run for that reason alone
