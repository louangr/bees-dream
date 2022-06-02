package interfaces

import "internal/entities"

type RestDao[T entities.Collection] interface {
	FindAll() []T
	FindById(id int) entities.GenericResponse[T]
	Exist(id int) bool
	Delete(id int) entities.GenericResponse[T]
	Create(item T) entities.GenericResponse[T]
	Update(item T) entities.GenericResponse[T]
}
