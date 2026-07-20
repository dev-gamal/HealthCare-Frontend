# HealthCare+ Frontend

Bienvenue sur le dépôt frontend de l'application **HealthCare+**, une interface web moderne conçue pour simplifier la gestion quotidienne d'une clinique médicale. 

Ce projet a été développé dans le cadre d'un brief pédagogique visant à créer une application Single Page (SPA) connectée à une API RESTful (Spring Boot) sécurisée par JWT.

## 🚀 Fonctionnalités

L'application couvre l'ensemble des besoins de gestion de la clinique à travers une interface simple, intuitive et responsive :

* **Authentification sécurisée** : Connexion via JWT (JSON Web Tokens) stocké dans le navigateur.
* **Tableau de bord (Dashboard)** : Vue d'ensemble avec des statistiques en temps réel sur les patients, médecins et rendez-vous.
* **Gestion des Patients** : Liste, ajout, modification et suppression (CRUD).
* **Gestion des Médecins** : Liste, ajout, modification et suppression (CRUD).
* **Gestion des Rendez-vous** : Planification et suivi des statuts (Programmé, Terminé, Annulé).
* **Dossiers Médicaux** : Création et mise à jour des diagnostics et traitements liés aux patients.
* **À propos** : Page d'informations pratiques sur la clinique.

## 🛠️ Technologies Utilisées

Ce projet privilégie une approche moderne et performante en utilisant les outils suivants :

* **React 19** : Bibliothèque principale pour la construction de l'interface utilisateur.
* **Vite** : Outil de build ultra-rapide pour le développement.
* **React Router v6** : Gestion de la navigation côté client (SPA).
* **Axios** : Client HTTP configuré avec des intercepteurs pour l'injection automatique du token JWT.
* **React Hook Form** : Gestion performante des formulaires.
* **Yup** : Validation stricte des schémas de données côté client.
* **Vanilla CSS** : Stylisation pure, séparée de la logique des composants, garantissant une grande simplicité.

## ⚙️ Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé :

Node.js (version 18 ou supérieure recommandée)

npm (inclus avec Node.js)

L'API Backend HealthCare+ (Spring Boot) doit être en cours d'exécution sur http://localhost:8080.

🚀 Installation et Lancement
Cloner le dépôt :

Bash
git clone https://github.com/dev-gamal/HealthCare-Frontend
cd HealthCare-Frontend
Installer les dépendances :

Bash
npm install
Lancer le serveur de développement :

Bash
npm run dev
Accéder à l'application :
Ouvrez votre navigateur et allez sur l'URL indiquée par Vite (généralement http://localhost:5173).

🔐 Identifiants de Test
Pour accéder à l'application, vous devez utiliser un compte disposant des droits nécessaires (ex: ROLE_ADMIN ou ROLE_DOCTOR).

Nom d'utilisateur : admin

Mot de passe : admin123

👨‍💻 Développeur
Développé dans le cadre d'un projet individuel.

Durée : 5 jours

Livrables : Maquette Figma, Trello, Code source.

Ce projet a été généré avec Vite.

## 📂 Structure du Projet

L'architecture du code a été pensée pour être modulaire et facilement maintenable :

```text
src/
├── assets/             # Images, icônes et ressources statiques
├── components/         # Composants réutilisables (ex: Layout de navigation)
├── pages/              # Vues principales de l'application
│   ├── About/          # Page d'informations
│   ├── Appointments/   # Gestion des rendez-vous
│   ├── Dashboard/      # Tableau de bord principal
│   ├── Doctors/        # Gestion des médecins
│   ├── Login/          # Page d'authentification
│   ├── MedicalFiles/   # Gestion des dossiers médicaux
│   └── Patients/       # Gestion des patients
├── services/           # Logique de communication avec l'API
│   └── api.js          # Configuration d'Axios et intercepteur JWT
├── App.jsx             # Configuration des routes (React Router)
├── app.css             # Styles globaux
└── main.jsx            # Point d'entrée de l'application React# HealthCare+ Frontend
