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

	for _, monodose := range monodoses {
		if monodose.Id == id {
			return true
		}
	}

	return false

}

func (d *DaoMonodose) Delete(id int) (e.Monodose, error) {

	for index, monodose := range monodoses {
		if monodose.Id == id {
			monodoses = append(monodoses[:index], monodoses[index+1:]...)
			return monodose, nil
		}
	}

	return e.Monodose{}, fmt.Errorf("id %d does not exist", id)

}

func (d *DaoMonodose) Create(item e.Monodose) (e.Monodose, error) {

	if !d.Exist(item.Id) {
		monodoses = append(monodoses, item)
		return item, nil
	}

	return e.Monodose{}, fmt.Errorf("Item with id %d already exist", item.Id)

}

func (d *DaoMonodose) Update(item e.Monodose) (e.Monodose, error) {

	for index, monodose := range monodoses {
		if item.Id == monodose.Id {
			monodoses[index] = monodose
			return monodose, nil
		}
	}

	return e.Monodose{}, fmt.Errorf("item with id %d does not exist", item.Id)
}
