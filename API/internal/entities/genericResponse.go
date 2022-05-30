package entities

// swagger:response genericResponse
type swaggGenericResponse struct {
	// in:body
	Body struct {
		Message string `json:"message"`
	}
}
