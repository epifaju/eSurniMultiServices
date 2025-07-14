
# PRD – Plateforme Surni MultiServices

## 🎯 Objectif du projet

Créer une application web moderne et responsive nommée **Surni MultiServices**, facilitant la mise en relation entre **artisans** (maçons, plombiers, électriciens, etc.) et **clients**. Elle permet l’inscription, la publication d’annonces, la notation/commentaire des artisans, ainsi qu’une modération par un administrateur.

## 👥 Public cible
- **Artisans** : Cherchent à publier leurs services, gérer des annonces, se faire noter.
- **Clients** : Recherchent des artisans par ville/catégorie, peuvent noter/commenter.
- **Administrateurs** : Gèrent la plateforme, modèrent les annonces et les utilisateurs.

---

## ⚙️ Fonctionnalités principales

### 🔐 Authentification & Autorisation
- Inscription artisan ou client
- Connexion avec JWT (Spring Boot backend)
- Contrôle d’accès selon rôle (Client, Artisan, Admin)
- Redirection automatique vers `/login` si non authentifié

### 🧑‍🔧 Gestion des artisans
- Création de profil artisan avec nom, photo, ville, catégorie, email, téléphone
- Fiche artisan publique enrichie avec :
  - Photo, nom, ville, catégorie, contact, **note moyenne**, commentaires
- Tableau de bord artisan : voir/éditer profil + gérer ses annonces

### 📣 Annonces
- Artisan peut créer, modifier, supprimer ses annonces
- Une annonce contient : titre, description, ville, catégorie, statut
- Page publique : liste d’annonces filtrable (ville + catégorie)

### ⭐ Notation & Commentaires
- Un utilisateur peut noter un artisan (1 à 5 étoiles) et commenter
- Affichage de la note moyenne sur la fiche artisan
- Commentaires récents visibles

### 🔍 Filtrage & recherche
- Filtres combinés sur page d’accueil :
  - Ville
  - Catégorie
  - Top artisans (meilleure note)
- Barre de recherche par mot-clé (optionnel)

### 🧑‍💼 Espace Admin
- Modérer artisans (activer/désactiver, supprimer)
- Modérer annonces (approuver/supprimer)
- Visualiser les utilisateurs/artisans inscrits

---

## 💻 Technologies utilisées

### Frontend
- **React.js**
- **Tailwind CSS**
- **React Router**
- Axios pour les requêtes HTTP
- Responsive design tablette et mobile

### Backend
- **Spring Boot**
- **PostgreSQL**
- **JWT Authentication**
- Architecture RESTful
- Entités : Utilisateur, Artisan, Annonce, Commentaire

### Outils complémentaires
- Docker (optionnel pour conteneurisation)
- Swagger/OpenAPI pour documenter l’API

---

## 🗃 Structure projet (suggestion)
```
/frontend
  /components
  /pages
  /services
/backend
  /controllers
  /services
  /repositories
  /entities
  /security
  /config
```

## 🌐 Nom de la plateforme
**Surni MultiServices** – Langue de l'application : **Français 🇫🇷**

## ✅ MVP attendu
- Authentification utilisateur (client/artisan/admin)
- Filtres combinés (ville + catégorie + top note)
- Publication et modération d’annonces
- Système de notation et commentaires
- Contrôle d’accès selon rôle
- Interface responsive

