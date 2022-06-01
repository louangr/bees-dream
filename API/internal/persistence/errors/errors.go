package errors

import (
	"encoding/json"
	"fmt"
)

type ErrorsJson struct {
	Code    int    `json:"Code"`
	Message string `json:"message"`
}

var _ error = (*ErrorsJson)(nil)

func NewError(code int, message string) ErrorsJson {
	return ErrorsJson{code, message}
}

func (errors ErrorsJson) IsNil() bool {
	return errors == ErrorsJson{}
}

func (e ErrorsJson) Error() string {
	return fmt.Sprintf("Http code : %d & Message : %s\n", e.Code, e.Message)
}

func (e ErrorsJson) ToJson() []byte {

	var errors ErrorsJson = NewError(e.Code, e.Message)

	res, _ := json.Marshal(errors)

	return res
}
