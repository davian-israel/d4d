## ADDED Requirements

### Requirement: Customer profile and order history

The system SHALL allow an authenticated customer to view and update profile fields validated by Zod and SHALL list their orders with statuses reflecting payment and fulfillment.

#### Scenario: Profile update validates input

- **WHEN** a customer submits profile changes that fail Zod validation
- **THEN** the system SHALL return structured errors and SHALL NOT persist invalid values

#### Scenario: Customer sees paid orders

- **WHEN** a customer with prior paid orders opens account order history
- **THEN** the system SHALL display those orders with amounts and timestamps

### Requirement: Session security

The system SHALL use secure session handling appropriate to Vercel/Next.js deployment (HTTP-only cookies where applicable) and SHALL protect account routes from anonymous access.

#### Scenario: Anonymous user cannot load account orders

- **WHEN** an unauthenticated user requests the orders page
- **THEN** the system SHALL deny access and SHALL redirect or respond with unauthorized
