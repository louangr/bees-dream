package interfaces

import e "internal/entities"

type RestDao[T e.Monodose | e.User] interface {
	FindAll() []T
	FindById(id int) T
	Exist(id int) bool
	Delete(id int) bool
	Create(item T) bool
	Update(item T) bool
}
