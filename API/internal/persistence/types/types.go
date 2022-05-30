package types

import "internal/entities"

type Collection interface {
	entities.Monodose | entities.User

	GetId() int
	GetCollectionName() string
}
