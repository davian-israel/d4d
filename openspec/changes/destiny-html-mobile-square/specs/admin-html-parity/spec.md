## ADDED Requirements

### Requirement: Admin dashboard parity

The admin dashboard route SHALL mirror `admin_dashboard_sacred_style/code.html` for summary cards, navigation patterns, and mobile/desktop layout (including drawer/sidebar behavior using the same breakpoint strategy as the HTML).

#### Scenario: Mobile versus desktop chrome

- **WHEN** an admin views `/admin` at mobile width versus `md+`
- **THEN** navigation chrome SHALL follow the `hidden md:flex` / drawer patterns from the reference HTML

### Requirement: Manage categories parity

The manage categories route SHALL mirror `manage_categories_sacred_style/code.html` for list/table layout, filters, and action placement while performing real CRUD against the database.

#### Scenario: Category list presentation

- **WHEN** categories are listed
- **THEN** the list container and row styling SHALL match the reference HTML’s class patterns

### Requirement: Manage featured parity

The manage featured / featured products route SHALL mirror `manage_featured_products/code.html` for how featured items are displayed and edited (ordering, cards, or list per HTML).

#### Scenario: Featured management visible on mobile

- **WHEN** an admin manages featured placements on a 375px-wide viewport
- **THEN** controls SHALL remain usable and match the reference HTML’s mobile layout (stacking, padding)

### Requirement: Manage products parity

The manage products route SHALL mirror `manage_products_sacred_style/code.html` for product grid/list, filters, and editor affordances.

#### Scenario: Product admin actions

- **WHEN** an admin creates or updates a product
- **THEN** form and button placement SHALL follow the reference HTML patterns

### Requirement: Manage sales parity

The manage sales route SHALL mirror `manage_sales_sacred_style/code.html` for orders/sales table or cards and status presentation.

#### Scenario: Sales list readability

- **WHEN** orders are displayed
- **THEN** typography and surface hierarchy SHALL match the reference HTML for mobile-first reading

### Requirement: Admin authorization unchanged

All admin parity routes SHALL remain protected from non-admin users (existing auth rules apply).

#### Scenario: Customer blocked

- **WHEN** a customer-role user requests any `/admin` path
- **THEN** the system SHALL deny access per existing security behavior
