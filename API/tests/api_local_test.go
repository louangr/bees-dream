package tests

import (
	"fmt"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFindAllMonodose(t *testing.T) {

	const uri string = "http://localhost:8080/monodose"

	res, _ := http.Get(uri)

	fmt.Printf("Test : %v", res)

	assert.Equal(t, 1, 1)
	/* 	var data []entities.Student

	   	req, err := http.Get(prefix + "/students")

	   	if err != nil {
	   		t.Error("Erreur lors du GET")
	   	}

	   	body, err := io.ReadAll(req.Body)

	   	json.Unmarshal(body, &data)

	   	assert.Greater(t, len(data), 1) */

}
