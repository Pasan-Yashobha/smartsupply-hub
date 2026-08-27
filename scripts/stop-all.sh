#!/bin/bash

echo "  SmartSupply Hub - Stopping"

cd "$(dirname "$0")/../infra" || exit
docker compose down

echo "All containers stopped."
