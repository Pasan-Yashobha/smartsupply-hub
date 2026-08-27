#!/bin/bash

echo "  SmartSupply Hub - Starting Up"

# Start infrastructure
echo "[1/3] Starting infrastructure (Kafka, PostgreSQL, MongoDB)..."
cd "$(dirname "$0")/../infra" || exit
docker compose up -d zookeeper kafka postgres mongodb

echo "Waiting 30 seconds for Kafka to be ready..."
sleep 30

# Create Kafka topic if it doesn't exist
echo "[2/3] Creating Kafka topics..."
docker exec kafka kafka-topics --create \
  --topic product-updates \
  --bootstrap-server localhost:9092 \
  --partitions 10 \
  --replication-factor 1 \
  --if-not-exists

docker exec kafka kafka-topics --create \
  --topic dlq-products \
  --bootstrap-server localhost:9092 \
  --partitions 3 \
  --replication-factor 1 \
  --if-not-exists

# Start all services
echo "[3/3] Starting all services..."
docker compose up -d supplier-mocks ingestion-service enrichment-service inventory-api

echo ""
echo "  SmartSupply Hub - All Started!"
echo ""
echo "Services:"
echo "  Supplier Mocks  -> http://localhost:8085"
echo "  Ingestion       -> http://localhost:8081"
echo "  Enrichment      -> http://localhost:8082"
echo "  Inventory API   -> http://localhost:8083"
echo "  Swagger UI      -> http://localhost:8083/swagger-ui/index.html"
echo ""
docker compose ps
