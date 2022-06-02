#!/bin/bash

echo "👾 Start doc generation"

sudo ./swagger/swagger_linux_amd64 generate spec -o ./swagger/swaggerui/swagger.json --scan-models

echo "🚀 Finish doc generation"