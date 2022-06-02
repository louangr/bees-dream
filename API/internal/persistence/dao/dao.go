package dao

import (
	"context"
	"fmt"
	"internal/entities"
	m "internal/persistence/mongo"
	"log"
	"utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Dao[T entities.Collection] struct {
}

//var _ interfaces.RestDao[entities.Collection] = (*Dao[entities.Collection])(nil)

func NewDao[T entities.Collection]() Dao[T] {

	return Dao[T]{}

}

func (d *Dao[T]) FindAll() (t []T) {

	var res []T

	var obj T

	var collection string = entities.GetCollection(obj)

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

func (d *Dao[T]) FindById(id int) entities.GenericResponse[T] {

	var obj T

	var messageError string = "Can't get data from database"

	var collection string = entities.GetCollection(obj)

	conn, err := m.GetConnexion()

	if err == nil {

		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)

		err := coll.FindOne(context.TODO(), bson.D{{"Id", id}}).Decode(&obj)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				messageError = fmt.Sprintf("Id %d does not exist in %s collection", id, collection)
				return entities.NewGenericResponse[T](404, messageError, obj)
			}
		}
		return entities.NewGenericResponse[T](200, "bbbb", obj)
	}

	return entities.NewGenericResponse[T](500, messageError, obj)
}

func (d *Dao[T]) Exist(id int) bool {

	var obj T

	var collection string = entities.GetCollection(obj)

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

func (d *Dao[T]) Delete(id int) entities.GenericResponse[T] {

	var empty T

	var messageError string = "Can't get data from database"

	var collection string = entities.GetCollection(empty)

	genericResponse := d.FindById(id)

	conn, t := m.GetConnexion()

	if t == nil {
		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)
		var filter bson.D = bson.D{{"Id", id}}

		result, _ := coll.DeleteOne(context.TODO(), filter)

		if result.DeletedCount == 0 {
			messageError = fmt.Sprintf("Can't delete %s with id %d does not exist", collection, id)
			return entities.NewGenericResponse[T](404, messageError, empty)
		}

		return entities.NewGenericResponse[T](200, "success", genericResponse.Data)
	}

	return entities.NewGenericResponse[T](500, messageError, empty)
}

func (d *Dao[T]) Create(item T) entities.GenericResponse[T] {

	var empty T

	var id int = item.GetId()

	var final any

	var messageError string = "Can't get data from database"

	var collection string = item.GetCollectionName()

	if d.Exist(id) {
		messageError = fmt.Sprintf("Object %s with id %d already exist", collection, id)
		return entities.NewGenericResponse[T](400, messageError, empty)
	}

	if id == -1 {
		final = item.CreateWithId()
	} else {
		final = item
	}

	conn, err := m.GetConnexion()

	if err == nil {
		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)

		_, err := coll.InsertOne(context.TODO(), final)
		if err != nil {
			messageError = fmt.Sprintf("Can't insert object %s with id %d in database", collection, id)
			return entities.NewGenericResponse[T](500, messageError, empty)
		}

		return entities.NewGenericResponse[T](200, "success", final.(T))
	}

	return entities.NewGenericResponse[T](500, messageError, empty)
}

func (d *Dao[T]) Update(item T) entities.GenericResponse[T] {

	var empty T

	var messageError string = "Can't get data from database"

	var id int = item.GetId()

	var collection string = item.GetCollectionName()

	if !d.Exist(id) {
		messageError = fmt.Sprintf("Object %s with id %d does not exist", collection, id)
		return entities.NewGenericResponse[T](404, messageError, empty)
	}

	conn, err := m.GetConnexion()

	if err == nil {

		var coll *mongo.Collection = conn.Database("bee-dream").Collection(collection)

		filter := bson.D{{"Id", id}}

		update := bson.D{{"$set", item}}

		_, err := coll.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			messageError = fmt.Sprintf("Can't update object %s with id %d in database", collection, id)
			return entities.NewGenericResponse[T](500, messageError, empty)
		}

		return entities.NewGenericResponse[T](200, "success", item)
	}

	return entities.NewGenericResponse[T](500, messageError, empty)
}
