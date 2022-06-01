module bee_api

go 1.18

require internal/persistence/interfaces v1.0.0

require (
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible // indirect
	github.com/felixge/httpsnoop v1.0.1 // indirect
	github.com/google/uuid v1.3.0 // indirect
	github.com/gorilla/handlers v1.5.1 // indirect
	github.com/joho/godotenv v1.4.0 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	github.com/stretchr/testify v1.7.1 // indirect
	gopkg.in/yaml.v3 v3.0.0-20200313102051-9f266ea9e77c // indirect
)

replace internal/persistence/interfaces => ./internal/persistence/interfaces

require internal/entities v1.0.0 //

replace internal/entities => ./internal/entities/

require internal/persistence/mongo v1.0.0

replace internal/persistence/mongo => ./internal/persistence/mongo

require internal/persistence/dao v1.0.0

replace internal/persistence/dao => ./internal/persistence/dao

//Utils
require utils v1.0.0

replace utils => ./utils

//Types
require internal/persistence/types v1.0.0

replace internal/persistence/types => ./internal/persistence/types

//Handler
require internal/web/handler/user v1.0.0

replace internal/web/handler/user => ./internal/web/handler/user

require internal/web/handler/monodose v1.0.0

replace internal/web/handler/monodose => ./internal/web/handler/monodose

require internal/web/handler/login v1.0.0

replace internal/web/handler/login => ./internal/web/handler/login

//Errors

require internal/persistence/errors v1.0.0

replace internal/persistence/errors => ./internal/persistence/errors

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
	golang.org/x/crypto v0.0.0-20220525230936-793ad666bf5e // indirect
	golang.org/x/sync v0.0.0-20190911185100-cd5d95a43a6e // indirect
	golang.org/x/text v0.3.6 // indirect
)
