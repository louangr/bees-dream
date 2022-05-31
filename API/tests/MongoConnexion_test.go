package tests

import (
	"internal/persistence/mongo"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMongoConnexion(t *testing.T) {

	const uri string = "mongodb://admin:fV8RzYZEtYMasc@167.99.83.46:27017/?authMechanism=SCRAM-SHA-1"

	os.Setenv("MONGO_URI", uri)

	err := mongo.Connexion()
	assert.Equal(t, nil, err, "Connexion impossible avec la base de données mongo db")

}
