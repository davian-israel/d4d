## ADDED Requirements

### Requirement: Prisma schema models core commerce entities

The system SHALL define Prisma models for catalog (categories, products), merchandising (featured placements), cart/order domain (orders, line items, customers/users linkage), and audit-friendly timestamps, appropriate for PostgreSQL.

#### Scenario: Migrations apply on empty database

- **WHEN** migrations are applied to a fresh PostgreSQL database
- **THEN** the schema SHALL create all required tables and relations without manual SQL steps

### Requirement: Development vs production migration discipline

The system SHALL use iterative migrations in development (e.g. `prisma migrate dev`) and SHALL promote schema to production using `prisma migrate deploy` as part of a documented release process; production SHALL NOT rely on `db push` as the primary migration mechanism.

#### Scenario: Production deploy runs migrate deploy

- **WHEN** a production deployment pipeline executes after a reviewed migration
- **THEN** the pipeline SHALL apply pending migrations with `migrate deploy` before serving new app code that depends on them

### Requirement: Environment-separated databases

The system SHALL use distinct database instances or logical separation between development/preview and production such that development experimentation cannot corrupt production data.

#### Scenario: Preview deployment uses non-prod DATABASE_URL

- **WHEN** a Vercel Preview deployment runs
- **THEN** it SHALL connect to a non-production database URL configured for previews
