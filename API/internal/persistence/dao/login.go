package dao

import (
	"context"
	"fmt"
	e "internal/entities"
	m "internal/persistence/mongo"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Authentification struct {
}

func NewAuthentification() Authentification {
	return Authentification{}
}

func (a Authentification) Authentification(login string) (e.User, error) {

	var user e.User

	conn, err := m.GetConnexion()

	if err == nil {

		var coll *mongo.Collection = conn.Database("bee-dream").Collection("user")

		err := coll.FindOne(context.TODO(), bson.D{{"Login", login}}).Decode(&user)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				return e.User{}, fmt.Errorf("User with login %s does not exist", login)
			}
		}
		return user, nil
	}

	return e.User{}, fmt.Errorf("Can't get data from database")
}
