// Package classification Bee's Dream beekeepers and monodoses APIs
//
// Bee's Dream beekeepers and monodoses APIs
//
// Terms Of Service:
//
//	Schemes: http, https
//	Version: 1.0.0
//	BasePath: /
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
	h "internal/web/handler"
	"net/http"

	"github.com/gorilla/handlers"

	"github.com/gorilla/mux"
)

func main() {

	const port string = "8080"

	corsObj := handlers.AllowedOrigins([]string{"*"})

	m.Connexion()

	router := mux.NewRouter()

	//Swagger
	fs := http.FileServer(http.Dir("./swagger/swaggerui"))
	router.PathPrefix("/swaggerui/").Handler(http.StripPrefix("/swaggerui/", fs))

	//Monodose

	routesM := h.NewMonodoseRoutes()

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

	/*


		//User

		userR := router.PathPrefix("/user/").Subrouter()

		userR.HandleFunc("/").Methods("PUT")

		userR.HandleFunc("/").Methods("POST")

		userR.HandleFunc("/{id}").Methods("GET")

		userR.HandleFunc("/{id}").Methods("DELETE")

		//Login
		router.HandleFunc("/login/").Methods("POST") */

	fmt.Printf("🚀 Lancement de l'api sur le port %s\n", port)

	http.ListenAndServe(":"+port, handlers.CORS(corsObj)(router))
}
