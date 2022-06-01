package entities

import (
	"fmt"
)

// swagger:response monodoseStruct
type swaggMonodoseStruct struct {
	// in:body
	Body Monodose
}

// swagger:response monodoseStructArray
type swaggMonodoseStructArray struct {
	// in:body
	Body []Monodose
}

type Beekeeper struct {
	LastName  string `json:"lastname" bson:"LastName"`
	FirstName string `json:"firstname" bson:"FirstName"`
	Company   string `json:"company" bson:"Company"`
	Age       int    `json:"age" bson:"Age"`
}

type Date struct {
	Dluo            string `json:"dluo" bson:"Dluo"`
	Make            string `json:"startofproduction" bson:"Make"`
	EndOfProduction string `json:"endofproduction" bson:"EndOfProduction"`
}

type Monodose struct {
	Id           int        `json:"id" bson:"Id"`
	Beekeeper    *Beekeeper `json:"beekeeper" bson:"Beekeeper"`
	Dates        *Date      `json:"dates" bson:"Dates"`
	Location     string     `json:"location" bson:"Location"`
	HoneyVariety string     `json:"honeyvariety" bson:"HoneyVariety"`
}

func NewBeekeeper(lastName string, firstName string, compagny string, age int) Beekeeper {
	return Beekeeper{lastName, firstName, compagny, age}
}

func NewDate(dluo string, make string, endOfProduction string) Date {
	return Date{dluo, make, endOfProduction}
}

func NewMonodose(id int, beekeeper Beekeeper, dates Date, location string, honeyVarity string) Monodose {
	return Monodose{id, &beekeeper, &dates, location, honeyVarity}
}

func (m *Monodose) IsNil() bool {
	return m == nil
}

func (m Monodose) GetId() int {
	return m.Id
}

func (m Monodose) GetCollectionName() string {
	return "monodose"
}

func (m Monodose) Empty() any {
	return Monodose{}
}

func (m *Monodose) String() string {
	return fmt.Sprintf("\nMonodose{\n"+
		"id : %d,\n"+
		"Beekeeper{\n"+
		"\tlastname: %s,\n"+
		"\tfirstname: %s,\n"+
		"\tcompagny : %s\n"+
		"},\n"+
		"Dates{\n"+
		"\tdluo : %s,\n"+
		"\tmake : %s,\n"+
		"\tendofproduction : %s\n"+
		"},\n"+
		"location : %s\n"+
		"honeyVarity : %s\n"+
		"}", m.Id, m.Beekeeper.LastName, m.Beekeeper.FirstName, m.Beekeeper.Company, m.Dates.Dluo, m.Dates.Make, m.Dates.EndOfProduction, m.Location, m.HoneyVariety)
}
