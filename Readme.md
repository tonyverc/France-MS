# France Marine Services - Site Vitrine

## 📋 Description du Projet

Site vitrine développé pour **France Marine Services**, permettant la consultation de produits, le téléchargement de fiches techniques et l'envoi de demandes de contact. Le projet comprend un back-office sécurisé avec authentification JWT pour la gestion des contenus.

## 🎯 Fonctionnalités

### Partie Publique
- Consultation des produits par catégories et sous-catégories
- Téléchargement des fiches techniques (PDF)
- Formulaire de contact avec validation
- Design responsive (desktop, tablette, mobile)

### Back-Office Admin
- Authentification sécurisée avec JWT
- CRUD complet des produits (création, modification, suppression)
- Gestion des catégories et sous-catégories
- Upload d'images et de fiches techniques (PDF)
- Consultation des messages de contact
- Interface d'administration intuitive avec EasyAdmin

## 🛠️ Technologies Utilisées

### Backend
- **PHP 8.3** avec **Symfony 6.4**
- **Doctrine ORM** pour la gestion de la base de données
- **MySQL 8.0** pour la persistance des données
- **Lexik JWT Authentication Bundle** pour la sécurité
- **EasyAdmin** pour l'interface d'administration
- **Docker** pour la conteneurisation

### Frontend
- **Angular** avec guards pour la protection des routes
- **TypeScript**
- **Tailwind CSS** pour le design
- **API REST** pour la communication avec le backend

### Outils de Développement
- **Docker Compose** pour orchestrer les services
- **phpMyAdmin** pour la gestion de la base de données
- **MailHog** pour tester les emails en développement
- **Git** pour le versioning

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Docker Desktop** (version 20.10 ou supérieure)
- **Docker Compose** (version 2.0 ou supérieure)
- **Git** pour cloner le projet
- **Symfony CLI** pour exécuter le serveur Symfony
- **Node.js** (version 18+) et **npm** (pour Angular)

**Note :** PHP 8.3 et Composer sont fournis via Docker. Symfony s'exécute en local via Symfony CLI (qui utilise le PHP de Docker), tandis qu'Angular s'exécute également en local.

## 🚀 Installation

### 1. Cloner le Projet

```bash
git clone [URL_DU_REPOSITORY]
cd france-marine-services
```

### 2. Configuration de l'Environnement Backend

#### Copier le fichier .env
```bash
cd backend
cp .env .env.local
```

#### Configurer les variables d'environnement
Ouvrez le fichier `.env.local` et modifiez si nécessaire :

```env
# Environnement de développement
APP_ENV=dev
APP_SECRET=votre_secret_généré

# Base de données (configuration Docker)
DATABASE_URL="mysql://user:password@host:port/database?serverVersion=8.0"

# Mailer (MailHog pour le développement)
MAILER_DSN=smtp://localhost:1025

# CORS (adapter selon votre configuration)
CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?

### 3. Démarrer les Services Docker

```bash
# Depuis le dossier backend
docker-compose up -d
```

Cela va démarrer 4 services :
- **fms_php** : Conteneur PHP 8.3-FPM avec Symfony (port 9000)
- **fms_mysql** : Base de données MySQL 8.0 (port 3306)
- **fms_phpmyadmin** : Interface phpMyAdmin (port 8080)
- **fms_mailhog** : Serveur SMTP de test (ports 1025 et 8025)

### 4. Générer les Clés JWT

```bash
# Entrer dans le conteneur PHP
docker exec -it fms_php bash

# Générer les clés JWT
php bin/console lexik:jwt:generate-keypair

# Quitter le conteneur
exit
```

### 5. Installer les Dépendances

```bash
# Entrer dans le conteneur PHP
docker exec -it fms_php bash

# Installer les dépendances Composer
composer install

# Quitter le conteneur
exit
```

### 6. Créer la Base de Données et Exécuter les Migrations

```bash
# Créer la base de données
docker exec -it fms_php php bin/console doctrine:database:create

# Exécuter les migrations
docker exec -it fms_php php bin/console doctrine:migrations:migrate
```

### 7. Accéder à l'Application

- **Frontend Angular** : `http://localhost:4200` (si configuré dans Docker)
- **Backend Symfony API** : `http://localhost:9000`
- **phpMyAdmin** : `http://localhost:8080`
- **MailHog** : `http://localhost:8025`

## 🔑 Authentification JWT

### Créer un Utilisateur Admin

```bash
# Créer un utilisateur admin via console Docker
docker exec -it fms_php php bin/console app:create-admin
```

Ou créez-le manuellement via phpMyAdmin sur `http://localhost:8080`

## 📁 Structure du Projet

```
france-marine-services/
├── backend/                    # Application Symfony
│   ├── config/                # Configuration Symfony
│   │   └── jwt/              # Clés JWT (privée/publique)
│   ├── migrations/           # Migrations Doctrine
│   ├── src/
│   │   ├── Controller/       # Contrôleurs API
│   │   ├── Entity/          # Entités Doctrine
│   │   └── Repository/      # Repositories
│   ├── docker-compose.yml   # Configuration Docker
│   ├── Dockerfile          # Image Docker personnalisée
│   └── .env               # Variables d'environnement
│
├── frontend/                 # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Composants Angular
│   │   │   ├── services/   # Services API
│   │   │   └── guards/    # Guards d'authentification
│   │   └── assets/       # Ressources statiques
│   └── angular.json
│
└── README.md               # Documentation
```

## 🗄️ Modèle de Données

### Entités Principales

**Admin**
- id (INT, PK)
- nom (VARCHAR 50)
- email (VARCHAR 100)
- password (VARCHAR 255, hashé)

**Produit**
- id (INT, PK)
- nom (VARCHAR 50)
- image (VARCHAR 255)
- description (LONGTEXT)
- fiche_technique (VARCHAR 100)
- admin_id (FK → Admin)
- Relations : ManyToMany avec SousCategorie

**Categorie**
- id (INT, PK)
- nom (VARCHAR 50)
- Relations : OneToMany avec SousCategorie

**SousCategorie**
- id (INT, PK)
- nom (VARCHAR 50)
- categorie_id (FK → Categorie)
- Relations : ManyToMany avec Produit

**Message**
- id (INT, PK)
- nom (VARCHAR 50)
- email (VARCHAR 100)
- telephone (VARCHAR 20, nullable)
- contenu (LONGTEXT)
- date_envoi (DATETIME)
- admin_id (FK → Admin, nullable)

## 🔧 Commandes Utiles

### Docker

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Voir les conteneurs en cours
docker ps

# Entrer dans le conteneur PHP
docker exec -it fms_php bash

# Redémarrer un service
docker-compose restart fms_php
```

### Symfony

```bash
# Vider le cache
docker exec -it fms_php php bin/console cache:clear

# Créer une nouvelle migration
docker exec -it fms_php php bin/console make:migration

# Exécuter les migrations
docker exec -it fms_php php bin/console doctrine:migrations:migrate

# Lister les routes
docker exec -it fms_php php bin/console debug:router

# Démarrer le serveur Symfony (en local, utilise PHP de Docker)
symfony server:start

# Arrêter le serveur Symfony
symfony server:stop
```

### Base de Données

```bash
# Créer la base de données
docker exec -it fms_php php bin/console doctrine:database:create

# Supprimer la base de données
docker exec -it fms_php php bin/console doctrine:database:drop --force

# Mettre à jour le schéma
docker exec -it fms_php php bin/console doctrine:schema:update --force
```

### Composer (via Docker)

```bash
# Installer une dépendance
docker exec -it fms_php composer require nom/package

# Mettre à jour les dépendances
docker exec -it fms_php composer update

# Dump autoload
docker exec -it fms_php composer dump-autoload
```

### Angular (en local)

```bash
# Démarrer le serveur de développement
ng serve

# Build de production
ng build --configuration production

# Lancer les tests
ng test

# Lancer les tests e2e
ng e2e
```

## 🌐 Accès aux Services

| Service | URL | Credentials |
|---------|-----|-------------|
| Application Angular | http://localhost:4200 | - |
| API Symfony | http://localhost:8000 | - |
| phpMyAdmin | http://localhost:8080 | Voir configuration Docker |
| MailHog (interface web) | http://localhost:8025 | - |
| MySQL | localhost:3306 | Voir configuration Docker |

## 🔐 Sécurité

### Authentification
- JWT avec refresh token
- Tokens stockés en mémoire (pas de localStorage)
- Expiration automatique des tokens
- Protection CSRF

### Protection des Routes
- Guards Angular pour les routes admin
- Middleware Symfony pour vérifier les permissions
- Roles : ROLE_ADMIN

### Upload de Fichiers
- Validation du format (images: jpg, png / documents: pdf)
- Limitation de la taille des fichiers
- Stockage sécurisé avec noms uniques
- Suppression automatique lors de la mise à jour

## 📝 API Endpoints

### Authentification
```
POST /api/login
Body: { "email": "admin@example.com", "password": "password" }
Response: { "token": "eyJ0..." }
```

### Produits
```
GET    /api/produits              # Liste tous les produits
GET    /api/produits/{id}         # Détails d'un produit
POST   /api/produits              # Créer un produit (Admin)
PUT    /api/produits/{id}         # Modifier un produit (Admin)
DELETE /api/produits/{id}         # Supprimer un produit (Admin)
```

### Catégories
```
GET    /api/categories            # Liste toutes les catégories
GET    /api/categories/{id}       # Détails d'une catégorie
```

### Sous-Catégories
```
GET    /api/sous-categories       # Liste toutes les sous-catégories
GET    /api/sous-categories/{id}  # Détails d'une sous-catégorie
```

### Messages
```
POST   /api/messages              # Envoyer un message
GET    /api/messages              # Liste des messages (Admin)
```

## 🚀 Déploiement en Production

### 1. Préparation de l'Environnement

Créez un fichier `.env.prod` (ne pas commiter) :

```env
APP_ENV=prod
APP_SECRET=[générer_un_secret_fort_avec_openssl]
APP_DEBUG=0

DATABASE_URL="mysql://user_prod:password_prod@serveur_prod:3306/db_prod?serverVersion=8.0"

MAILER_DSN=smtp://smtp.example.com:587?encryption=tls&auth_mode=login&username=user&password=pass

CORS_ALLOW_ORIGIN='^https?://(www\.)?francemarineservices\.com$'

JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=[générer_une_passphrase_sécurisée]
```

### 2. Optimisations

```bash
# Installer les dépendances sans dev
composer install --no-dev --optimize-autoloader

# Compiler les assets
php bin/console assets:install --env=prod

# Vider et warmup du cache
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# Build Angular en mode production
ng build --configuration production
```

### 3. Migrations

```bash
# Exécuter les migrations sur le serveur de production
php bin/console doctrine:migrations:migrate --no-interaction
```

### 4. Configuration Serveur

- Configurer le serveur web (Apache/Nginx)
- Activer HTTPS avec certificat SSL (Let's Encrypt)
- Configurer les permissions : `www-data:www-data` sur les dossiers
- Désactiver l'affichage des erreurs PHP
- Configurer les logs

### 5. Sécurité Production

- Changer tous les mots de passe
- Régénérer les clés JWT
- Configurer un firewall
- Activer le rate limiting
- Mettre en place des sauvegardes automatiques

## 🧪 Tests

### Configuration PHPUnit

```bash
# Exécuter tous les tests
docker exec -it fms_php php bin/phpunit

# Tests avec couverture
docker exec -it fms_php php bin/phpunit --coverage-html coverage
```

### Tests Angular

```bash
# Tests unitaires
ng test

# Tests e2e
ng e2e
```

## 🐛 Troubleshooting

### Problème : Les conteneurs ne démarrent pas

**Solution :**
```bash
docker-compose down
docker-compose up -d --build
```

### Problème : Erreur de connexion à la base de données

**Solution :**
- Vérifiez que le conteneur MySQL est bien démarré : `docker ps`
- Vérifiez les credentials dans le `.env`
- Attendez quelques secondes après le démarrage de MySQL

### Problème : JWT Token invalide

**Solution :**
```bash
# Régénérer les clés JWT
docker exec -it fms_php php bin/console lexik:jwt:generate-keypair --overwrite
```

### Problème : Permission denied sur les fichiers

**Solution :**
```bash
# Donner les permissions au dossier var/ dans le conteneur
docker exec -it fms_php chown -R www-data:www-data var/
docker exec -it fms_php chmod -R 775 var/
```

### Problème : Les migrations échouent

**Solution :**
```bash
# Vérifier l'état des migrations
docker exec -it fms_php php bin/console doctrine:migrations:status

# Recréer la base de données
docker exec -it fms_php php bin/console doctrine:database:drop --force
docker exec -it fms_php php bin/console doctrine:database:create
docker exec -it fms_php php bin/console doctrine:migrations:migrate
```

### Problème : Le conteneur PHP ne démarre pas

**Solution :**
```bash
# Reconstruire les conteneurs
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Problème : Le serveur Symfony ne démarre pas

**Solution :**
```bash
# Vérifier si le port 8000 est occupé
symfony server:status

# Arrêter tous les serveurs Symfony
symfony server:stop --all

# Redémarrer le serveur
symfony server:start
```

### Problème : Composer très lent dans Docker

**Solution :**
```bash
# Utiliser le cache Composer
docker exec -it fms_php composer install --prefer-dist --no-interaction
```

## 📧 Contact

**Développeur :** [Votre Nom]  
**Client :** France Marine Services  
**Email :** contact@francemarineservices.com  
**Période de développement :** 22/09/2025 - 17/10/2025

## 📄 Licence

Projet propriétaire développé pour France Marine Services.

---

**Date de dernière mise à jour :** Octobre 2025  
**Version :** 1.0.0

# JWT (clés à générer)
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=votre_passphrase_sécurisée
```

### 3. Démarrer les Services Docker

```bash
# Depuis le dossier backend
docker-compose up -d
```

Cela va démarrer 4 services :
- **fms_php** : Conteneur PHP 8.3-FPM avec Symfony (port 9000)
- **fms_mysql** : Base de données MySQL 8.0 (port 3306)
- **fms_phpmyadmin** : Interface phpMyAdmin (port 8080)
- **fms_mailhog** : Serveur SMTP de test (ports 1025 et 8025)

### 5. Installer les Dépendances

```bash
# Installer les dépendances Composer (Symfony)
docker exec -it fms_php composer install

# Installer les dépendances npm (Angular) si applicable
docker exec -it fms_angular npm install
```

### 6. Créer la Base de Données et Exécuter les Migrations

```bash
# Créer la base de données
docker exec -it fms_php php bin/console doctrine:database:create

# Exécuter les migrations
docker exec -it fms_php php bin/console doctrine:migrations:migrate
```

### 6. Configuration Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

L'application Angular sera accessible sur `http://localhost:4200`

## 🔑 Authentification JWT

### Générer les Clés JWT (si nécessaire)

Si les clés JWT n'existent pas dans `config/jwt/`, générez-les :

```bash
docker exec -it fms_php php bin/console lexik:jwt:generate-keypair
```

### Créer un Utilisateur Admin

```bash
docker exec -it fms_php php bin/console app:create-admin
```

Ou créez-le manuellement via phpMyAdmin sur `http://localhost:8080`

## 📁 Structure du Projet

```
france-marine-services/
├── backend/                    # Application Symfony
│   ├── config/                # Configuration Symfony
│   │   └── jwt/              # Clés JWT (privée/publique)
│   ├── migrations/           # Migrations Doctrine
│   ├── src/
│   │   ├── Controller/       # Contrôleurs API
│   │   ├── Entity/          # Entités Doctrine
│   │   └── Repository/      # Repositories
│   ├── docker-compose.yml   # Configuration Docker
│   ├── Dockerfile          # Image Docker personnalisée
│   └── .env               # Variables d'environnement
│
├── frontend/                 # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Composants Angular
│   │   │   ├── services/   # Services API
│   │   │   └── guards/    # Guards d'authentification
│   │   └── assets/       # Ressources statiques
│   └── angular.json
│
└── README.md               # Documentation
```

## 🗄️ Modèle de Données

### Entités Principales

**Admin**
- id (INT, PK)
- nom (VARCHAR 50)
- email (VARCHAR 100)
- password (VARCHAR 255, hashé)

**Produit**
- id (INT, PK)
- nom (VARCHAR 50)
- image (VARCHAR 255)
- description (LONGTEXT)
- fiche_technique (VARCHAR 100)
- admin_id (FK → Admin)
- Relations : ManyToMany avec SousCategorie

**Categorie**
- id (INT, PK)
- nom (VARCHAR 50)
- Relations : OneToMany avec SousCategorie

**SousCategorie**
- id (INT, PK)
- nom (VARCHAR 50)
- categorie_id (FK → Categorie)
- Relations : ManyToMany avec Produit

**Message**
- id (INT, PK)
- nom (VARCHAR 50)
- email (VARCHAR 100)
- telephone (VARCHAR 20, nullable)
- contenu (LONGTEXT)
- date_envoi (DATETIME)
- admin_id (FK → Admin, nullable)

## 🔧 Commandes Utiles

### Docker

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Voir les conteneurs en cours
docker ps

# Entrer dans le conteneur PHP
docker exec -it fms_php bash

# Redémarrer un service
docker-compose restart fms_php
```

### Symfony

```bash
# Vider le cache
docker exec -it fms_php php bin/console cache:clear

# Créer une nouvelle migration
docker exec -it fms_php php bin/console make:migration

# Exécuter les migrations
docker exec -it fms_php php bin/console doctrine:migrations:migrate

# Lister les routes
docker exec -it fms_php php bin/console debug:router
```

### Base de Données

```bash
# Créer la base de données
docker exec -it fms_php php bin/console doctrine:database:create

# Supprimer la base de données
docker exec -it fms_php php bin/console doctrine:database:drop --force

# Mettre à jour le schéma
docker exec -it fms_php php bin/console doctrine:schema:update --force
```

## 🌐 Accès aux Services

| Service | URL | Credentials |
|---------|-----|-------------|
| Application Angular | http://localhost:4200 | - |
| API Symfony | http://localhost:9000 | - |
| phpMyAdmin | http://localhost:8080 | user: `root`, pwd: `fms` |
| MailHog (interface web) | http://localhost:8025 | - |
| MySQL | localhost:3306 | user: `fms`, pwd: `fms`, db: `fms` |

## 🔐 Sécurité

### Authentification
- JWT avec refresh token
- Tokens stockés en mémoire (pas de localStorage)
- Expiration automatique des tokens
- Protection CSRF

### Protection des Routes
- Guards Angular pour les routes admin
- Middleware Symfony pour vérifier les permissions
- Roles : ROLE_ADMIN

### Upload de Fichiers
- Validation du format (images: jpg, png / documents: pdf)
- Limitation de la taille des fichiers
- Stockage sécurisé avec noms uniques
- Suppression automatique lors de la mise à jour

## 📝 API Endpoints

### Authentification
```
POST /api/login
Body: { "email": "admin@fms.com", "password": "password" }
Response: { "token": "eyJ0..." }
```

### Produits
```
GET    /api/produits              # Liste tous les produits
GET    /api/produits/{id}         # Détails d'un produit
POST   /api/produits              # Créer un produit (Admin)
PUT    /api/produits/{id}         # Modifier un produit (Admin)
DELETE /api/produits/{id}         # Supprimer un produit (Admin)
```

### Catégories
```
GET    /api/categories            # Liste toutes les catégories
GET    /api/categories/{id}       # Détails d'une catégorie
```

### Messages
```
POST   /api/messages              # Envoyer un message
GET    /api/messages              # Liste des messages (Admin)
```

## 🚀 Déploiement en Production

### 1. Préparation de l'Environnement

Créez un fichier `.env.prod` (ne pas commiter) :

```env
APP_ENV=prod
APP_SECRET=[générer_un_secret_fort_avec_openssl]
APP_DEBUG=0

DATABASE_URL="mysql://user_prod:password_prod@serveur_prod:3306/db_prod?serverVersion=8.0"

MAILER_DSN=smtp://smtp.example.com:587?encryption=tls&auth_mode=login&username=user&password=pass

CORS_ALLOW_ORIGIN='^https?://(www\.)?francemarineservices\.com$'

JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=[votre_passphrase_production]
```

### 2. Optimisations

```bash
# Installer les dépendances sans dev
composer install --no-dev --optimize-autoloader

# Compiler les assets
php bin/console assets:install --env=prod

# Vider et warmup du cache
php bin/console cache:clear --env=prod
php bin/console cache:warmup --env=prod

# Build Angular en mode production
ng build --configuration production
```

### 3. Migrations

```bash
# Exécuter les migrations sur le serveur de production
php bin/console doctrine:migrations:migrate --no-interaction
```

### 4. Configuration Serveur

- Configurer le serveur web (Apache/Nginx)
- Activer HTTPS avec certificat SSL (Let's Encrypt)
- Configurer les permissions : `www-data:www-data` sur les dossiers
- Désactiver l'affichage des erreurs PHP
- Configurer les logs

### 5. Sécurité Production

- Changer tous les mots de passe
- Régénérer les clés JWT
- Configurer un firewall
- Activer le rate limiting
- Mettre en place des sauvegardes automatiques

## 🧪 Tests

### Configuration PHPUnit

```bash
# Exécuter tous les tests
docker exec -it fms_php php bin/phpunit

# Tests avec couverture
docker exec -it fms_php php bin/phpunit --coverage-html coverage
```

### Tests Angular

```bash
# Tests unitaires
ng test

# Tests e2e
ng e2e
```

## 🐛 Troubleshooting

### Problème : Les conteneurs ne démarrent pas

**Solution :**
```bash
docker-compose down
docker-compose up -d --build
```

### Problème : Erreur de connexion à la base de données

**Solution :**
- Vérifiez que le conteneur MySQL est bien démarré : `docker ps`
- Vérifiez les credentials dans le `.env`
- Attendez quelques secondes après le démarrage de MySQL

### Problème : JWT Token invalide

**Solution :**
```bash
# Régénérer les clés JWT
docker exec -it fms_php php bin/console lexik:jwt:generate-keypair --overwrite
```

### Problème : Permission denied sur les fichiers

**Solution :**
```bash
# Donner les permissions au dossier var/
docker exec -it fms_php chown -R www-data:www-data var/
docker exec -it fms_php chmod -R 775 var/
```

### Problème : Les migrations échouent

**Solution :**
```bash
# Vérifier l'état des migrations
docker exec -it fms_php php bin/console doctrine:migrations:status

# Recréer la base de données
docker exec -it fms_php php bin/console doctrine:database:drop --force
docker exec -it fms_php php bin/console doctrine:database:create
docker exec -it fms_php php bin/console doctrine:migrations:migrate
```

## 📧 Contact

**Développeur :** [Votre Nom]  
**Client :** France Marine Services  
**Email :**   
**Période de développement :** 22/09/2025 - 17/10/2025

## 📄 Licence

Projet propriétaire développé pour France Marine Services.

---

**Date de dernière mise à jour :** Octobre 2025  
**Version :** 1.0.0