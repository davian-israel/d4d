## ADDED Requirements

### Requirement: Checkout creates a payable order server-side

The system SHALL create or update an `Order` in PostgreSQL with line items, totals, and status appropriate for payment, using server-side calculation from cart contents and SHALL NOT trust client-supplied totals as authoritative.

#### Scenario: Totals recomputed on submit

- **WHEN** a client submits checkout with totals that disagree with server recomputation
- **THEN** the system SHALL reject or correct to server totals before creating a payment

### Requirement: Square payment capture with webhook verification

The system SHALL initiate payment through Square’s documented flow for the chosen integration (Web Payments SDK and/or Payments API) and SHALL verify Square webhook signatures before applying state transitions.

#### Scenario: Webhook replay is idempotent

- **WHEN** the same Square webhook event is delivered more than once
- **THEN** the system SHALL apply the financial state transition at most once per unique event identifier

### Requirement: Failure and cancellation UX

The system SHALL surface payment errors to the user in plain language and SHALL persist a terminal failure state on the order when payment cannot complete.

#### Scenario: Declined card does not mark order paid

- **WHEN** Square reports a declined payment
- **THEN** the order SHALL remain unpaid and the user SHALL see a recoverable error state
