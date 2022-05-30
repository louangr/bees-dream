package entities

import "fmt"

type Information struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Company   string `json:"company"`
}

type User struct {
	Id           int         `json:"id"`
	Informations Information `json:"informations"`
	Role         string      `json:"role"`
	Login        string      `json:"login"`
	Password     string      `json:"password"`
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
