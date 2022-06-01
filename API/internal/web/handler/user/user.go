package handler

import (
	"encoding/json"
	"fmt"
	e "internal/entities"
	d "internal/persistence/dao"
	"internal/persistence/interfaces"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type UserRoutes struct{}

func NewUserRoutes() UserRoutes {
	return UserRoutes{}
}

var _ interfaces.Routes = (*UserRoutes)(nil)

var dao d.Dao[e.User] = d.NewDao[e.User]()

// swagger:operation GET /monodose monodose GetAll
// ---
// summary: Return all monodoses
// description: If the are not monodoses, an empty array will be returned
// responses:
//   "200":
//     "$ref": "#/responses/monodoseStructArray"
func (u UserRoutes) GetAll(w http.ResponseWriter, r *http.Request) {
	res, _ := json.Marshal(dao.FindAll())

	fmt.Fprintf(w, "%s", res)
}

// swagger:operation GET /monodose/{id} monodose Get
// ---
// summary: Return a monodose by Id
// description: If the monodose is not found, a 404 status code will be returned
// parameters:
// - name: id
//   in: path
//   description: correspond to the monodose's Id
//   type: string
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/monodoseStruct"
//   "404":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) Get(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, _ := strconv.Atoi(vars["id"])

	monodose, err := dao.FindById(id)

	if !err.IsNil() {

		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())
	} else {
		js, _ := json.Marshal(monodose)

		fmt.Fprintf(w, "%s", js)
	}

}

// swagger:operation POST /monodose monodose Add
// ---
// summary: Create a new monodose
// description: If the request body format is not correct, a 400 status code will be returned
// responses:
//   "200":
//     "$ref": "#/responses/errorsJson"
//   "400":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) Add(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	var user e.User

	json.Unmarshal(body, &user)

	res, err := dao.Create(user)

	if !err.IsNil() {
		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())
	} else {

		js, _ := json.Marshal(res)

		fmt.Fprintf(w, "%s", js)
	}

}

// swagger:operation DELETE /monodose/{id} monodose Delete
// ---
// summary: Delete a monodose by Id
// description: If the monodose is not found, a 404 status code will be returned
// parameters:
// - name: id
//   in: path
//   description: correspond to the monodose's Id
//   type: string
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/errorsJson"
//   "404":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) Delete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, _ := strconv.Atoi(vars["id"])

	monodose, err := dao.Delete(id)

	if !err.IsNil() {
		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())
	} else {
		js, _ := json.Marshal(monodose)
		fmt.Fprintf(w, "%s", js)
	}

}

// swagger:operation PUT /monodose monodose Update
// ---
// summary: Update an existing monodose
// description: If the request body format is not correct or the target monodose Id is not found, a 400 status code will be returned
// responses:
//   "200":
//     "$ref": "#/responses/errorsJson"
//   "400":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) Update(w http.ResponseWriter, r *http.Request) {

	body, _ := ioutil.ReadAll(r.Body)

	var user e.User

	json.Unmarshal(body, &user)

	user, err := dao.Update(user)

	if !err.IsNil() {
		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())

	} else {
		js, _ := json.Marshal(user)

		fmt.Fprintf(w, "%s", js)
	}

}
