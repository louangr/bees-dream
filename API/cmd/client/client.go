package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"internal/entities"
	"internal/persistence/types"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/google/uuid"
)

type Client[T types.Collection] struct {
	URL   string
	token string
}

func RequestTest(URL string, methods string, data []byte, token *string) ([]byte, error) {

	client := &http.Client{}

	req, err := http.NewRequest(methods, URL, bytes.NewReader(data))

	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	if token != nil {
		req.Header.Set("Token", *token)
	}

	resp, err := client.Do(req)

	if err != nil {
		log.Fatalln("Erreur during Get request")
		return nil, err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln("Erreur during read body")
		return nil, err
	}

	return body, nil

}

func (c Client[T]) GetById(id int) {

	var item T

	var collection string = item.GetCollectionName()

	var URL string = fmt.Sprintf("%s/%s/%d", c.URL, collection, id)

	body, _ := RequestTest(URL, "GET", nil, &c.token)

	json.Unmarshal(body, &item)

	if item.GetId() != id {
		log.Fatalf("❌Erreur during fetch %s with id %d : for url %s\nErr : %s\n", collection, id, URL, body)
		return
	}

	fmt.Printf("✅ Get %s id %d : for url %s\n", collection, id, URL)
}

func (c Client[T]) FailGetById(id int) {

	var item T

	var collection string = item.GetCollectionName()

	var URL string = fmt.Sprintf("%s/%s/%d", c.URL, collection, id)

	body, _ := RequestTest(URL, "GET", nil, &c.token)

	json.Unmarshal(body, &item)

	if item.GetId() == id {
		log.Fatalf("❌ Id should not exist for collection %s with id %d : for url %s\nErr : %s\n", collection, id, URL, body)
		return
	}

	fmt.Printf("✅ Id %d not exist on collection %s : for url %s\n", id, collection, URL)
}

func (c Client[T]) GetAll() {

	var items []T

	var item T

	var collection string = item.GetCollectionName()

	var URL string = fmt.Sprintf("%s/%s", c.URL, collection)

	body, _ := RequestTest(URL, "GET", nil, &c.token)

	json.Unmarshal(body, &items)

	if len(items) < 1 {
		log.Fatalf("❌Erreur during fetch %ss : for url %s\nErr : %s\n", collection, URL, body)
		return
	}

	fmt.Printf("✅ Get %ss : for url %s\n", collection, URL)

}

func (c Client[T]) Add(item T) {

	var itemAdded T

	var collection string = item.GetCollectionName()

	var URL string = fmt.Sprintf("%s/%s", c.URL, collection)

	dataToSend, _ := json.Marshal(item)

	body, _ := RequestTest(URL, "POST", dataToSend, &c.token)

	json.Unmarshal(body, &itemAdded)

	if itemAdded.GetId() != item.GetId() {
		log.Fatalf("❌Erreur during add %s with id %d: for url %s\nErr : %s\n", collection, item.GetId(), URL, body)
		return
	}

	fmt.Printf("✅ Add %s with id %d : for url %s\n", collection, item.GetId(), URL)

}

func (c Client[T]) Delete(id int) {

	var item T

	var collection string = item.GetCollectionName()

	var URL string = fmt.Sprintf("%s/%s/%d", c.URL, collection, id)

	dataToSend, _ := json.Marshal(item)

	body, _ := RequestTest(URL, "DELETE", dataToSend, &c.token)

	json.Unmarshal(body, &item)

	if item.GetId() != id {
		log.Fatalf("❌Erreur during delete %s with id %d: for url %s\nErr : %s\n", collection, id, URL, body)
		return
	}

	fmt.Printf("✅ Delete %s with id %d: for url %s\n", collection, id, URL)

}

func (c Client[T]) Update(item T) {
	var itemAdded T

	var collection string = item.GetCollectionName()

	var URL string = fmt.Sprintf("%s/%s", c.URL, collection)

	dataToSend, _ := json.Marshal(item)

	body, _ := RequestTest(URL, "PUT", dataToSend, &c.token)

	json.Unmarshal(body, &itemAdded)

	if itemAdded.GetId() != item.GetId() {
		log.Fatalf("❌Erreur during update %s with id %d: for url %s\nErr : %s\n", collection, item.GetId(), URL, body)
		return
	}

	fmt.Printf("✅ Update %s with id %d : for url %s\n", collection, item.GetId(), URL)
}

func (c *Client[T]) Authentification() {

	var logged entities.Logged

	var login entities.Login = entities.NewLogin("dorian", "R+IXYoOZS5KmWLYRv1O0nVq+d5P2u4QMQBRX+NvlINK7ExKNCQaPzYwtOi+my2Ti9CJfNUEmuxateimIw7ob2yBzy3Tgk1l/JuaygsUCHCRwo5WhXX7iY2ZpjqqJIDFNXESBI5augjrMfSBNbE+b9OA3tenyIwXoICfPNSk3I9NHJ8oZ9pJCAnK45T1GX0lQPfoq2KF2FZL3rXSfuYKfbNicaPV6JZKdFoLq5bEEIrs6X7k5VVrk0Lpp/K461GfWfFVkMWJAdZfSlQGMnuL/F8CxKCSLeLMYd3cijZ3aBJqXcp44JS/UkuyU7lYCXlNs8GpmPj8OnI7r5YAOdMjWHA==")

	var URL string = fmt.Sprintf("%s/login", c.URL)

	dataToSend, _ := json.Marshal(login)

	body, _ := RequestTest(URL, "POST", dataToSend, &c.token)

	json.Unmarshal(body, &logged)

	c.token = logged.Token

	if c.token == "" {
		log.Fatalf("❌ Erreur during authentification with login %s: for url %s\nErr : %s\n", login.Login, URL, body)
		return
	}

	fmt.Printf("✅ Authentification with login %s : for url %s\n", login.Login, URL)
}

func (c *Client[T]) FailAuthentification() {

	var login entities.Login = entities.NewLogin("dorian", "+d5P2u4Q==")

	var URL string = fmt.Sprintf("%s/login", c.URL)

	dataToSend, _ := json.Marshal(login)

	body, _ := RequestTest(URL, "POST", dataToSend, &c.token)

	if c.token != "" {
		log.Fatalf("❌ Authentification should not work with login %s and password %s : for url %s\nErr : %s\n", login.Login, login.Password, URL, body)
		return
	}

	fmt.Printf("✅ Faild Authentification with login %s and wrong password %s: for url %s\n", login.Login, login.Password, URL)
}

func createURL(url string, port string) string {
	return fmt.Sprintf("http://%s:%s", url, port)
}

func main() {

	if len(os.Args) <= 2 {
		log.Fatal("Need url and port as args")
	}

	var id int = int(uuid.New().ID())

	var URL string = createURL(os.Args[1], os.Args[2])

	var clientMonodose Client[entities.Monodose] = Client[entities.Monodose]{URL, ""}

	var clientUser Client[entities.User] = Client[entities.User]{URL, ""}

	var monodose entities.Monodose = entities.NewMonodose(id, entities.NewBeekeeper("Test server firstname", "Test server lastname", "Test server company", 21), entities.NewDate("12/12/id2", "12/12/id2", "12/12/id2"), "Test serveur ville", "Test serveur varity")

	var user entities.User = entities.NewUser(id, entities.NewInformation("Test serveur firstname", "Test serveur lastname", "Test serveur company"), "admin", "Test server login", "Test server password")

	var wg sync.WaitGroup

	clientMonodose.FailAuthentification()

	clientMonodose.Authentification()

	clientUser.Authentification()

	wg.Add(1)

	go func() {
		defer wg.Done()

		clientMonodose.GetAll()
		clientUser.GetAll()
	}()

	wg.Add(1)

	go func() {
		defer wg.Done()
		clientMonodose.Add(monodose)
		clientMonodose.GetById(id)
		monodose.Location = "Test Update serveur"
		clientMonodose.Update(monodose)
		clientMonodose.Delete(id)
		clientMonodose.FailGetById(id)
	}()

	wg.Add(1)

	go func() {
		defer wg.Done()
		clientUser.Add(user)
		clientUser.GetById(id)
		user.Informations.Company = "Test update serveur"
		clientUser.Update(user)
		clientUser.Delete(id)
		clientUser.FailGetById(id)
	}()

	wg.Wait()

}
