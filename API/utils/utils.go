package utils

import (
	"encoding/json"
	"internal/persistence/types"
	"net/http"

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

func MiddlewareJson(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		handler(w, r)
	}
}
