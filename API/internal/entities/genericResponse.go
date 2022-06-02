package entities

import (
	"encoding/json"
	"fmt"
)

type Data interface {
	Monodose | User | Logged
}

// swagger:response genericResponse
type _[T Data] struct {
	// in:body
	Body GenericResponse[T]
}

type GenericResponse[T Data] struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    T      `json:"data"`
}

func NewGenericResponse[T Data](code int, message string, data T) GenericResponse[T] {
	return GenericResponse[T]{code, message, data}
}

func (g GenericResponse[T]) Error() string {
	return fmt.Sprintf("Http code : %d & Message : %s\n", g.Code, g.Message)
}

func (g GenericResponse[T]) ToJson() string {
	res, _ := json.Marshal(g)
	return string(res)
}
