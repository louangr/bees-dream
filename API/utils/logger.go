package utils

import (
	"fmt"
	"log"
	"os"
	"time"
)

var logsFilePath string = "./dist/api.log"
var file *os.File

func CreateLogFile() {
	_, err := os.Create(logsFilePath)

	if err != nil {
		log.Fatal("Can't open log file")
	}
}

func WriteInLog(message string) {

	file, err := os.OpenFile(logsFilePath, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

	if err != nil {
		log.Fatalf("Error opening file log file : %v", err)
	}
	defer file.Close()

	var time string = time.Now().Format("01-02-2006 15:04:05")

	var finalMessage string = fmt.Sprintf("%s : %s\n", time, message)

	file.Write([]byte(finalMessage))
}
