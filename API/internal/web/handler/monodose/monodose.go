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

type MonodoseRoutes struct{}

func NewMonodoseRoutes() MonodoseRoutes {
	return MonodoseRoutes{}
}

var _ interfaces.Routes = (*MonodoseRoutes)(nil)

var dao d.Dao[e.Monodose] = d.NewDao[e.Monodose]()

// swagger:operation GET /monodose monodose GetAll
// ---
// summary: Return all monodoses
// description: If the are not monodoses, an empty array will be returned
// responses:
//   "200":
//     "$ref": "#/responses/monodoseStructArray"
func (m MonodoseRoutes) GetAll(w http.ResponseWriter, r *http.Request) {
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
//     "$ref": "#/responses/genericResponse"
func (m MonodoseRoutes) Get(w http.ResponseWriter, r *http.Request) {

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
// parameters:
// - name: monodose
//   in: body
//   description: monodose to add
//   schema:
//     "$ref": "#/definitions/Monodose"
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/genericResponse"
//   "400":
//     "$ref": "#/responses/genericResponse"
func (m MonodoseRoutes) Add(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	var monodose e.Monodose

	json.Unmarshal(body, &monodose)

	res, err := dao.Create(monodose)

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
//     "$ref": "#/responses/genericResponse"
//   "404":
//     "$ref": "#/responses/genericResponse"
func (m MonodoseRoutes) Delete(w http.ResponseWriter, r *http.Request) {
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
// parameters:
// - name: monodose
//   in: body
//   description: monodose to update
//   schema:
//     "$ref": "#/definitions/Monodose"
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/genericResponse"
//   "400":
//     "$ref": "#/responses/genericResponse"
func (m MonodoseRoutes) Update(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	var monodose e.Monodose

	json.Unmarshal(body, &monodose)

	monodose, err := dao.Update(monodose)

	if !err.IsNil() {
		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())
	} else {
		js, _ := json.Marshal(monodose)

		fmt.Fprintf(w, "%s", js)
	}

}

func (m MonodoseRoutes) CORSVerification(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS")
	fmt.Fprintf(w, "%s", "{}")
}
