package entities

import "fmt"

type Beekeeper struct {
	LastName  string
	FirstName string
	Compagny  string
}

type Date struct {
	Dluo            string
	Make            string
	EndOfProduction string
}

type Monodose struct {
	Id          int
	Beekeeper   Beekeeper
	Dates       Date
	Location    string
	HoneyVarity string
}

func NewBeekeeper(lastName string, firstName string, compagny string) Beekeeper {
	return Beekeeper{lastName, firstName, compagny}
}

func NewDate(dluo string, make string, endOfProduction string) Date {
	return Date{dluo, make, endOfProduction}
}

func NewMonodose(id int, beekeeper Beekeeper, dates Date, location string, honeyVarity string) Monodose {
	return Monodose{id, beekeeper, dates, location, honeyVarity}
}

func (m *Monodose) IsNil() bool {
	return m == nil
}

func (m *Monodose) String() string {
	return fmt.Sprintf("Monodose{\n"+
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
		"}", m.Id, m.Beekeeper.LastName, m.Beekeeper.FirstName, m.Beekeeper.Compagny, m.Dates.Dluo, m.Dates.Make, m.Dates.EndOfProduction, m.Location, m.HoneyVarity)
}
