package utils

import (
	"encoding/json"
	"fmt"
	"internal/persistence/types"
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func BsonToStructs[T types.Collection](data []primitive.M, storage *[]T) {

	for _, v := range data {

		var t T

		BsonToStruct(v, &t)

		*storage = append(*storage, t)
	}

}

func BsonToStruct[T types.Collection](data primitive.M, storage *T) {

	bytess, _ := bson.Marshal(data)

	bson.Unmarshal(bytess, &storage)
}

func StructToBson[T types.Collection](data T) bson.D {

	var result bson.D

	js, _ := json.Marshal(data)

	bson.Unmarshal(js, &result)

	return result

}

func HeadersMiddlewareNoJwt(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS")

		handler(w, r)

		var info string = fmt.Sprintf("Route : %s & Method : %s", r.URL, r.Method)

		WriteInLog(info)

	}
}

func HeadersMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS")

		var route string = strings.Split(r.RequestURI, "/")[1]

		var info string

		var method string = r.Method

		if route != "login" && method != "OPTIONS" {
			err := VerifyJWT(r, w)

			if !err.IsNil() {
				w.WriteHeader(err.Code)

				info = fmt.Sprintf("Route : %s & Method : %s", r.URL, method)

				WriteInLog(info)

				fmt.Fprintf(w, "%s", err.ToJson())
				return
			}
		}

		handler(w, r)

		info = fmt.Sprintf("Route : %s & Method : %s", r.URL, method)

		WriteInLog(info)

	}
}

func CORSVerification(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s", "{}")
}
