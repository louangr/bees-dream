package entities

type Collection interface {
	Monodose | User

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
