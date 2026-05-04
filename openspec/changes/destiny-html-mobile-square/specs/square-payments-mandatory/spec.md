## ADDED Requirements

### Requirement: Production checkout uses Square only

In production environments, the system SHALL complete card/online checkout only through Square: browser tokenization via **Square Web Payments SDK** (or Square-documented equivalent) and server-side payment creation using Square APIs. Non-Square payment simulators SHALL NOT complete a real checkout in production.

#### Scenario: Production without Square credentials

- **WHEN** `NODE_ENV` is `production` and Square credentials are missing or invalid
- **THEN** checkout SHALL fail closed with a clear error and SHALL NOT mark orders as paid via a mock path

### Requirement: Mock payments dev-only

Any mock or bypass payment path (e.g. environment flag) SHALL be impossible to enable in production builds or SHALL be explicitly blocked when `VERCEL_ENV` / `NODE_ENV` indicates production.

#### Scenario: Mock flag in production

- **WHEN** a deployment is production and a mock-payment flag is set
- **THEN** the application SHALL still refuse mock completion and SHALL require Square

### Requirement: Server verifies amounts

The system SHALL continue to recompute order totals on the server from authoritative catalog prices before creating a Square payment; client-supplied totals SHALL NOT be trusted.

#### Scenario: Tampered client total

- **WHEN** client-submitted totals disagree with server recomputation
- **THEN** the system SHALL reject or correct before calling Square

### Requirement: Webhooks remain verified

Square webhooks SHALL remain signature-verified and idempotent per existing implementation requirements.

#### Scenario: Invalid webhook

- **WHEN** a webhook request fails signature verification
- **THEN** the system SHALL reject it and SHALL NOT update payment state
