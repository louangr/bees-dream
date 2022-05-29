package interfaces

import e "internal/entities"

type RestDao[T e.Monodose | e.User] interface {
	FindAll() []T
	FindById(id int) (T, error)
	Exist(id int) bool
	Delete(id int) (T, error)
	Create(item T) (T, error)
	Update(item T) (T, error)
}
