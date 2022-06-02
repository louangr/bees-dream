package utils

import (
	"internal/entities"
	"internal/persistence/errors"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

type JWT struct {
	Token string
	Time  time.Time
}

var jwtKey = getSecretKey()

func getSecretKey() []byte {
	res, _ := os.ReadFile("./configs/privatekey.pem")
	return res
}

func GenerateJWT(user entities.User) (JWT, errors.ErrorsJson) {

	expirationTime := time.Now().Add(10 * time.Minute)
	claims := &Claims{
		Username: user.Informations.FirstName,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		return JWT{}, errors.NewError(500, "Error during jwt generation")
	}

	return JWT{tokenString, expirationTime}, errors.ErrorsJson{}
}

func VerifyJWT(r *http.Request, w http.ResponseWriter) errors.ErrorsJson {

	//c, errs := r.Cookie("token")
	var token string = r.Header.Get("Token")
	if token == "" {
		return errors.NewError(http.StatusUnauthorized, "The token is not set in the header")
	}

	claims := &Claims{}

	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			return errors.NewError(http.StatusUnauthorized, "Token signature is unvalid")
		}
		return errors.NewError(http.StatusBadRequest, "Bad requst")
	}
	if !tkn.Valid {
		return errors.NewError(http.StatusUnauthorized, "Token is unvalid")
	}

	return errors.ErrorsJson{}
}
