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

var dao d.DaoMonodose = d.NewDao()

func (m MonodoseRoutes) GetAll(w http.ResponseWriter, r *http.Request) {

	res, _ := json.Marshal(dao.FindAll())

	fmt.Fprintf(w, "%s", res)
}

func (m MonodoseRoutes) Get(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, _ := strconv.Atoi(vars["id"])

	monodose, err := dao.FindById(id)

	if err != nil {
		fmt.Fprintf(w, err.Error())
	} else {
		js, _ := json.Marshal(monodose)

		fmt.Fprintf(w, "%s", js)
	}

}
func (m MonodoseRoutes) Add(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	var monodose e.Monodose

	json.Unmarshal(body, &monodose)

	res, err := dao.Create(monodose)

	if err != nil {
		fmt.Fprint(w, err.Error())
	} else {
		fmt.Fprintf(w, "%v", res)
	}

}
func (m MonodoseRoutes) Delete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, _ := strconv.Atoi(vars["id"])

	monodose, err := dao.Delete(id)

	if err != nil {
		fmt.Fprint(w, err.Error())
	} else {
		fmt.Fprint(w, "%v", monodose)
	}

}
func (m MonodoseRoutes) Update(w http.ResponseWriter, r *http.Request) {

	body, _ := ioutil.ReadAll(r.Body)

	var monodose e.Monodose

	json.Unmarshal(body, &monodose)

	res, err := dao.Update(monodose)

	if err != nil {
		fmt.Fprintf(w, err.Error())
	} else {
		fmt.Fprintf(w, "%v", res)
	}

}
