## ADDED Requirements

### Requirement: Home page structural parity

The public home route SHALL mirror the DOM section structure, header, hero, and primary content blocks of `home_page_sacred_style/code.html`, using the same Tailwind class strings except where dynamic content (images, copy from CMS/DB) replaces static placeholders.

#### Scenario: Hero and top app bar

- **WHEN** a visitor opens the home page on a mobile viewport
- **THEN** the top app bar and hero layout SHALL follow the same class-based structure as the reference HTML (sticky header, hero overlay gradient pattern, typography scale)

### Requirement: Featured home parity

The application SHALL provide a route implementing the featured-carousel / featured-merchandising layout from `home_with_featured_carousel/code.html` with mobile-first behavior preserved.

#### Scenario: Featured region visible

- **WHEN** a visitor opens the featured home route
- **THEN** a horizontally scrollable or stacked featured region SHALL match the reference HTML’s mobile intent (e.g. `overflow-x-auto`, card spacing)

### Requirement: Catalog parity

The catalog route SHALL mirror `catalog_sacred_style/code.html` layout patterns (filters/chips, product cards, spacing) while binding prices and links to persisted products.

#### Scenario: Product grid on mobile

- **WHEN** the catalog is viewed at mobile width
- **THEN** card layout and spacing classes SHALL align with the reference HTML’s mobile-first grid/list

### Requirement: Product detail parity

The product detail route SHALL mirror `product_detail_sacred_style/code.html` for gallery, title, price, and primary actions regions.

#### Scenario: Add to cart control placement

- **WHEN** a product detail page renders
- **THEN** primary commerce actions SHALL appear in the same relative positions as the reference HTML for mobile and scale up per `md`/`lg` rules in that file

### Requirement: Cart parity

The cart route SHALL mirror `cart_sacred_style/code.html` for line items, summary, and call-to-action styling.

#### Scenario: Empty and non-empty cart

- **WHEN** the cart has items versus when it is empty
- **THEN** the page SHALL preserve the reference HTML’s visual patterns for those states (spacing, surfaces) adapted to real data

### Requirement: Checkout parity

The checkout route SHALL mirror `checkout_sacred_style/code.html` for steps/summary UI and form field styling; Square payment UI SHALL be integrated without breaking the reference layout intent.

#### Scenario: Checkout on small screens

- **WHEN** checkout is viewed at 375px width
- **THEN** step indicators and form controls SHALL follow the reference HTML’s responsive classes

### Requirement: Contact parity

The contact route SHALL mirror `contact_us_sacred_style/code.html` for form layout, labels, and surface treatments; submissions remain Zod-validated server-side.

#### Scenario: Invalid submission feedback

- **WHEN** validation fails
- **THEN** error presentation SHALL fit the reference HTML’s field styling patterns (no unstyled system defaults that break parity)
