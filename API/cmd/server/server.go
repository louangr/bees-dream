package main

import (
	"fmt"
	h "internal/web/handler"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	const port string = "8080"

	router := mux.NewRouter()

	//Monodose

	routesM := h.NewMonodoseRoutes()

	monodoseR := router.PathPrefix("/monodose/").Subrouter()

	//Get all monodose
	monodoseR.HandleFunc("/", routesM.GetAll).Methods("GET")

	//Get monodose by id
	monodoseR.HandleFunc("/{id}", routesM.Get).Methods("GET")

	//Add monodose
	monodoseR.HandleFunc("/", routesM.Add).Methods("POST")

	//Delete monodose
	monodoseR.HandleFunc("/{id}", routesM.Delete).Methods("DELETE")

	/*

		monodoseR.HandleFunc("/").Methods("PUT")

		//User

		userR := router.PathPrefix("/user/").Subrouter()

		userR.HandleFunc("/").Methods("PUT")

		userR.HandleFunc("/").Methods("POST")

		userR.HandleFunc("/{id}").Methods("GET")

		userR.HandleFunc("/{id}").Methods("DELETE")

		//Login
		router.HandleFunc("/login/").Methods("POST") */

	fmt.Printf("🚀 Lancement de l'api sur le port %s", port)

	http.ListenAndServe(":"+port, router)
}
