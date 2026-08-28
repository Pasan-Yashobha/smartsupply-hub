# Architecture Decision Record - SmartSupply Hub

This document records the key technical decisions made during the development
of SmartSupply Hub, including the reasoning behind each choice.

---

## 1. Why Apache Kafka over RabbitMQ

**Decision:** Use Apache Kafka as the message broker.

**Reasoning:**
Three separate services need to react to the same product event independently.
The enrichment service, the audit log, and any future reconciliation service
all need their own copy of every event. With RabbitMQ, only one consumer
receives each message. With Kafka consumer groups, each service reads every
event independently without affecting the others.

Additionally, Kafka retains messages for a configurable period. This means
failed events can be replayed without data loss, and the raw event history
is available for debugging and auditing.

**Trade-off:** Kafka is more complex to operate than RabbitMQ and requires
Zookeeper. For a simple task queue, RabbitMQ would be the better choice.

---

## 2. Why Apache Camel for ingestion

**Decision:** Use Apache Camel routes rather than writing custom polling logic.

**Reasoning:**
Apache Camel implements Enterprise Integration Patterns out of the box.
The file component, timer component, and HTTP component handle all the
infrastructure concerns (polling schedules, file watching, error handling)
so the route code only contains transformation logic. Writing the same
functionality from scratch would require hundreds of lines of boilerplate
for scheduling, retry logic, and dead letter handling.

**Trade-off:** Camel adds a framework dependency and has a learning curve.
For a single integration point, plain Spring scheduling would be simpler.

---

## 3. Why PostgreSQL for enriched products and MongoDB for raw events

**Decision:** Use two different databases for two different data shapes.

**Reasoning:**
Enriched products have a fixed schema with known fields. They are queried
by ID, by supplier, and with pagination. PostgreSQL with JPA and proper
indexes handles these queries efficiently and provides ACID guarantees.

Raw events are append-only, schema-free audit records. Each supplier sends
data in a different shape. MongoDB stores them without requiring a fixed
schema, handles high-volume appends efficiently, and preserves the original
JSON exactly as received from Kafka.

**Trade-off:** Operating two databases adds infrastructure complexity.
A single PostgreSQL database with a JSONB column for raw events would
work for smaller scale.

---

## 4. Why three separate supplier formats

**Decision:** Simulate Supplier A as REST, Supplier B as REST with different
field names, and Supplier C as CSV file drops.

**Reasoning:**
Real enterprise integration projects always involve multiple external systems
with completely different data contracts. Using three different formats
demonstrates the core value of an integration platform: normalising diverse
inputs into a single unified format without changing the source systems.

Supplier B specifically uses field names like `productCode`, `unitPrice`,
and `vendor` instead of the standard `productId`, `price`, and `supplier`.
This forces real field mapping logic in the processor rather than a trivial
passthrough.

---

## 5. Why MapStruct over manual mapping

**Decision:** Use MapStruct for entity to DTO conversion in the inventory API.

**Reasoning:**
MapStruct generates plain Java code at compile time. The generated mapper
is readable, debuggable, and has zero runtime overhead compared to
reflection-based mappers like ModelMapper. It also fails at compile time
if field names do not match, catching mapping errors before runtime.

**Trade-off:** Requires annotation processor configuration in Maven.
For simple one-off mappings, a manual builder call is acceptable.

---

## 6. Why JWT for API security

**Decision:** Use JWT Bearer tokens for inventory API authentication.

**Reasoning:**
The inventory API is stateless by design. JWT tokens carry all necessary
authentication information in the token itself, so no server-side session
storage is needed. This makes the API horizontally scalable and consistent
with standard OAuth 2.0 patterns used in enterprise integration.

**Trade-off:** JWT tokens cannot be revoked before expiry without
additional infrastructure like a token blacklist.

---

## 7. Why Docker Compose for local orchestration

**Decision:** Use Docker Compose to run the full stack locally.

**Reasoning:**
Docker Compose allows the entire eight-container stack to start with a
single command. It handles networking between containers, volume persistence
for databases, and service dependency ordering. This makes the project
reproducible on any machine with Docker installed.

**Trade-off:** Docker Compose is not suitable for production at scale.
Kubernetes would be the next step for production deployment.

---

## 8. Why noop=true on the Camel file route

**Decision:** Use `noop=true` on the Camel file component during development.

**Reasoning:**
Without `noop=true`, Camel moves processed files to a `.camel` subdirectory
after reading them. During development, Supplier C drops new CSV files every
60 seconds so file retention is not critical. Using `noop=true` keeps files
in place and allows re-processing during testing without needing to
regenerate files.

**Trade-off:** In production, files should be moved to an archive folder
using `move=.done` to prevent reprocessing after service restarts.

---

## 9. Why a fixed product catalog with stable IDs

**Decision:** Replace random UUID-based product IDs with a fixed catalog
of 15 products across three suppliers using stable prefixed IDs
(PA-001 to PA-005, PB-001 to PB-005, PC-001 to PC-005).

**Reasoning:**
Random UUIDs caused unbounded database growth because the enrichment
service could never match incoming events to existing records. Every
poll inserted new rows instead of updating existing ones. A fixed catalog
with deterministic IDs enables proper upsert behaviour - the same product
is always updated, never duplicated. Each supplier owns a completely
separate ID range to prevent cross-supplier overwrites.

**Trade-off:** A real supplier system would have its own stable product
catalogue. This fixed catalog simulates that behaviour for development
and demonstration purposes.

