package dao

import (
	"context"
	"fmt"
	m "internal/persistence/mongo"
	"internal/persistence/types"
	"log"
	"utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Dao[T types.Collection] struct {
}

//var _ interfaces.RestDao[types.Collection] = (*Dao[types.Collection])(nil)

func NewDao[T types.Collection]() Dao[T] {

	return Dao[T]{}

}

func (d *Dao[T]) FindAll() (t []T) {

	var res []T

	var obj T

	var collection string = types.GetCollection(obj)

	conn, err := m.GetConnexion()

	if err == nil {
		var results []bson.M

		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)

		var option *options.FindOptions = options.Find().SetProjection(bson.D{{"_id", 0}})

		cursor, err := coll.Find(context.Background(), bson.M{}, option)

		if err = cursor.All(context.TODO(), &results); err != nil {
			log.Fatalf("Impossible de récupérer l'ensemble des données dans %s : %v \n", collection, err)
		}

		utils.BsonToStructs(results, &res)

	} else {
		log.Fatal("can't fetch find all")
	}

	return res
}

func (d *Dao[T]) FindById(id int) (T, error) {

	var obj T

	var collection string = types.GetCollection(obj)

	conn, err := m.GetConnexion()

	if err == nil {

		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)

		err := coll.FindOne(context.TODO(), bson.D{{"Id", id}}).Decode(&obj)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				return types.Empty(obj), fmt.Errorf("Id %d does not exist in %s collection", id, collection)
			}
		}
		return obj, nil
	}

	return types.Empty(obj), fmt.Errorf("Can't get data from database")

}

func (d *Dao[T]) Exist(id int) bool {

	var obj T

	var collection string = types.GetCollection(obj)

	conn, err := m.GetConnexion()

	if err == nil {

		var item T

		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)

		coll.FindOne(context.TODO(), bson.D{{"Id", id}}).Decode(&item)

		if item.GetId() == 0 {
			return false
		}

		return true

	}

	return false
}

func (d *Dao[T]) Delete(id int) (T, error) {

	var empty T

	var collection string = types.GetCollection(empty)

	monodose, err := d.FindById(id)

	if err != nil {
		return monodose, err
	}

	conn, err := m.GetConnexion()

	if err == nil {
		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)
		var filter bson.D = bson.D{{"Id", id}}

		result, _ := coll.DeleteOne(context.TODO(), filter)

		if result.DeletedCount == 0 {
			return empty, fmt.Errorf("Can't delete %s with id %d does not exist", collection, id)
		}

		return monodose, nil

	}

	return empty, fmt.Errorf("Can't get data from database")
}

func (d *Dao[T]) Create(item T) (T, error) {

	var empty T

	var id int = item.GetId()

	var collection string = item.GetCollectionName()

	if d.Exist(id) {
		return empty, fmt.Errorf("Object %s with id %d already exist", collection, id)
	}

	conn, err := m.GetConnexion()

	if err == nil {
		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)

		_, err := coll.InsertOne(context.TODO(), item)
		if err != nil {
			return empty, fmt.Errorf("Can't insert object %s with id %d in database", collection, id)
		}

		return item, nil

	}

	return empty, fmt.Errorf("Can't get data from database")

}

func (d *Dao[T]) Update(item T) (T, error) {

	var empty T

	var id int = item.GetId()

	var collection string = item.GetCollectionName()

	if !d.Exist(id) {
		return empty, fmt.Errorf("Object %s with id %d does not exist", collection, id)
	}

	conn, err := m.GetConnexion()

	if err == nil {

		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)

		filter := bson.D{{"Id", id}}

		update := bson.D{{"$set", item}}

		_, err := coll.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			return empty, fmt.Errorf("Can't update object %s with id %d in database", collection, id)
		}

		return item, nil
	}

	return empty, fmt.Errorf("%s with id %d does not exist", collection, id)
}
