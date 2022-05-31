package entities

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type Login struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

func NewLogin(login string, password string) Login {

	return Login{login, password}
}

func (l *Login) HashPassword() error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(l.Password), 14)

	if err != nil {
		return fmt.Errorf("Can't encrypt password")
	}

	l.Password = string(bytes)

	return nil
}

func (l Login) String() string {
	return fmt.Sprintf("Login : %s & Password : %s\n", l.Login, l.Password)
}
