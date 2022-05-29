package handler

import (
	"encoding/json"
	"fmt"
	e "internal/entities"
	"internal/persistence/interfaces"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

var mondoses []e.Monodose = []e.Monodose{
	{0, e.Beekeeper{"dorian", "gauron", "21 corps"}, e.Date{"21/08/2002", "21/03/2002", "21/08/2000"}, "Nantes", "Chatenier"},
	{1, e.Beekeeper{"Louan", "portron", "super compagny"}, e.Date{"22/05/2001", "21/03/2000", "21/08/2020"}, "Tours", "Fôret"},
}

type MonodoseRoutes struct{}

func NewMonodoseRoutes() MonodoseRoutes {
	return MonodoseRoutes{}
}

var _ interfaces.Routes = (*MonodoseRoutes)(nil)

func (m MonodoseRoutes) GetAll(w http.ResponseWriter, r *http.Request) {
	res, _ := json.Marshal(mondoses)

	fmt.Fprintf(w, "%s", res)
}

func (m MonodoseRoutes) Get(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	var res e.Monodose

	id, _ := strconv.Atoi(vars["id"])

	for _, monodose := range mondoses {
		if monodose.Id == id {
			res = monodose
		}
	}

	if !res.IsNil() {
		js, _ := json.Marshal(res)

		fmt.Fprintf(w, "%s", js)

		return
	}

	fmt.Fprintf(w, "id not found")
}
func (m MonodoseRoutes) Add(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	var monodose e.Monodose

	json.Unmarshal(body, &monodose)

	for _, item := range mondoses {
		if monodose.Id == item.Id {

			fmt.Fprint(w, "L'id existe déjà")

			return
		}
	}

	mondoses = append(mondoses, monodose)

	fmt.Fprintf(w, "Item added")
}
func (m MonodoseRoutes) Delete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, _ := strconv.Atoi(vars["id"])

	var flag bool = false

	for index, monodose := range mondoses {
		if monodose.Id == id {
			mondoses = append(mondoses[:index], mondoses[index+1:]...)
			flag = true
		}
	}

	if flag {
		fmt.Fprintf(w, "Id %d deleted", id)
	} else {
		fmt.Fprintf(w, "id not found")
	}

}
func (m MonodoseRoutes) Update(w http.ResponseWriter, r *http.Request) {}
