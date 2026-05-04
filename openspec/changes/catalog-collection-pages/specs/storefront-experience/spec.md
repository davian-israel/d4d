# Capability: storefront-experience (delta)

## ADDED Requirements

### Requirement: Per-collection catalog pages

The system SHALL expose a **collection catalog** URL for each existing **`Category`** using the category’s **`slug`** as the path segment under `/catalog/` (e.g. `/catalog/faith-mugs`).

#### Scenario: Visitor opens a collection catalog

- **WHEN** a visitor requests `/catalog/<slug>` for a category that exists
- **THEN** the page SHALL list **only** **published** products whose `category.slug` equals `<slug>`, and SHALL show the collection name (category display name)

#### Scenario: Unknown collection slug

- **WHEN** a visitor requests `/catalog/<slug>` and no category has that slug
- **THEN** the system SHALL respond with **404 Not Found**

### Requirement: Collection tiles link to collection catalogs

On the **full** catalog page (`/catalog`), each **collection** tile in **The Collections** section SHALL link to **`/catalog/<category.slug>`** for that category, not only to `/catalog`.

#### Scenario: Keyboard or pointer activation on a collection tile

- **WHEN** a user activates the control for a given collection tile
- **THEN** navigation SHALL go to that collection’s catalog URL
