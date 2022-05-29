package main

import "github.com/gorilla/mux"

func main() {

	router := mux.NewRouter()

	//Monodose

	monodoseR := router.PathPrefix("/monodose/").Subrouter()

	//Get all monodose
	monodoseR.HandleFunc("/").Methods("GET")

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
}
