package entities

import "fmt"

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
	LastName  string `json:"lastname"`
	FirstName string `json:"firstname"`
	Compagny  string `json:"company"`
}

type Date struct {
	Dluo            string `json:"dluo"`
	Make            string `json:"make"`
	EndOfProduction string `json:"endOfProduction"`
}

type Monodose struct {
	Id           int        `json:"id"`
	Beekeeper    *Beekeeper `json:"beekeeper"`
	Dates        *Date      `json:"dates"`
	Location     string     `json:"location"`
	HoneyVariety string     `json:"honeyVariety"`
}

func NewBeekeeper(lastName string, firstName string, compagny string) Beekeeper {
	return Beekeeper{lastName, firstName, compagny}
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
		"}", m.Id, m.Beekeeper.LastName, m.Beekeeper.FirstName, m.Beekeeper.Compagny, m.Dates.Dluo, m.Dates.Make, m.Dates.EndOfProduction, m.Location, m.HoneyVariety)
}
