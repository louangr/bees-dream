// Package classification Bee's Dream beekeepers and monodoses APIs
//
// Bee's Dream beekeepers and monodoses APIs
//
// Terms Of Service:
//
//	Schemes: http, https
//	Version: 1.0.0
//	Contact: 21Team <by@carrier.pigeon>
//
//	Consumes:
//	- application/json
//
//	Produces:
//	- application/json
//
// swagger:meta
package main

import (
	"fmt"
	m "internal/persistence/mongo"
	hLogin "internal/web/handler/login"
	hMonodose "internal/web/handler/monodose"
	hUser "internal/web/handler/user"

	"log"
	. "utils"

	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	const port string = "8080"

	err := m.Connexion()

	if err != nil {
		log.Fatal(err.Error())
	}

	router := mux.NewRouter().StrictSlash(true)

	routesM := hMonodose.NewMonodoseRoutes()
	monodoseR := router.PathPrefix("/monodose").Subrouter()
	monodoseR.HandleFunc("", HeadersMiddleware(routesM.GetAll)).Methods("GET")
	monodoseR.HandleFunc("/{id:[0-9]+}", HeadersMiddleware(routesM.Get)).Methods("GET")
	monodoseR.HandleFunc("", HeadersMiddleware(routesM.Add)).Methods("POST")
	monodoseR.HandleFunc("", HeadersMiddleware(routesM.Update)).Methods("PUT")
	monodoseR.HandleFunc("/{id:[0-9]+}", HeadersMiddleware(routesM.Delete)).Methods("DELETE")
	monodoseR.HandleFunc("", HeadersMiddleware(CORSVerification)).Methods("OPTIONS")
	monodoseR.HandleFunc("/{id:[0-9]+}", HeadersMiddleware(CORSVerification)).Methods("OPTIONS")

	routesU := hUser.NewUserRoutes()
	userR := router.PathPrefix("/user").Subrouter()
	userR.HandleFunc("", HeadersMiddleware(routesU.GetAll)).Methods("GET")
	userR.HandleFunc("/{id:[0-9]+}", HeadersMiddleware(routesU.Get)).Methods("GET")
	userR.HandleFunc("", HeadersMiddleware(routesU.Add)).Methods("POST")
	userR.HandleFunc("", HeadersMiddleware(routesU.Update)).Methods("PUT")
	userR.HandleFunc("/{id:[0-9]+}", HeadersMiddleware(routesU.Delete)).Methods("DELETE")
	userR.HandleFunc("", HeadersMiddleware(CORSVerification)).Methods("OPTIONS")
	userR.HandleFunc("/{id:[0-9]+}", HeadersMiddleware(CORSVerification)).Methods("OPTIONS")

	routesL := hLogin.NewLoginRoutes()
	router.HandleFunc("/login", HeadersMiddleware(routesL.Connexion)).Methods("POST")
	router.HandleFunc("/login", HeadersMiddleware(CORSVerification)).Methods("OPTIONS")

	fs := http.FileServer(http.Dir("./swagger/swaggerui"))
	router.PathPrefix("/swaggerui/").Handler(http.StripPrefix("/swaggerui/", fs))

	fmt.Printf("🚀 Lancement de l'api sur le port %s\n", port)
	http.ListenAndServe(":"+port, router)
}
