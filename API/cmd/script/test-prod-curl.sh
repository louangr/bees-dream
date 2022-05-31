#!/bin/bash

# Reset
Color_Off='\033[0m'       # Text Reset

# High Intensity
IBlack='\033[0;90m'       # Black
IRed='\033[0;91m'         # Red
IGreen='\033[0;92m'       # Green
IYellow='\033[0;93m'      # Yellow
IBlue='\033[0;94m'        # Blue
IPurple='\033[0;95m'      # Purple
ICyan='\033[0;96m'        # Cyan
IWhite='\033[0;97m'       # White

echo -e "${IBlue}Get${Color_off} all monodoses ${IGreen}succes"
http localhost:8080/monodose/

echo -e "${IBlue}Get${Color_off} by id ${IGreen}succes"
http localhost:8080/monodose/0

echo -e "${IBlue}Get${Color_off} by id ${IRed}Failed"
http localhost:8080/monodose/10

echo -e "${ICyan}Post${Color_off} add monodose ${IGreen}succes"
http POST localhost:8080/monodose/ \
id:=21 \
Beekeeper:='{"lastname":"test lastname","firstname":"test firstname","compagny":"test compagny"}' \
Dates:='{"dluo":"test dluo","make":"test make","endofproduction":"test endofproduction"}' \
location="test location" \
honeyVarity="test honeyVarity"

echo -e "${ICyan}DELETE${Color_off} remove monodose ${IGreen}succes"
http DELETE localhost:8080/monodose/4

echo -e "${ICyan}DELETE${Color_off} remove monodose ${IRed}failed"
http DELETE localhost:8080/monodose/4

echo -e "${ICyan}PUT${Color_off} update monodose ${IGreen}succes"
http PUT localhost:8080/monodose/ \
id:=0 \
Beekeeper:='{"lastname":"update lastname","firstname":"update firstname","compagny":"update compagny"}' \
Dates:='{"dluo":"update dluo","make":"update make","endofproduction":"update endofproduction"}' \
location="update location" \
honeyVarity="update honeyVarity"