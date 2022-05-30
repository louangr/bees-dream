package utils

import (
	"encoding/json"
	"fmt"
	e "internal/entities"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func BsonToStructs(data []primitive.M, storage *[]e.Monodose) {

	for _, v := range data {

		var t e.Monodose

		BsonToStruct(v, &t)

		*storage = append(*storage, t)
	}

}

func BsonToStruct(data primitive.M, storage *e.Monodose) {

	bytess, _ := bson.Marshal(data)

	bson.Unmarshal(bytess, &storage)
}

func StructToBson(data e.Monodose) bson.D {

	var result bson.D

	js, _ := json.Marshal(data)

	fmt.Printf("test js : %v", js)

	bson.Unmarshal(js, &result)

	return result

}
