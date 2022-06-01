package entities

import "fmt"

// swagger:response userStruct
type swaggUserStruct struct {
	// in:body
	Body User
}

// swagger:response userStructArray
type swaggUserStructArray struct {
	// in:body
	Body []User
}

type Information struct {
	FirstName string `json:"firstname" bson:"FirstName"`
	LastName  string `json:"lastname" bson:"LastName"`
	Company   string `json:"company" bson:"Company"`
}

type User struct {
	Id           int         `json:"id" bson:"Id"`
	Informations Information `json:"informations" bson:"Informations"`
	Role         string      `json:"role" bson:"Role"`
	Login        string      `json:"login" bson:"Login"`
	Password     string      `json:"password" bson:"Password"`
}

func NewUser(id int, informations Information, role string, login string, password string) User {
	return User{id, informations, role, login, password}
}

func NewInformation(firstName string, lastName string, compagny string) Information {
	return Information{firstName, lastName, compagny}
}

func (u User) GetId() int {
	return u.Id
}

func (u User) GetCollectionName() string {
	return "user"
}

func (u User) Empty() any {
	return User{}
}

func (u *User) String() string {
	return fmt.Sprintf("User{\n"+
		"id : %d,\n"+
		"information:{\n"+
		"\tfirstName : %s,\n"+
		"\tlastName : %s,\n"+
		"\tcompagny : %s,\n"+
		"},\n"+
		"role : %s,\n"+
		"login : %s,\n"+
		"password : %s,\n"+
		"}", u.Id, u.Informations.FirstName, u.Informations.LastName, u.Informations.Company, u.Role, u.Login, u.Password)
}
