#!/bin/bash

echo "  SmartSupply Hub - Health Check"
echo ""

check_service() {
  local name=$1
  local url=$2
  local response

  response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)

  if [ "$response" = "200" ] || [ "$response" = "401" ]; then
    echo "  ✓ $name is UP ($url)"
  else
    echo "  ✗ $name is DOWN ($url) - HTTP $response"
  fi
}

check_container() {
  local name=$1
  local status
  status=$(docker inspect --format='{{.State.Running}}' "$name" 2>/dev/null)
  if [ "$status" = "true" ]; then
    echo "  ✓ $name is UP (container running)"
  else
    echo "  ✗ $name is DOWN"
  fi
}

echo "Checking services..."
echo ""
check_service "Supplier Mocks"  "http://localhost:8085/api/v1/supplier-a/products"
check_container "ingestion-service"
check_container "enrichment-service"
check_service "Inventory API"   "http://localhost:8083/swagger-ui/index.html"

echo ""
echo "Checking containers..."
echo ""
docker ps --format "  {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "smartsupply|kafka|zookeeper|supplier|ingestion|enrichment|inventory"

echo ""
echo "Checking Kafka topics..."
echo ""
docker exec kafka kafka-topics --list \
  --bootstrap-server localhost:9092 2>/dev/null | \
  grep -v "^__" | \
  while read -r topic; do echo "  ✓ Topic: $topic"; done

echo ""
