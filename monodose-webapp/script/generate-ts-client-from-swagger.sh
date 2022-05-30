#!/bin/bash

echo "Start doc generation"

npx openapi-generator-cli generate \
  -i ../API/swagger/swaggerui/swagger.json \
  -o src/api \
  -g typescript-fetch \

echo "Finish doc generation"