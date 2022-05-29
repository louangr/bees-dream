package mongo

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const envFile string = "./configs/.env"

type MyMongo struct {
}

func Connection() {

	var uri string

	err := godotenv.Load(envFile)

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	uri = fmt.Sprintf("%s", os.Getenv("MONGO_URI"))

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err != nil {
		log.Fatal("Erreur de connexion à la base mongoDB")
	}

	fmt.Println("📁 Connecté à la base mongodb")

	fmt.Printf("%v", client)
}
