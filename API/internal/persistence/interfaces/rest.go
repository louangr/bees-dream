package interfaces

import (
	error "internal/persistence/errors"
	t "internal/persistence/types"
)

type RestDao[T t.Collection] interface {
	FindAll() []T
	FindById(id int) (T, error.ErrorsJson)
	Exist(id int) bool
	Delete(id int) (T, error.ErrorsJson)
	Create(item T) (T, error.ErrorsJson)
	Update(item T) (T, error.ErrorsJson)
}
