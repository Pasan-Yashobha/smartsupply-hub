# SmartSupply Hub

Enterprise supply chain integration platform built with Apache Camel, Apache Kafka, and Spring Boot.

## Architecture
Three supplier data sources (REST API, SOAP service, CSV files) → Apache Camel routes → Kafka → Enrichment service → PostgreSQL + MongoDB

## Services
- `supplier-mocks` — simulates three supplier systems
- `ingestion-service` — Apache Camel routes (coming soon)
- `enrichment-service` — Kafka consumer + data enrichment (coming soon)
- `inventory-api` — REST API + Swagger (coming soon)

## Tech Stack
Java 21, Spring Boot 3.5, Apache Camel, Apache Kafka, PostgreSQL, MongoDB, Docker

## Running locally
\`\`\`bash
cd infra && docker compose up -d
\`\`\`
# SmartSupply Hub

Enterprise supply chain integration platform built with Apache Camel, Apache Kafka, and Spring Boot.

## Architecture
Three supplier data sources (REST API, SOAP service, CSV files) → Apache Camel routes → Kafka → Enrichment service → PostgreSQL + MongoDB

## Services
- `supplier-mocks` - simulates three supplier systems
- `ingestion-service` - Apache Camel routes (coming soon)
- `enrichment-service` - Kafka consumer + data enrichment (coming soon)
- `inventory-api` - REST API + Swagger (coming soon)

## Tech Stack
Java 21, Spring Boot 3.5, Apache Camel, Apache Kafka, PostgreSQL, MongoDB, Docker

## Running locally
\`\`\`bash
cd infra && docker compose up -d
\`\`\`
