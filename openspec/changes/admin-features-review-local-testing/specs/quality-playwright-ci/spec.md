## ADDED Requirements

### Requirement: Admin Playwright suite runnable locally

The project SHALL document and support running Playwright tests that cover **admin authentication** and **admin routes** against a **locally running** application instance using the **seeded admin credentials** (same harness as `loginAsAdmin` in `web/e2e/helpers.ts`).

#### Scenario: Local run executes admin specs

- **WHEN** a developer starts the Next.js dev server (or preview) with a seeded database and runs the Playwright suite targeting **`admin-navigation.spec.ts`** and **`admin-products.spec.ts`**
- **THEN** those tests SHALL pass without requiring a remote production URL

### Requirement: Admin feature coverage gap closure

For each primary admin area (**categories**, **featured**, **sales**) that is not covered by **behavioral** Playwright assertions (beyond loading a URL for screenshots), the project SHALL add **focused** Playwright coverage or SHALL record an explicit **manual verification** step in the implementation task list until automated coverage exists.

#### Scenario: Categories has behavioral coverage or tracked manual step

- **WHEN** the implementation tasks for this change are completed
- **THEN** either Playwright SHALL assert a representative category workflow (e.g. create or edit visible in UI) **or** the task list SHALL document a repeatable manual check with acceptance criteria

#### Scenario: Featured has behavioral coverage or tracked manual step

- **WHEN** the implementation tasks for this change are completed
- **THEN** either Playwright SHALL assert a representative featured workflow **or** the task list SHALL document a repeatable manual check with acceptance criteria

#### Scenario: Sales has behavioral coverage or tracked manual step

- **WHEN** the implementation tasks for this change are completed
- **THEN** either Playwright SHALL assert the sales view loads order-relevant content with seeded data **or** the task list SHALL document a repeatable manual check with acceptance criteria
