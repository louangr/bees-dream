package interfaces

import (
	t "internal/persistence/types"
)

type RestDao[T t.Collection] interface {
	FindAll() []T
	FindById(id int) (T, error)
	Exist(id int) bool
	Delete(id int) (T, error)
	Create(item T) (T, error)
	Update(item T) (T, error)
}
