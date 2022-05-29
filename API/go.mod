module bee_api

go 1.18

require internal/web/handler v1.0.0

replace internal/web/handler => ./internal/web/handler

require internal/persistence/interfaces v1.0.0

replace internal/persistence/interfaces => ./internal/persistence/interfaces

require internal/entities v1.0.0

replace internal/entities => ./internal/entities/

require github.com/gorilla/mux v1.8.0 // indirect
