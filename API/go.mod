module bee_api

go 1.18

require internal/web/handler v1.0.0

require github.com/gorilla/mux v1.8.0 // indirect

replace internal/web/handler => ./internal/web/handler
