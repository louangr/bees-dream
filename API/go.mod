module bee_api

go 1.18

require internal/web/handler v1.0.0

replace internal/web/handler => ./internal/web/handler

require internal/persistence/interfaces v1.0.0

require github.com/joho/godotenv v1.4.0 // indirect

replace internal/persistence/interfaces => ./internal/persistence/interfaces

require internal/entities v1.0.0 //

replace internal/entities => ./internal/entities/

require internal/persistence/mongo v1.0.0

replace internal/persistence/mongo => ./internal/persistence/mongo

require internal/persistence/dao v1.0.0

replace internal/persistence/dao => ./internal/persistence/dao

//Mongo dependencies
require (
	github.com/go-stack/stack v1.8.0 // indirect
	github.com/golang/snappy v0.0.1 // indirect
	github.com/gorilla/mux v1.8.0 // indirect
	github.com/klauspost/compress v1.13.6 // indirect
	github.com/pkg/errors v0.9.1 // indirect
	github.com/xdg-go/pbkdf2 v1.0.0 // indirect
	github.com/xdg-go/scram v1.0.2 // indirect
	github.com/xdg-go/stringprep v1.0.2 // indirect
	github.com/youmark/pkcs8 v0.0.0-20181117223130-1be2e3e5546d // indirect
	go.mongodb.org/mongo-driver v1.9.1 // indirect
	golang.org/x/crypto v0.0.0-20201216223049-8b5274cf687f // indirect
	golang.org/x/sync v0.0.0-20190911185100-cd5d95a43a6e // indirect
	golang.org/x/text v0.3.5 // indirect
)
