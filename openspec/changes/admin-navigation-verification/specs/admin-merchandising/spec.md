# Capability: admin-merchandising (delta)

## ADDED Requirements

### Requirement: Admin shell navigation

The system SHALL render a persistent **admin shell** on all **`/admin/**`** pages (except auth callback routes if any) that includes **navigation entries** for: **Overview**, **Categories**, **Products**, **Featured**, and **Sales**, each targeting the correct **`href`**.

#### Scenario: Desktop navigation uses visible sidebar

- **WHEN** a viewport satisfies the stylesheet’s **desktop / `md+`** admin layout
- **THEN** the primary admin navigation **SHALL** be visible **without** opening a drawer, and **SHALL** remain available while browsing **`/admin/products/[id]/edit`** and other admin sub-routes

#### Scenario: Mobile navigation opens before following links

- **WHEN** a viewport uses the **mobile** admin layout (drawer / hamburger pattern)
- **THEN** the user **SHALL** be able to open the navigation surface and **SHALL** reach the same destination **href**s as on desktop after activation

### Requirement: Product management routes are reachable from the shell

From the **Products** navigation entry, an administrator **SHALL** reach **inventory list** and **new product** creation. From the inventory list, the system **SHALL** provide an **Edit** affordance per row leading to **`/admin/products/<id>/edit`** for that product.

#### Scenario: Edit surface loads for a persisted product

- **WHEN** an administrator follows **Products** then **Edit** for an existing product
- **THEN** the application **SHALL** load the edit experience for that **`id`** and **SHALL NOT** return 404 for valid rows
