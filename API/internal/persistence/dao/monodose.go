package dao

import (
	"context"
	"fmt"
	e "internal/entities"
	"internal/persistence/interfaces"
	m "internal/persistence/mongo"
	"log"
	"utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var monodoses []e.Monodose = []e.Monodose{
	e.NewMonodose(0, e.Beekeeper{"dorian", "gaufron", "21 corps"}, e.Date{"21/08/2002", "21/03/2002", "21/08/2000"}, "Nantes", "Chatenier"),
	e.NewMonodose(1, e.Beekeeper{"Louan", "portron", "super compagny"}, e.Date{"22/05/2001", "21/03/2000", "21/08/2020"}, "Tours", "Fôret"),
}

type DaoMonodose struct {
}

var _ interfaces.RestDao[e.Monodose] = (*DaoMonodose)(nil)

func NewDao() DaoMonodose {
	return DaoMonodose{}

}

func (d *DaoMonodose) FindAll() []e.Monodose {

	var res []e.Monodose

	conn, err := m.GetConnexion()

	//defer conn.Disconnect(context.TODO())

	if err == nil {
		var results []bson.M

		var coll *mongo.Collection = conn.Database("bee-dream").Collection("monodose")

		var option *options.FindOptions = options.Find().SetProjection(bson.D{{"_id", 0}})

		cursor, err := coll.Find(context.Background(), bson.M{}, option)

		if err = cursor.All(context.TODO(), &results); err != nil {
			log.Fatalf("Impossible de récupérer l'ensemble des données dans %s : %v \n", "monodose", err)
		}

		utils.BsonToStructs(results, &res)

	} else {
		log.Fatal("can't fetch find all")
	}

	conn.Disconnect(context.TODO())

	return res
}

func (d *DaoMonodose) FindById(id int) (e.Monodose, error) {

	var monodose e.Monodose

	conn, err := m.GetConnexion()
	//defer conn.Disconnect(context.TODO())

	if err == nil {

		var coll *mongo.Collection = conn.Database("bee-dream").Collection("monodose")

		err := coll.FindOne(context.TODO(), bson.D{{"Id", id}}).Decode(&monodose)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				return e.Monodose{}, fmt.Errorf("Id %d does not exist", id)
			}
		}

		return monodose, nil

	}

	return monodose, fmt.Errorf("Can't get data from database")

}

func (d *DaoMonodose) Exist(id int) bool {

	conn, err := m.GetConnexion()
	//defer conn.Disconnect(context.TODO())

	if err == nil {

		var monodose e.Monodose

		var coll *mongo.Collection = conn.Database("bee-dream").Collection("monodose")

		err := coll.FindOne(context.TODO(), bson.D{{"Id", id}}).Decode(&monodose)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				return false
			}
		}

		return true

	}

	return false
}

func (d *DaoMonodose) Delete(id int) (e.Monodose, error) {

	//defer conn.Disconnect(context.TODO())

	monodose, err := d.FindById(id)

	if err != nil {
		return monodose, err
	}

	conn, err := m.GetConnexion()

	if err == nil {
		var coll *mongo.Collection = conn.Database("bee-dream").Collection("monodose")
		var filter bson.D = bson.D{{"Id", id}}

		result, _ := coll.DeleteOne(context.TODO(), filter)

		if result.DeletedCount == 0 {
			return e.Monodose{}, fmt.Errorf("Can't delete object with id %d does not exist", id)
		}

		return monodose, nil

	}

	return e.Monodose{}, fmt.Errorf("Can't get data from database")
}

func (d *DaoMonodose) Create(item e.Monodose) (e.Monodose, error) {

	if d.Exist(item.Id) {
		return e.Monodose{}, fmt.Errorf("Object monodose with id %d already exist", item.Id)
	}

	conn, err := m.GetConnexion()

	if err == nil {
		var coll *mongo.Collection = conn.Database("bee-dream").Collection("monodose")

		_, err := coll.InsertOne(context.TODO(), item)

		if err != nil {
			return e.Monodose{}, fmt.Errorf("Can't insert object monodose with id %d in database", item.Id)
		}

		return item, nil

	}

	return e.Monodose{}, fmt.Errorf("Can't get data from database")

}

func (d *DaoMonodose) Update(item e.Monodose) (e.Monodose, error) {

	if !d.Exist(item.Id) {
		return e.Monodose{}, fmt.Errorf("Object monodose with id %d does not exist", item.Id)
	}

	conn, err := m.GetConnexion()

	if err == nil {

		var coll *mongo.Collection = conn.Database("bee-dream").Collection("monodose")

		filter := bson.D{{"Id", item.Id}}

		update := bson.D{{"$set", item}}

		_, err := coll.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			return e.Monodose{}, fmt.Errorf("Can't update object monodose with id %d in database", item.Id)
		}

		return item, nil
	}

	return e.Monodose{}, fmt.Errorf("item with id %d does not exist", item.Id)
}
