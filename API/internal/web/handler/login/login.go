package login

import (
	"encoding/json"
	"fmt"
	e "internal/entities"
	"internal/persistence/dao"
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

	response := auth.Authentification(login.Login)

	if response.Code != 200 {
		fmt.Fprintf(w, "%s", e.NewGenericResponse[e.Logged](response.Code, response.Message, e.Logged{}).ToJson())
		return
	}

	password, _ := login.UnHashPassword()

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err != nil {
		messageError = fmt.Sprintf("Wrong password for login %s", user.Login)
		fmt.Fprintf(w, "%s", e.NewGenericResponse[e.Logged](404, messageError, e.Logged{}).ToJson())
		return
	}

	token, errJ := utils.GenerateJWT(user)

	if !errJ.IsNil() {
		fmt.Fprintf(w, "%s", e.NewGenericResponse[e.Logged](errJ.Code, errJ.Message, e.Logged{}).ToJson())
		return
	}

	var logged e.Logged = e.NewLogged(user, token.Token)

	/* 	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   token.Token,
		Expires: token.Time,
	}) */

	fmt.Fprintf(w, "%s", e.NewGenericResponse[e.Logged](200, messageError, logged).ToJson())
}
