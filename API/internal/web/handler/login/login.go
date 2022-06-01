package login

import (
	"encoding/json"
	"fmt"
	e "internal/entities"
	"internal/persistence/dao"
	"io/ioutil"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type LoginRoutes struct{}

func NewLoginRoutes() LoginRoutes {
	return LoginRoutes{}
}

func (m LoginRoutes) Connexion(w http.ResponseWriter, r *http.Request) {

	var auth dao.Authentification = dao.NewAuthentification()

	var user e.User

	var login e.Login

	body, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(body, &login)

	user, err := auth.Authentification(login.Login)

	if err != nil {
		fmt.Fprintf(w, "%s", err.Error())
		return
	}

	password, _ := login.UnHashPassword()

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		fmt.Fprintf(w, "Wrong password for login %s", user.Login)
		return
	}

	js, _ := json.Marshal(user)

	fmt.Fprintf(w, "%s", js)

}
