package mongo

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const envFile string = "./configs/.env"

var conn *mongo.Client

type MyMongo struct {
}

func Connexion() error {

	var uri string

	err := godotenv.Load(envFile)

	if err != nil {
		return fmt.Errorf("Error loading .env file")
	}

	uri = fmt.Sprintf("%s", os.Getenv("MONGO_URI"))

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err != nil {
		return fmt.Errorf("❌ Erreur de connexion à la base mongoDB \nErreur : %s", err.Error())
	}

	fmt.Println("📁 Connecté à la base mongodb")

	conn = client

	return nil
}

func GetConnexion() (*mongo.Client, error) {
	if conn == nil {
		return nil, fmt.Errorf("Impossible de se connecter")
	}
	return conn, nil
}
