# Capability: admin-merchandising (delta)

## ADDED Requirements

### Requirement: Admin product inventory list

The system SHALL present on **`/admin/products`** (or a documented sub-route) a **read-only or actionable list** of all **`Product`** rows visible to administrators, including at minimum: **name**, **slug**, **category**, **price** (minor units + currency), **stock quantity**, and **published** flag.

#### Scenario: Admin opens products screen

- **WHEN** an authenticated administrator opens the admin products screen
- **THEN** the system SHALL display the product list derived from PostgreSQL

### Requirement: Admin updates existing product

The system SHALL allow an administrator to **update** an existing product’s merchandising fields (consistent with **`createProduct`** validation: name, description, price, currency, stock, category, image URL, published) via a **server action** protected by **`requireAdmin`**, and SHALL persist changes to PostgreSQL.

#### Scenario: Valid update succeeds

- **WHEN** an admin submits a valid update for an existing product id
- **THEN** the system SHALL save changes and **SHALL** refresh storefront surfaces that depend on that product (e.g. catalog and product detail)

#### Scenario: Invalid update rejected

- **WHEN** an admin submits invalid data (e.g. non-positive price, invalid slug format)
- **THEN** the system SHALL reject the mutation with **field-level** errors

### Requirement: Admin removes or unpublishes product

The system SHALL support **at least one** of: **(a)** **unpublish** (`published: false`) from admin, or **(b)** **hard delete** when **no** **`OrderLine`** references that product.

#### Scenario: Delete blocked when orders exist

- **WHEN** an admin attempts to delete a product that has **one or more** associated **`OrderLine`** rows
- **THEN** the system SHALL **not** remove the product and **SHALL** return an error message explaining that historical orders reference it

#### Scenario: Unpublish hides from public catalog

- **WHEN** an admin sets **`published`** to false
- **THEN** the product **SHALL NOT** appear in public **published** product listings while remaining available for order history display as implemented
