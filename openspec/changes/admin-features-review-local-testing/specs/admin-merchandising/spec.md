## ADDED Requirements

### Requirement: Local verification covers all primary admin routes

The system SHALL be verifiable in a **local development environment** with **seeded data** such that an administrator can complete a documented path through **every** primary merchandising console route exposed in the admin shell: **`/admin`**, **`/admin/categories`**, **`/admin/products`** (including **`/admin/products/[id]/edit`** for at least one product), **`/admin/featured`**, and **`/admin/sales`**.

#### Scenario: Operator follows local verification paths

- **WHEN** a developer runs database migrations and seed, starts the application locally, and signs in as the seeded admin user
- **THEN** each listed route SHALL load without error and SHALL present the expected operational UI for that area (dashboard, category tools, product inventory, featured management, sales view)

### Requirement: Admin mutations remain guarded in local runs

The system SHALL enforce **admin-only** execution for merchandising server actions and admin API routes during local runs identical to other environments (role check before mutation or JSON response).

#### Scenario: Non-admin cannot call admin-only category API

- **WHEN** a request to **`GET /api/admin/categories`** is made without an admin session
- **THEN** the system SHALL respond with **401** and SHALL NOT return category data

#### Scenario: Server actions reject non-admin

- **WHEN** `requireAdmin()` is invoked without an admin session
- **THEN** the system SHALL throw or reject the operation such that the mutation does not succeed
