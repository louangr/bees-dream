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

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {

	const port string = "8080"

	corsObj := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})

	err := m.Connexion()

	if err != nil {
		log.Fatal(err.Error())
	}

	router := mux.NewRouter()

	//Swagger
	fs := http.FileServer(http.Dir("./swagger/swaggerui"))
	router.PathPrefix("/swaggerui/").Handler(http.StripPrefix("/swaggerui/", fs))

	//Monodose

	routesM := hMonodose.NewMonodoseRoutes()

	monodoseR := router.PathPrefix("/monodose").Subrouter()

	//Get all
	monodoseR.HandleFunc("", MiddlewareJson(routesM.GetAll)).Methods("GET")

	//Get by id
	monodoseR.HandleFunc("/{id}", MiddlewareJson(routesM.Get)).Methods("GET")

	//Add
	monodoseR.HandleFunc("", MiddlewareJson(routesM.Add)).Methods("POST")

	//Delete
	monodoseR.HandleFunc("/{id}", MiddlewareJson(routesM.Delete)).Methods("DELETE")

	//Update
	monodoseR.HandleFunc("", MiddlewareJson(routesM.Update)).Methods("PUT")

	//CORSVerification
	monodoseR.HandleFunc("", MiddlewareJson(routesM.CORSVerification)).Methods("OPTIONS")

	//User

	routesU := hUser.NewUserRoutes()

	userR := router.PathPrefix("/user").Subrouter()

	//Update
	userR.HandleFunc("", MiddlewareJson(routesU.Update)).Methods("PUT")

	//Add
	userR.HandleFunc("", MiddlewareJson(routesU.Add)).Methods("POST")

	//Get all
	userR.HandleFunc("", MiddlewareJson(routesU.GetAll)).Methods("GET")

	//Get by id
	userR.HandleFunc("/{id}", MiddlewareJson(routesU.Get)).Methods("GET")

	//Delete
	userR.HandleFunc("/{id}", MiddlewareJson(routesU.Delete)).Methods("DELETE")

	//Login

	routesL := hLogin.NewLoginRoutes()

	router.HandleFunc("/login", routesL.Connexion).Methods("POST")

	fmt.Printf("🚀 Lancement de l'api sur le port %s\n", port)

	http.ListenAndServe(":"+port, handlers.CORS(corsObj, methodsOk)(router))
}
