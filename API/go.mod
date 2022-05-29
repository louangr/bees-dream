module bee_api

go 1.18

require internal/web/handler v1.0.0

replace internal/web/handler => ./internal/web/handler

require interfaces v1.0.0

replace interfaces => ./internal/persistence/interfaces

require entities v1.0.0

replace entities => ./internal/entities/

require handler v1.0.0

replace handler => ./web/handler

require github.com/gorilla/mux v1.8.0 // indirect
