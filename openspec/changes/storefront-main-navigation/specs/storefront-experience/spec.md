# Capability: storefront-experience (delta)

## ADDED Requirements

### Requirement: Storefront main navigation

The system SHALL render **primary navigation** on the public storefront **header** that includes **exactly these destinations**, each using the documented **`href`**:

- **Home** → `/`
- **Catalog** → `/catalog`
- **Featured** → `/featured`
- **Contact** → `/contact`
- **Sign in** → `/login`
- **Account** → `/account`

The **cart** SHALL remain reachable from the **header** (icon or equivalent) without requiring users to use **only** the catalog flow.

#### Scenario: Desktop shows inline primary links

- **WHEN** a viewport satisfies the stylesheet’s **`md+`** storefront header layout
- **THEN** the **primary navigation links** SHALL be **visible without** opening a drawer, and **SHALL** include all destinations in the list above

#### Scenario: Mobile opens primary links from the menu

- **WHEN** a viewport uses the **mobile** storefront layout with a collapsible **menu**
- **THEN** the user **SHALL** open the **menu** surface and **SHALL** reach the **same `href` set** as on desktop after activation

#### Scenario: Catalog and product routes highlight Catalog

- **WHEN** the active path is `/catalog`, `/catalog/<slug>`, or `/product/<slug>`
- **THEN** the **Catalog** navigation entry **SHALL** reflect an **active** state consistent with design tokens
