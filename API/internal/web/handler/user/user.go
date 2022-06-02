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

// swagger:operation GET /user user GetAllUsers
// ---
// summary: Return all users
// description: If the are not users, an empty array will be returned
// responses:
//   "200":
//     "$ref": "#/responses/userStructArray"
//   "500":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) GetAll(w http.ResponseWriter, r *http.Request) {
	res, _ := json.Marshal(dao.FindAll())

	fmt.Fprintf(w, "%s", res)
}

// swagger:operation GET /user/{id} user GetUserById
// ---
// summary: Return a user by Id
// description: If the user is not found, a 404 status code will be returned
// parameters:
// - name: id
//   in: path
//   description: correspond to the user's Id
//   type: string
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/userStruct"
//   "404":
//     "$ref": "#/responses/errorsJson"
//   "500":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) Get(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, _ := strconv.Atoi(vars["id"])

	user, err := dao.FindById(id)

	if !err.IsNil() {

		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())
	} else {
		js, _ := json.Marshal(user)

		fmt.Fprintf(w, "%s", js)
	}

}

// swagger:operation POST /user user AddUser
// ---
// summary: Create a new user
// description: If the request body format is not correct, a 400 status code will be returned
// parameters:
// - name: user
//   in: body
//   description: user to add
//   schema:
//     "$ref": "#/definitions/User"
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/userStruct"
//   "400":
//     "$ref": "#/responses/errorsJson"
//   "500":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) Add(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)

	var user e.User

	var login e.Login

	json.Unmarshal(body, &user)

	login = e.NewLogin(user.Login, user.Password)

	notHashed, _ := login.UnHashPassword()

	user.Password = notHashed

	user.HashPassword()

	res, err := dao.Create(user)

	if !err.IsNil() {
		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())
	} else {

		js, _ := json.Marshal(res)

		fmt.Fprintf(w, "%s", js)
	}

}

// swagger:operation DELETE /user/{id} user DeleteUserById
// ---
// summary: Delete a user by Id
// description: If the user is not found, a 404 status code will be returned
// parameters:
// - name: id
//   in: path
//   description: correspond to the user's Id
//   type: string
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/userStruct"
//   "404":
//     "$ref": "#/responses/errorsJson"
//   "500":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) Delete(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id, _ := strconv.Atoi(vars["id"])

	user, err := dao.Delete(id)

	if !err.IsNil() {
		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())
	} else {
		js, _ := json.Marshal(user)
		fmt.Fprintf(w, "%s", js)
	}

}

// swagger:operation PUT /user user UpdateUser
// ---
// summary: Update an existing user
// description: If the request body format is not correct or the target user Id is not found, a 400 status code will be returned
// parameters:
// - name: user
//   in: body
//   description: user to update
//   schema:
//     "$ref": "#/definitions/User"
//   required: true
// responses:
//   "200":
//     "$ref": "#/responses/userStruct"
//   "404":
//     "$ref": "#/responses/errorsJson"
//   "500":
//     "$ref": "#/responses/errorsJson"
func (u UserRoutes) Update(w http.ResponseWriter, r *http.Request) {

	body, _ := ioutil.ReadAll(r.Body)

	var user e.User

	var login e.Login

	json.Unmarshal(body, &user)

	login = e.NewLogin(user.Login, user.Password)

	notHashed, _ := login.UnHashPassword()

	user.Password = notHashed

	user.HashPassword()

	user, err := dao.Update(user)

	if !err.IsNil() {
		w.WriteHeader(err.Code)

		fmt.Fprintf(w, "%s", err.ToJson())

	} else {
		js, _ := json.Marshal(user)

		fmt.Fprintf(w, "%s", js)
	}

}
