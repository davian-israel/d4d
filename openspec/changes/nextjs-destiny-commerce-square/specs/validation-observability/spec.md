## ADDED Requirements

### Requirement: Zod validates server boundaries

The system SHALL validate inputs to server actions, route handlers, and webhooks with Zod schemas colocated for reuse and SHALL map Zod issues to stable error codes or field paths for the client.

#### Scenario: Invalid JSON webhook rejected

- **WHEN** a webhook payload fails Zod parsing or signature verification
- **THEN** the system SHALL respond with an error and SHALL NOT mutate payment or order state

### Requirement: Structured logging for payment and order lifecycle

The system SHALL emit structured logs for payment attempts, webhook handling, and order state transitions suitable for troubleshooting in Vercel logs without logging full PAN or sensitive card data.

#### Scenario: Logs exclude primary account numbers

- **WHEN** payment flows log diagnostic information
- **THEN** logs SHALL NOT contain full payment card numbers or Square secrets
