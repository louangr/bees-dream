#!/bin/bash


echo "Start test script api"

go clean -cache ./...
cd ./tests
go test -o api_test
mv ./api_test ../dist

echo "Finish test script api"