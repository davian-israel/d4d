## ADDED Requirements

### Requirement: Admin-only access to merchandising console

The system SHALL restrict admin routes to users with an administrator role and SHALL reject non-admin access.

#### Scenario: Customer cannot open admin dashboard

- **WHEN** a customer-role user navigates to an admin URL
- **THEN** the system SHALL deny access

### Requirement: Manage categories, products, and featured placements

The system SHALL provide CRUD or equivalent workflows for categories, products, and featured product placements, with all mutations validated by Zod and persisted in PostgreSQL.

#### Scenario: Invalid product payload rejected

- **WHEN** an admin submits a product with invalid price or missing required fields
- **THEN** the system SHALL reject the mutation with field errors

### Requirement: Sales visibility

The system SHALL provide a read-oriented view of orders/sales sufficient for operational monitoring (list, detail, payment state) without exposing unnecessary PII beyond operational need.

#### Scenario: Admin views order payment state

- **WHEN** an admin opens an order detail for a paid order
- **THEN** the system SHALL show payment status and Square reference identifiers stored for reconciliation
