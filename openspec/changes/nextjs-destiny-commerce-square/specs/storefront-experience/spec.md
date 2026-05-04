## ADDED Requirements

### Requirement: Public storefront matches Sacred Earth & Grace design language

The system SHALL present the public site using the warm cream/terracotta surface hierarchy, Noto Serif for display headlines and Work Sans for body/labels (or documented font fallbacks), and SHALL NOT use 1px solid borders for primary section separation—boundaries SHALL be conveyed via background/surface shifts per `sacred_earth_grace/DESIGN.md`.

#### Scenario: Home renders hero and featured merchandising

- **WHEN** an unauthenticated visitor opens the home page
- **THEN** the page SHALL display a hero consistent with editorial spacing and a featured products region suitable for asymmetric/layout interest per design guidelines

#### Scenario: Catalog and product detail are navigable

- **WHEN** a visitor browses the catalog and opens a product
- **THEN** the system SHALL show product imagery, name, description, and price from persisted data and SHALL provide an add-to-cart entry point

### Requirement: Responsive and accessible baseline

The system SHALL provide responsive layouts for mobile and desktop breakpoints and SHALL meet WCAG 2.1 AA intent for text contrast on primary interactive elements where design tokens allow adjustment without breaking the palette.

#### Scenario: Keyboard user activates primary CTA

- **WHEN** a keyboard user focuses and activates the primary call-to-action on a product card
- **THEN** the control SHALL be focus-visible and SHALL trigger the same action as pointer activation

### Requirement: Contact surface collects validated inquiries

The system SHALL expose a contact experience aligned with the contact prototype’s intent and SHALL validate submissions with Zod before persistence or delivery.

#### Scenario: Invalid contact submission shows field errors

- **WHEN** a user submits the contact form with invalid email or missing required fields
- **THEN** the system SHALL reject the request with field-level errors and SHALL NOT create a contact record
