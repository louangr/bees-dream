package types

import "internal/entities"

type Collection interface {
	entities.Monodose | entities.User

	GetId() int
	CreateWithId() any
	GetCollectionName() string
}

func GetCollection[T Collection](t T) string {
	return t.GetCollectionName()
}

func Empty[T Collection](t T) T {
	var empty T
	return empty
}
