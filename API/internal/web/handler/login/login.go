package login

import (
	"encoding/json"
	"fmt"
	e "internal/entities"
	"io/ioutil"
	"net/http"
)

type LoginRoutes struct{}

func NewLoginRoutes() LoginRoutes {
	return LoginRoutes{}
}

func (m LoginRoutes) Connexion(w http.ResponseWriter, r *http.Request) {

	body, _ := ioutil.ReadAll(r.Body)

	var login e.Login

	json.Unmarshal(body, &login)

	fmt.Printf("%s", login)

	login.HashPassword()

	fmt.Printf("%s", login)

	fmt.Fprintf(w, "oui")

	/* 	if err != nil {
	   		fmt.Fprint(w, err.Error())
	   	} else {

	   		js, _ := json.Marshal(res)

	   		fmt.Fprintf(w, "%s", js)
	   	} */

}
