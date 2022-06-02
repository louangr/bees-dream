#!/bin/bash

appName="api-bee-dream"

echo "👾 Start building script api"

go clean -cache ./...
cd ./cmd/server
go build -o $appName -v ./...
mv $appName ../../dist

echo "🚀 Finish building script api"