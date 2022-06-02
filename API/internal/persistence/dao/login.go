package dao

import (
	"context"
	"fmt"
	e "internal/entities"
	"internal/persistence/errors"
	m "internal/persistence/mongo"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Authentification struct {
}

func NewAuthentification() Authentification {
	return Authentification{}
}

func (a Authentification) Authentification(login string) (e.User, errors.ErrorsJson) {

	var user e.User

	var messageError string = "Can't get data from database"

	conn, err := m.GetConnexion()

	if err == nil {

		var coll *mongo.Collection = conn.Database("bee-dream").Collection("user")

		err := coll.FindOne(context.TODO(), bson.D{{"Login", login}}).Decode(&user)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				messageError = fmt.Sprintf("User with login %s does not exist", login)
				return e.User{}, errors.NewError(404, messageError)
			}
		}
		return user, errors.ErrorsJson{}
	}

	return e.User{}, errors.NewError(500, messageError)
}
