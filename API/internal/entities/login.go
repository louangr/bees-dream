package entities

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"
	"io/ioutil"

	"golang.org/x/crypto/bcrypt"
)

// swagger:response loggedStruct
type _ struct {
	// in:body
	Body Logged
}

type Logged struct {
	User  User   `json:"user"`
	Token string `json:"token"`
}

// swagger:response loginStruct
type _ struct {
	// in:body
	Body Login
}

type Login struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

func NewLogged(user User, token string) Logged {

	var log Logged = Logged{user, token}

	log.User.Password = ""

	return log
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

func (l *Login) UnHashPassword() (string, error) {
	privateKey, _ := ioutil.ReadFile("./configs/privatekey.pem")

	cipherText, _ := base64.StdEncoding.DecodeString(l.Password)

	block, _ := pem.Decode(privateKey)

	if block == nil {
		return "", fmt.Errorf("private key error!")
	}
	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return "", err
	}

	res, err := rsa.DecryptPKCS1v15(rand.Reader, priv, cipherText)

	if err != nil {
		return "", err
	}

	return string(res), nil

}

func (l Login) String() string {
	return fmt.Sprintf("Login : %s & Password : %s\n", l.Login, l.Password)
}
