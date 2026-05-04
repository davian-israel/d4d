# Capability: data-prisma-postgres (delta)

## ADDED Requirements

### Requirement: Production database seed for catalog and admin

The system SHALL provide a **Prisma seed** that can run against a **production** PostgreSQL database **after** migrations apply, populating **reference/catalog** data (categories, products, featured placements) and ensuring an **administrator `User`** exists for **`/admin`** sign-in.

#### Scenario: Production seed requires explicit mode and admin password

- **WHEN** `SEED_ENV` is set to **`production`**
- **THEN** the seed **SHALL** require **`SEED_ADMIN_PASSWORD`** meeting a documented minimum length and **SHALL** allow **`SEED_ADMIN_EMAIL`** override
- **AND** the seed **SHALL NOT** assume hard-coded production passwords in source control

#### Scenario: Development seed keeps documented defaults

- **WHEN** `SEED_ENV` is **not** `production`
- **THEN** the seed **SHALL** continue to upsert the documented **development** admin and customer accounts (for local work and automated tests) unless overridden by optional seed environment variables

### Requirement: Seed documents table coverage

The project documentation (README or checklist) **SHALL** state which Prisma models receive rows from seed versus remain empty until runtime (e.g. carts, orders, contact submissions).

#### Scenario: Operator knows operational tables start empty

- **WHEN** an operator reads the documented seed section
- **THEN** they **SHALL** understand that transactional stores are not bulk-filled by default
