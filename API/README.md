# Tree struct info

## ⌨️ Cmd
Dossier contenant l'ensemble des fichiers de build et le fichier main server.go. A noté que les scripts doivent être lancé à partir de la racine du projet.

```bash

#Exemple d'exécution des script
#⚠️ Rendre les fichiers exécutable avec chmod

$bash : chmod +x path

$bash : ./cmd/script/build #Crée un exécutable dans le dossier dist

$bash : ./cmd/script/build-and-run #Build et lance le projet

$bash : ./cmd/script/test #Lance les tests

$bash : ./cmd/script/test-prod #Exécute des request à l'api une fois en production

```

## 🔑 Configs
Toutes les informations relative à la connexion à la base de données mongo.

## 📁 Dist
Contient l'ensemble des fichiers executable.

## 📄 Docs
Les fichiers yml et json genéré à la suite de swagger.

## Internal

### Entities
Objet realationnel avec la base de données

### Persistence
Contient le dao ( les méthods qui joue avec la base de données), interfaces -> applique les règles et la connexion avec la base de données mongo

## 🧪 Tests
Fichiers de test ralative à l'api

# Docker
Il est possible de créer un container docker pour exécuter l'application.

```bash

#Veuillez à avoir installer docker sur votre machine

$bash : docker build -t tag-container ./path-to-dockerfile/.

$bash : docker run -dp 8080:8080 --name nom-container tag-container

```