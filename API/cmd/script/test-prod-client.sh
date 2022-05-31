#!/bin/bash

appName="client-bee-dream"

echo "Start test script api"

go clean -cache ./...
cd ./cmd/client
go build -o $appName -v ./...
mv $appName ../../dist

echo "Finish test script api"