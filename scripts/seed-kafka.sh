#!/bin/bash

echo "  SmartSupply Hub - Seed Kafka"

TOPICS=("product-updates" "dlq-products")

for topic in "${TOPICS[@]}"; do
  echo "Creating topic: $topic"
  docker exec kafka kafka-topics --create \
    --topic "$topic" \
    --bootstrap-server localhost:9092 \
    --partitions 10 \
    --replication-factor 1 \
    --if-not-exists 2>/dev/null

  echo "  ✓ Topic '$topic' ready"
done

echo ""
echo "Current topics:"
docker exec kafka kafka-topics --list \
  --bootstrap-server localhost:9092 2>/dev/null | \
  grep -v "^__"

echo ""
echo "Done."
