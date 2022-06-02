package login

import (
	"encoding/json"
	"fmt"
	e "internal/entities"
	"internal/persistence/dao"
	"internal/persistence/errors"
	"io/ioutil"
	"net/http"
	"utils"

	"golang.org/x/crypto/bcrypt"
)

type LoginRoutes struct{}

func NewLoginRoutes() LoginRoutes {
	return LoginRoutes{}
}

// swagger:operation POST /login login Login
// ---
// summary: Ask for login
// description: Ask for login by send Login object in the request body
// parameters:
// - name: login
//   in: body
//   description: login info to check
//   schema:
//     "$ref": "#/definitions/Login"
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/loggedStruct"
//   "404":
//     "$ref": "#/responses/errorsJson"
//   "500":
//     "$ref": "#/responses/errorsJson"
func (m LoginRoutes) Connexion(w http.ResponseWriter, r *http.Request) {

	var user e.User

	var login e.Login

	var messageError string

	var auth dao.Authentification = dao.NewAuthentification()

	body, _ := ioutil.ReadAll(r.Body)

	json.Unmarshal(body, &login)

	user, errAuth := auth.Authentification(login.Login)

	fmt.Println("U : ", user)

	if !errAuth.IsNil() {
		w.WriteHeader(errAuth.Code)

		fmt.Fprintf(w, "%s", errAuth.ToJson())
		return
	}

	fmt.Println("Hashed : ", login.Password)

	password, _ := login.UnHashPassword()

	fmt.Println("Pass : ", password)

	fmt.Println("User :", user.Password)

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	fmt.Println("Err : ", err)

	if err != nil {

		messageError = fmt.Sprintf("Wrong password for login %s", user.Login)
		errAuth = errors.NewError(404, messageError)

		w.WriteHeader(errAuth.Code)
		fmt.Fprintf(w, "%s", errAuth.ToJson())
		return

	}

	token, errJ := utils.GenerateJWT(user)

	if !errJ.IsNil() {
		w.WriteHeader(errAuth.Code)
		fmt.Fprintf(w, "%s", errJ.ToJson())
		return
	}

	var logged e.Logged = e.NewLogged(user, token.Token)

	js, _ := json.Marshal(logged)

	/* 	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   token.Token,
		Expires: token.Time,
	}) */

	fmt.Fprintf(w, "%s", js)

}
