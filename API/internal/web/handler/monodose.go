package handler

import (
	"encoding/json"
	"fmt"
	e "internal/entities"
	"internal/persistence/interfaces"
	"net/http"
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

func (m MonodoseRoutes) Get(w http.ResponseWriter, r *http.Request)    {}
func (m MonodoseRoutes) Update(w http.ResponseWriter, r *http.Request) {}
func (m MonodoseRoutes) Add(w http.ResponseWriter, r *http.Request)    {}
func (m MonodoseRoutes) Delete(w http.ResponseWriter, r *http.Request) {}
