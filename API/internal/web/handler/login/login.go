package login

import (
	"encoding/json"
	"fmt"
	e "internal/entities"
	"internal/persistence/dao"
	"internal/persistence/errors"
	"io/ioutil"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type LoginRoutes struct{}

func NewLoginRoutes() LoginRoutes {
	return LoginRoutes{}
}

func (m LoginRoutes) Connexion(w http.ResponseWriter, r *http.Request) {

	var user e.User

	var login e.Login

	var messageError string

	var auth dao.Authentification = dao.NewAuthentification()

	body, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(body, &login)

	user, errAuth := auth.Authentification(login.Login)

	if !errAuth.IsNil() {
		w.WriteHeader(errAuth.Code)

		fmt.Fprintf(w, "%s", errAuth.ToJson())
	} else {
		password, _ := login.UnHashPassword()

		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

		if err != nil {

			messageError = fmt.Sprintf("Wrong password for login %s", user.Login)
			errAuth = errors.NewError(404, messageError)

			w.WriteHeader(errAuth.Code)
			fmt.Fprintf(w, "%s", errAuth.ToJson())

		} else {

			var logged e.Logged = e.NewLogged(user, "token")

			js, _ := json.Marshal(logged)

			fmt.Fprintf(w, "%s", js)
		}

	}

}
