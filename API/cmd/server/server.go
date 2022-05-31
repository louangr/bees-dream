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
	handlerMonodose "internal/web/handler/monodose"
	handlerUser "internal/web/handler/user"
	"log"

	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	const port string = "8080"

	// corsObj := handlers.AllowedOrigins([]string{"*"})
	// methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})

	err := m.Connexion()

	if err != nil {
		log.Fatal(err.Error())
	}

	router := mux.NewRouter()

	//Swagger
	fs := http.FileServer(http.Dir("./swagger/swaggerui"))
	router.PathPrefix("/swaggerui/").Handler(http.StripPrefix("/swaggerui/", fs))

	//Monodose

	routesM := handlerMonodose.NewMonodoseRoutes()

	monodoseR := router.PathPrefix("/monodose").Subrouter()

	//Get all
	monodoseR.HandleFunc("", routesM.GetAll).Methods("GET")

	//Get by id
	monodoseR.HandleFunc("/{id}", routesM.Get).Methods("GET")

	//Add
	monodoseR.HandleFunc("", routesM.Add).Methods("POST")

	//Delete
	monodoseR.HandleFunc("/{id}", routesM.Delete).Methods("DELETE")

	//Update
	monodoseR.HandleFunc("", routesM.Update).Methods("PUT")

	//User

	routesU := handlerUser.NewUserRoutes()

	userR := router.PathPrefix("/user").Subrouter()

	userR.HandleFunc("", routesU.Update).Methods("PUT")

	userR.HandleFunc("", routesU.Add).Methods("POST")

	userR.HandleFunc("", routesU.GetAll).Methods("GET")

	userR.HandleFunc("/{id}", routesU.Get).Methods("GET")

	userR.HandleFunc("/{id}", routesU.Delete).Methods("DELETE")

	/*
		//Login
		router.HandleFunc("/login/").Methods("POST")
	*/

	fmt.Printf("🚀 Lancement de l'api sur le port %s\n", port)

	// http.ListenAndServe(":"+port, handlers.CORS(corsObj, methodsOk)(router))
	http.ListenAndServe(":"+port, router)
}
