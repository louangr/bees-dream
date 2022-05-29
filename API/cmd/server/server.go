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

	/* 	monodoseR.HandleFunc("/{id}").Methods("GET")

	   	monodoseR.HandleFunc("/").Methods("PUT")

	   	monodoseR.HandleFunc("/").Methods("POST")

	   	monodoseR.HandleFunc("/{id}").Methods("DELETE")

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
