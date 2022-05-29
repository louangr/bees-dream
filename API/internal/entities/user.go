package entities

import "fmt"

type Information struct {
	FirstName string
	LastName  string
	Compagny  string
}

type User struct {
	Id           int
	Informations Information
	Role         string
	Login        string
	Password     string
}

func NewUser(id int, informations Information, role string, login string, password string) User {
	return User{id, informations, role, login, password}
}

func NewInformation(firstName string, lastName string, compagny string) Information {
	return Information{firstName, lastName, compagny}
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
		"}", u.Id, u.Informations.FirstName, u.Informations.LastName, u.Informations.Compagny, u.Role, u.Login, u.Password)
}
